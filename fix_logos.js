const fs = require('fs');

const filePath = '/Users/hans/HigherOrLower/data/assets.ts';
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = lines.map(line => {
  if (line.includes('t1.gstatic.com/faviconV2')) {
    const match = line.match(/url=http:\/\/([^&]+)/);
    if (match) {
      const domain = match[1];
      // Replace the Google Favicon URL with Clearbit
      return line.replace(/https:\/\/t1\.gstatic\.com\/faviconV2[^"]+/, `https://logo.clearbit.com/${domain}?size=128`);
    }
  }
  return line;
});

fs.writeFileSync(filePath, newLines.join('\n'));
console.log("Replaced with Clearbit logos.");
