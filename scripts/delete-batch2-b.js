import fs from 'node:fs';
import path from 'node:path';

const servicesPath = path.resolve('src/data/services.json');
let services = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

const targetsToRemove = [
  'official-account-recovery-guidance',
  'two-step-verification-setup-guidance',
  'legitimate-software-configuration'
];

const initialCount = services.length;
const removedNames = [];

services = services.filter(s => {
  const match = targetsToRemove.some(t => s.id.toLowerCase().includes(t) || t.includes(s.id.toLowerCase()));
  if (match) {
    removedNames.push(`${s.name} (${s.id})`);
    return false;
  }
  return true;
});

fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2), 'utf-8');
console.log(`Removed ${removedNames.length} services (from ${initialCount} to ${services.length}).`);
console.log('Removed items:\n' + removedNames.join('\n'));
