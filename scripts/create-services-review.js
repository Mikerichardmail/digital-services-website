import fs from 'node:fs';
import path from 'node:path';

const services = JSON.parse(fs.readFileSync(path.resolve('src/data/services.json'), 'utf-8'));
const categories = JSON.parse(fs.readFileSync(path.resolve('src/data/categories.json'), 'utf-8'));

let md = `# HelpIt Digital Solutions: Services Review & Deletion List

## Instructions:
1. Review the services below.
2. To **DELETE** a service:
   - Change \`[ ]\` to \`[X]\` (or write \`DELETE\` next to it, or simply delete the whole line).
3. Save this file when you are finished.
4. Tell me in the chat: **"I have edited the document, please delete the marked services"**.
5. I will automatically remove them from the website, re-run the build, and push the update to GitHub.

---

`;

categories.forEach((cat, index) => {
  const catServices = services.filter(s => s.category === cat.id);
  md += `## ${index + 1}. ${cat.name} (${catServices.length} Services)\n`;
  md += `*Category ID: \`${cat.id}\`*\n\n`;

  catServices.forEach(s => {
    md += `- [ ] **${s.name}** | Price: ${s.priceDisplay} | Type: ${s.type} | ID: \`${s.id}\`\n`;
  });

  md += `\n`;
});

const outPath = path.resolve('services_review.md');
fs.writeFileSync(outPath, md, 'utf-8');
console.log(`Generated services_review.md with ${services.length} services across ${categories.length} categories.`);
