const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Pattern: Mentor Portal Sidebar replace (looser regex)
  content = content.replace(
    /(<Link[^>]*href="\/mentor\/[^"]*"[^>]*>)\s*(<span[^>]*>Mentor Portal<\/span>)\s*(<span[^>]*>STARTUPCONNECT ETHIOPIA<\/span>|<span[^>]*>StartupConnect Ethiopia<\/span>|<span[^>]*>StartupConnect<\/span>)/gi,
    `$1
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="StartupConnect Logo" className="w-8 h-8 object-contain" />
              <div className="flex flex-col -gap-1">
                $2
              </div>
            </div>`
  );

  // Pattern: Investor Portal Sidebar replace (looser regex)
  content = content.replace(
    /(<Link[^>]*href="\/investor\/[^"]*"[^>]*>)\s*(<span[^>]*>Investor Portal<\/span>)\s*(<span[^>]*>STARTUPCONNECT ETHIOPIA<\/span>|<span[^>]*>StartupConnect Ethiopia<\/span>|<span[^>]*>StartupConnect<\/span>)/gi,
    `$1
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="StartupConnect Logo" className="w-8 h-8 object-contain" />
              <div className="flex flex-col -gap-1">
                $2
              </div>
            </div>`
  );

  // Pattern: Investor/Mentor Registration Success or Dashboard general replace
  // `<span className="...">StartupConnect</span>` without the portal text
  // Let's do a more robust regex that finds `StartupConnect` in the first 500 lines or just specific known classes.
  // Actually, let's catch all Variations like:
  content = content.replace(
    /<span className="font-bold text-\[#0a4d3c\] text-xl tracking-tight">StartupConnect(?: Ethiopia)?<\/span>/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold text-[#0a4d3c] text-xl tracking-tight">StartupConnect</span></div>`
  );

  content = content.replace(
    /<span className="font-black text-white text-2xl tracking-tighter leading-none">StartupConnect<\/span>/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-black text-white text-2xl tracking-tighter leading-none">StartupConnect</span></div>`
  );

  content = content.replace(
    /StartupConnect <span className="font-medium text-gray-500 text-xs tracking-widest uppercase ml-1">Portal<\/span>/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold text-xl text-gray-900">StartupConnect</span> <span className="font-medium text-gray-500 text-xs tracking-widest uppercase ml-1">Portal</span></div>`
  );

  content = content.replace(
    /<span className="font-bold text-\[15px\] text-gray-900">StartupConnect<\/span>/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" /><span className="font-bold text-[15px] text-gray-900">StartupConnect</span></div>`
  );

  // Auth pages (Register, Login)
  content = content.replace(
    /StartupConnect Ethiopia\s*(?=<\/div>)/g,
    `<div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold">StartupConnect</span></div>`
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
