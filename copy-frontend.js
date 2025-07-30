const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  console.log(`Checking source: ${src}`);
  
  if (!fs.existsSync(src)) {
    console.log(`❌ Source directory ${src} does not exist`);
    
    // Debug: List what's available
    const parentDir = path.dirname(src);
    if (fs.existsSync(parentDir)) {
      console.log(`Available in ${parentDir}:`, fs.readdirSync(parentDir));
    }
    return false;
  }

  console.log(`✅ Source directory exists: ${src}`);

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    console.log(`Creating destination directory: ${dest}`);
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  console.log(`Found ${entries.length} items to copy`);

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    console.log(`Copying: ${entry.name}`);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  return true;
}

console.log('🚀 Starting frontend copy process...');
console.log('Working directory:', process.cwd());
console.log('Script location:', __dirname);

// List all files in current directory
console.log('Files in current directory:', fs.readdirSync('.'));

// Copy Frontend/dist to Backend/dist
const frontendDist = path.join(__dirname, 'Frontend', 'dist');
const backendDist = path.join(__dirname, 'Backend', 'dist');

console.log('📦 Copying frontend build...');
console.log(`From: ${frontendDist}`);
console.log(`To: ${backendDist}`);

try {
  if (copyDir(frontendDist, backendDist)) {
    console.log('✅ Frontend build copied successfully');
    
    // Verify the copy
    if (fs.existsSync(backendDist)) {
      const copiedFiles = fs.readdirSync(backendDist);
      console.log('✅ Verification: Files in Backend/dist:', copiedFiles);
    }
  } else {
    console.log('❌ Failed to copy frontend build');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error during copy process:', error);
  process.exit(1);
}
