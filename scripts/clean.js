const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

for (const entry of ['dist', path.join('node_modules', '.cache')]) {
  fs.rmSync(path.join(root, entry), { recursive: true, force: true });
  console.log(`removed ${entry}`);
}
