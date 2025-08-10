const fs = require('fs');
const path = require('path');

// Function to convert webp files to PNG
function convertWebpToPng() {
  const androidDir = path.join(__dirname, '../android/app/src/main/res');
  
  // Find all webp files in mipmap directories
  const mipmapDirs = ['mipmap-hdpi', 'mipmap-mdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi'];
  
  mipmapDirs.forEach(dir => {
    const dirPath = path.join(androidDir, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        if (file.endsWith('.webp')) {
          console.log(`Found webp file: ${dir}/${file}`);
          // For now, just log the files. In a real implementation, you'd use a library like sharp to convert
          console.log(`Would convert: ${dir}/${file} to ${file.replace('.webp', '.png')}`);
        }
      });
    }
  });
}

// Alternative: Create simple PNG icons
function createSimpleIcons() {
  const iconContent = `
<svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="108" height="108" rx="20" fill="#0057ff"/>
  <text x="54" y="65" text-anchor="middle" fill="white" font-size="40" font-weight="bold">🚌</text>
</svg>`;
  
  console.log('Creating simple icon...');
  // This would create a simple SVG icon that can be converted to PNG
}

convertWebpToPng();
createSimpleIcons(); 