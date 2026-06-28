"use client";
import { useState, useRef, useEffect } from "react";
import Topbar from "@/components/app-shell/Topbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getStoredDocuments, saveStoredDocuments, getStoredStats, saveStoredStats } from "@/lib/store";
import { StudyDocument } from "@/types";
import {
  Search, Upload, Grid3X3, List, MoreVertical, FileText,
  RefreshCw, Trash2, Eye, X, CloudUpload, CheckCircle2,
  AlertCircle, Loader2,
} from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";

type Filter = "all" | "ready" | "processing" | "failed";

const STATUS_COLORS: Record<string, "blue" | "green" | "amber" | "red" | "gray"> = {
  uploading: "blue", processing: "amber", ready: "green", failed: "red",
};

const FILE_ICONS: Record<string, string> = { pdf: "📄", docx: "📝", txt: "📃" };

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type UploadState = "idle" | "selected" | "uploading" | "processing" | "done" | "error";

export default function LibraryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docs, setDocs] = useState<StudyDocument[]>([]);
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDocs(getStoredDocuments());
    setMounted(true);
  }, []);

  const handleSaveDocs = (updatedDocs: StudyDocument[]) => {
    setDocs(updatedDocs);
    saveStoredDocuments(updatedDocs);

    // Update stats
    const stats = getStoredStats();
    stats.documentsUploaded = updatedDocs.length;
    saveStoredStats(stats);
  };

  const filtered = docs.filter((d) => {
    if (filter !== "all" && d.status !== filter) return false;
    if (search && !d.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const simulateUpload = (file: File) => {
    setSelectedFile(file);
    setUploadState("selected");
    setTimeout(() => {
      setUploadState("uploading");
      let progress = 0;
      const iv = setInterval(() => {
        progress += Math.random() * 18;
        if (progress >= 100) {
          progress = 100;
          clearInterval(iv);
          setUploadProgress(100);
          setTimeout(() => {
            setUploadState("processing");
            setTimeout(() => {
              setUploadState("done");
              const newDoc: StudyDocument = {
                id: `doc-new-${Date.now()}`,
                ownerId: "user-1",
                title: file.name.replace(/\.[^/.]+$/, ""),
                fileType: (file.name.endsWith(".pdf") ? "pdf" : file.name.endsWith(".docx") ? "docx" : "txt") as "pdf" | "docx" | "txt",
                status: "ready",
                uploadedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                size: file.size,
                pageCount: Math.floor(Math.random() * 40) + 5,
              };
              handleSaveDocs([newDoc, ...docs]);
            }, 2000);
          }, 500);
        }
        setUploadProgress(Math.min(progress, 100));
      }, 200);
    }, 600);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) simulateUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateUpload(file);
  };

  const resetUpload = () => {
    setUploadState("idle");
    setUploadProgress(0);
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = (id: string) => {
    const updated = docs.filter((d) => d.id !== id);
    handleSaveDocs(updated);
  };

  if (!mounted) {
    return (
      <div className="animate-fade-in">
        <Topbar title="Library" />
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          <div className="skeleton h-32 w-full rounded-2xl" />
          <div className="skeleton h-12 w-full rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="skeleton h-44 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Topbar breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Library" }]} />

      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => uploadState === "idle" && fileRef.current?.click()}
          className={clsx(
            "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200",
            dragOver ? "border-primary-400 bg-primary-50 scale-[1.01]" : "border-surface-300 bg-surface-50 hover:border-primary-300 hover:bg-primary-50/30",
            uploadState === "idle" ? "cursor-pointer" : "cursor-default"
          )}
        >
          <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileChange} />

          {uploadState === "idle" && (
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto">
                <CloudUpload size={28} className="text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-surface-800">Drop your notes here, or <span className="text-primary-600">browse</span></p>
                <p className="text-sm text-surface-400 mt-1">PDF, DOCX, or TXT · Max 25 MB</p>
              </div>
              <p className="text-xs text-surface-400 bg-white px-3 py-1.5 rounded-lg border border-surface-200 inline-block">
                🔒 Your files are processed privately and never shared
              </p>
            </div>
          )}

          {uploadState === "selected" && selectedFile && (
            <div className="space-y-3">
              <FileText size={32} className="text-primary-500 mx-auto" />
              <p className="font-medium text-surface-800">{selectedFile.name}</p>
              <p className="text-sm text-surface-400">{formatBytes(selectedFile.size)}</p>
              <div className="flex gap-3 justify-center">
                <Button size="sm" onClick={(e) => { e.stopPropagation(); simulateUpload(selectedFile); }}>Start Upload</Button>
                <Button size="sm" variant="secondary" icon={<X size={13} />} onClick={(e) => { e.stopPropagation(); resetUpload(); }}>Cancel</Button>
              </div>
            </div>
          )}

          {uploadState === "uploading" && (
            <div className="space-y-4 max-w-xs mx-auto">
              <CloudUpload size={28} className="text-primary-500 mx-auto" />
              <p className="font-medium text-surface-800">Uploading {selectedFile?.name}...</p>
              <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-sm text-surface-500">{uploadProgress.toFixed(0)}%</p>
            </div>
          )}

          {uploadState === "processing" && (
            <div className="space-y-3">
              <Loader2 size={28} className="text-accent-500 mx-auto animate-spin" />
              <p className="font-medium text-surface-800">Extracting &amp; indexing your document...</p>
              <p className="text-sm text-surface-400">This usually takes 10–30 seconds</p>
            </div>
          )}

          {uploadState === "done" && (
            <div className="space-y-3">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
              <p className="font-semibold text-surface-800">Document ready!</p>
              <p className="text-sm text-surface-400">Your notes have been indexed and are ready to study.</p>
              <Button size="sm" onClick={(e) => { e.stopPropagation(); resetUpload(); }}>Upload Another</Button>
            </div>
          )}

          {uploadState === "error" && (
            <div className="space-y-3">
              <AlertCircle size={32} className="text-red-500 mx-auto" />
              <p className="font-semibold text-red-700">Upload failed</p>
              <p className="text-sm text-surface-500">Check your file type and size, then try again.</p>
              <div className="flex gap-3 justify-center">
                <Button size="sm" icon={<RefreshCw size={13} />} onClick={(e) => { e.stopPropagation(); resetUpload(); }}>Retry</Button>
              </div>
            </div>
          )}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="search"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "ready", "processing", "failed"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border",
                  filter === f
                    ? "bg-primary-600 text-white border-primary-600"
                    : "bg-white text-surface-600 border-surface-200 hover:border-surface-300"
                )}
              >
                {f === "all" ? `All (${docs.length})` : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            <div className="flex gap-1 bg-surface-100 rounded-xl p-1">
              <button onClick={() => setView("grid")} className={clsx("p-1.5 rounded-lg transition-colors", view === "grid" ? "bg-white shadow-sm text-surface-800" : "text-surface-400")}>
                <Grid3X3 size={15} />
              </button>
              <button onClick={() => setView("list")} className={clsx("p-1.5 rounded-lg transition-colors", view === "list" ? "bg-white shadow-sm text-surface-800" : "text-surface-400")}>
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Documents */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📂</p>
            <h3 className="font-semibold text-surface-800 mb-1">No documents found</h3>
            <p className="text-sm text-surface-400">Try adjusting your filters or upload your first document above.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((doc) => (
              <div key={doc.id} className="relative group">
                <Link href={`/documents/${doc.id}`}>
                  <Card hover className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-surface-100 flex items-center justify-center text-2xl">
                          {FILE_ICONS[doc.fileType]}
                        </div>
                        <Badge variant={STATUS_COLORS[doc.status]} dot>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-surface-900 text-sm leading-snug mb-1 group-hover:text-primary-700 transition-colors line-clamp-2">{doc.title}</h3>
                      {doc.course && <p className="text-xs text-surface-400 mb-3">{doc.course}</p>}
                    </div>
                    <div className="flex items-center justify-between text-xs text-surface-400 pt-3 border-t border-surface-100 mt-4">
                      <span>{doc.pageCount ? `${doc.pageCount} pages` : doc.size ? formatBytes(doc.size) : ""}</span>
                      <span>{formatDate(doc.uploadedAt)}</span>
                    </div>
                  </Card>
                </Link>
                {/* Delete button positioned absolute in grid hover */}
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(doc.id); }}
                  className="absolute top-2 right-2 p-1.5 bg-white border border-surface-200 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-150 shadow-sm"
                  title="Delete Document"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((doc) => (
              <div key={doc.id} className="relative">
                <Link href={`/documents/${doc.id}`}>
                  <Card hover padding="sm" className="group">
                    <div className="flex items-center gap-4 px-2 py-1">
                      <span className="text-xl shrink-0">{FILE_ICONS[doc.fileType]}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-surface-900 text-sm truncate group-hover:text-primary-700 transition-colors">{doc.title}</p>
                        <p className="text-xs text-surface-400">{doc.course} {doc.pageCount && `· ${doc.pageCount} pages`}</p>
                      </div>
                      <Badge variant={STATUS_COLORS[doc.status]} dot className="shrink-0">
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </Badge>
                      <span className="text-xs text-surface-400 shrink-0 hidden sm:block">{formatDate(doc.uploadedAt)}</span>
                      <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-surface-400 hover:text-red-500" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(doc.id); }} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
