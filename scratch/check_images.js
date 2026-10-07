const fs = require('fs');
const path = require('path');

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG dimensions are at offset 16 (width) and 20 (height) as 4-byte big-endian integers
  const width = buffer.readInt32BE(16);
  const height = buffer.readInt32BE(20);
  return { width, height };
}

const images = [
  'chatsupplies_case.png',
  'drafidox_case.png',
  'smart_logo_case.png',
  'rms_case.png'
];

images.forEach(img => {
  const p = path.join('c:\\Users\\S S C\\Documents\\GitHub\\devsinn-technologies-website\\public\\images', img);
  try {
    const dim = getPngDimensions(p);
    console.log(`${img}: ${dim.width}x${dim.height}`);
  } catch (e) {
    console.error(`Error reading ${img}:`, e.message);
  }
});
