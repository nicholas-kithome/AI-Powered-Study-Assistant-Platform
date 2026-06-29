import Sidebar from "@/components/app-shell/Sidebar";
import MobileNav from "@/components/app-shell/MobileNav";
import CommandMenu from "@/components/app-shell/CommandMenu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-800 text-surface-200 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>
      <MobileNav />
      <CommandMenu />
    </div>
  );
}

