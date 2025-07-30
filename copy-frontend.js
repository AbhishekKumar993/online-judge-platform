const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`❌ Source directory ${src} does not exist`);
    return false;
  }

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  return true;
}

// Copy Frontend/dist to Backend/dist
const frontendDist = path.join(__dirname, 'Frontend', 'dist');
const backendDist = path.join(__dirname, 'Backend', 'dist');

console.log('📦 Copying frontend build...');
console.log(`From: ${frontendDist}`);
console.log(`To: ${backendDist}`);

if (copyDir(frontendDist, backendDist)) {
  console.log('✅ Frontend build copied successfully');
} else {
  console.log('❌ Failed to copy frontend build');
  process.exit(1);
}
