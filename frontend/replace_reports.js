const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const oldStr = "{ id: 'reports', label: 'Reports', icon: 'chart', href: '/investor/reports' }";
  const newStr = "{ id: 'feedback', label: 'feedback', icon: 'chart', href: '/investor/feedback' }";
  
  if (content.includes(oldStr)) {
    content = content.split(oldStr).join(newStr);
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

traverse(path.join(__dirname, 'src', 'app', 'investor'));
