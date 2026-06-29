const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'app/(dashboard)/documents/[documentId]/page.tsx',
  'app/(dashboard)/quizzes/[quizId]/page.tsx'
];

const replacements = [
  { from: /bg-white/g, to: 'bg-surface-800' },
  { from: /bg-surface-50/g, to: 'bg-surface-700' },
  { from: /bg-surface-100/g, to: 'bg-surface-700' },
  { from: /border-surface-200/g, to: 'border-surface-600' },
  { from: /border-surface-100/g, to: 'border-surface-700' },
  { from: /border-surface-300/g, to: 'border-surface-500' },
  { from: /text-surface-900/g, to: 'text-surface-100' },
  { from: /text-surface-800/g, to: 'text-surface-200' },
  { from: /text-surface-700/g, to: 'text-surface-300' },
  { from: /text-surface-600/g, to: 'text-surface-400' },
  { from: /text-surface-500/g, to: 'text-surface-400' },
  { from: /text-surface-400/g, to: 'text-surface-500' },
  { from: /bg-primary-50/g, to: 'bg-primary-900\/30' },
  { from: /bg-accent-100/g, to: 'bg-accent-900\/30' },
  { from: /bg-accent-50/g, to: 'bg-accent-900\/30' },
  { from: /bg-emerald-100/g, to: 'bg-emerald-900\/30' },
  { from: /bg-red-100/g, to: 'bg-red-900\/30' },
  { from: /bg-amber-100/g, to: 'bg-amber-900\/30' },
  { from: /text-primary-700/g, to: 'text-primary-400' },
  { from: /text-primary-600/g, to: 'text-primary-500' },
  { from: /text-emerald-700/g, to: 'text-emerald-400' },
  { from: /text-emerald-800/g, to: 'text-emerald-300' },
  { from: /text-amber-700/g, to: 'text-amber-400' },
  { from: /text-amber-800/g, to: 'text-amber-300' },
  { from: /text-red-700/g, to: 'text-red-400' },
  { from: /text-red-800/g, to: 'text-red-300' },
  { from: /border-emerald-200/g, to: 'border-emerald-700\/50' },
  { from: /border-amber-200/g, to: 'border-amber-700\/50' },
  { from: /border-red-200/g, to: 'border-red-700\/50' },
  // specific fixes
  { from: /bg-surface-800 text-white/g, to: 'bg-surface-100 text-surface-900' } // for user chat bubble
];

filesToProcess.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(rep => {
      content = content.replace(rep.from, rep.to);
    });
    
    // fix the markdown renderer code colors
    content = content.replace(
      /'<code class="bg-surface-700 text-primary-400 px-1\.5 py-0\.5 rounded text-xs font-mono">\$1<\/code>'/g,
      `'<code class="bg-surface-700 text-primary-400 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>'`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
