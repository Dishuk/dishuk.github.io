const { execSync } = require('child_process');
const { version } = require('../package.json');

const major = Number(version.split('.')[0]);
const released = execSync('git tag --list "v*"', { encoding: 'utf8' })
  .split('\n')
  .map(tag => tag.trim().match(/^v(\d+)\.(\d+)\.(\d+)$/))
  .filter(match => match && Number(match[1]) === major)
  .map(match => [Number(match[2]), Number(match[3])])
  .sort(([minorA, patchA], [minorB, patchB]) => minorB - minorA || patchB - patchA);

if (!released.length) {
  console.log(`${major}.0.0`);
} else {
  const [minor, patch] = released[0];

  console.log(`${major}.${minor}.${patch + 1}`);
}
