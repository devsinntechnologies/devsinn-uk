const fs = require('fs');
const path = './src/data/projects.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
let modified = false;

for (const key in data) {
  if (Array.isArray(data[key])) {
    data[key].forEach(project => {
      if (project.mainImage && project.mainImage.includes('/case-studies/')) {
        let type = key === 'appDev' ? 'app' : 'web';
        let s = project.slug;
        project.heroImage = "/images/singlePageProjects/" + type + "/" + s + "/hero.png";
        project.mainImage = "/images/singlePageProjects/" + type + "/" + s + "/main.png";
        modified = true;
      }
    });
  }
}

if (modified) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log('Reverted projects.json!');
} else {
  console.log('No changes needed.');
}
