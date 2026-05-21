const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Header SVG replacements
  content = content.replace(
    /<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/g,
    '<img src="/logo.png" alt="StartupConnect Logo" className="w-10 h-10 object-contain" />'
  );
  
  content = content.replace(
    /<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/g,
    '<img src="/logo.png" alt="StartupConnect Logo" className="w-8 h-8 object-contain" />'
  );

  // Mentor Portal Sidebar replace
  content = content.replace(
    /(<Link href="\/mentor\/dashboard" className="flex flex-col">)\s*(<span className="font-bold text-white text-\[22px\] tracking-tight">Mentor Portal<\/span>)\s*(<span className="text-\[13px\] font-medium text-\[#86b5a5\]">StartupConnect Ethiopia<\/span>)/g,
    `$1
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="StartupConnect Logo" className="w-8 h-8 object-contain" />
              <div className="flex flex-col -gap-1">
                $2
              </div>
            </div>`
  );

  // Investor Portal Sidebar replace
  content = content.replace(
    /(<Link href="\/investor\/dashboard" className="flex flex-col">)\s*(<span className="font-bold text-white text-\[22px\] tracking-tight">Investor Portal<\/span>)\s*(<span className="text-\[13px\] font-medium text-\[#86b5a5\]">StartupConnect Ethiopia<\/span>)/g,
    `$1
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="StartupConnect Logo" className="w-8 h-8 object-contain" />
              <div className="flex flex-col -gap-1">
                $2
              </div>
            </div>`
  );

  // Various "StartupConnect Ethiopia" text at the top left of auth pages
  content = content.replace(
    /StartupConnect <span className="text-gray-900 font-semibold">Ethiopia<\/span>/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold text-xl text-gray-900">StartupConnect</span></div>`
  );

  content = content.replace(
    /<span className="font-bold text-lg text-white tracking-tight">StartupConnect Ethiopia<\/span>/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold text-lg text-white tracking-tight">StartupConnect</span></div>`
  );

  content = content.replace(
    /StartupConnect<br\/>Ethiopia/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold text-lg">StartupConnect</span></div>`
  );

  content = content.replace(
    /<span className="font-bold text-\[#0f3d32\] text-xl tracking-tight leading-tight">StartupConnect<\/span>/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold text-[#0f3d32] text-xl tracking-tight leading-tight">StartupConnect</span></div>`
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

traverse(path.join(__dirname, 'src', 'app'));
traverse(path.join(__dirname, 'src', 'components'));
