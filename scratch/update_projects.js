const fs = require('fs');

const dataFile = '../src/data/projects.json';
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const newProjects = [
  {
    "id": 101,
    "slug": "certainli",
    "title": "Certainli",
    "description": "",
    "heroImage": "/images/singlePageProjects/web/certainli/hero.png",
    "mainImage": "/images/singlePageProjects/web/certainli/main.png",
    "about": "A compliance and certification platform designed to simplify complex regulatory processes for businesses.",
    "sneakPeekImages": [
      "/images/singlePageProjects/web/certainli/sneak-1.png",
      "/images/singlePageProjects/web/certainli/sneak-2.png"
    ],
    "technologies": [
      { "name": "HTML5", "logo": "/images/home/technology/frontend/html5.svg" },
      { "name": "CSS3", "logo": "/images/home/technology/frontend/css3.svg" },
      { "name": "React", "logo": "/images/home/technology/frontend/react.svg" },
      { "name": "NEXT JS", "logo": "/images/home/technology/frontend/nextjs.png" }
    ]
  },
  {
    "id": 102,
    "slug": "jiffy_new",
    "title": "Jiffy Quick Commerce",
    "description": "",
    "heroImage": "/images/singlePageProjects/web/jiffy_new/hero.png",
    "mainImage": "/images/singlePageProjects/web/jiffy_new/main.png",
    "about": "A fast and reliable delivery platform providing authenticated same-day service to streamline your daily operations.",
    "sneakPeekImages": [
      "/images/singlePageProjects/web/jiffy_new/sneak-1.png",
      "/images/singlePageProjects/web/jiffy_new/sneak-2.png"
    ],
    "technologies": [
      { "name": "HTML5", "logo": "/images/home/technology/frontend/html5.svg" },
      { "name": "CSS3", "logo": "/images/home/technology/frontend/css3.svg" },
      { "name": "React", "logo": "/images/home/technology/frontend/react.svg" }
    ]
  },
  {
    "id": 103,
    "slug": "rx101",
    "title": "RX101",
    "description": "",
    "heroImage": "/images/singlePageProjects/web/rx101/hero.png",
    "mainImage": "/images/singlePageProjects/web/rx101/main.png",
    "about": "A healthcare and pharmacy platform dedicated to improving medication accessibility and patient care experiences.",
    "sneakPeekImages": [
      "/images/singlePageProjects/web/rx101/sneak-1.png",
      "/images/singlePageProjects/web/rx101/sneak-2.png"
    ],
    "technologies": [
      { "name": "HTML5", "logo": "/images/home/technology/frontend/html5.svg" },
      { "name": "CSS3", "logo": "/images/home/technology/frontend/css3.svg" },
      { "name": "NEXT JS", "logo": "/images/home/technology/frontend/nextjs.png" }
    ]
  },
  {
    "id": 104,
    "slug": "alttext_ai",
    "title": "AltText AI",
    "description": "",
    "heroImage": "/images/singlePageProjects/web/alttext_ai/hero.png",
    "mainImage": "/images/singlePageProjects/web/alttext_ai/main.png",
    "about": "An intelligent AI solution that automatically generates accurate and descriptive alt text for images to enhance web accessibility.",
    "sneakPeekImages": [
      "/images/singlePageProjects/web/alttext_ai/sneak-1.png",
      "/images/singlePageProjects/web/alttext_ai/sneak-2.png"
    ],
    "technologies": [
      { "name": "HTML5", "logo": "/images/home/technology/frontend/html5.svg" },
      { "name": "CSS3", "logo": "/images/home/technology/frontend/css3.svg" },
      { "name": "React", "logo": "/images/home/technology/frontend/react.svg" },
      { "name": "Chat GPT", "logo": "/images/home/technology/Ai/chatgpt-6.svg" }
    ]
  },
  {
    "id": 105,
    "slug": "hpappen",
    "title": "HP Appen",
    "description": "",
    "heroImage": "/images/singlePageProjects/web/hpappen/hero.png",
    "mainImage": "/images/singlePageProjects/web/hpappen/main.png",
    "about": "A comprehensive digital application streamlining real estate, property management, and housing solutions.",
    "sneakPeekImages": [
      "/images/singlePageProjects/web/hpappen/sneak-1.png",
      "/images/singlePageProjects/web/hpappen/sneak-2.png"
    ],
    "technologies": [
      { "name": "HTML5", "logo": "/images/home/technology/frontend/html5.svg" },
      { "name": "CSS3", "logo": "/images/home/technology/frontend/css3.svg" },
      { "name": "React", "logo": "/images/home/technology/frontend/react.svg" }
    ]
  }
];

// Prepend the new projects to the webDev array
data.webDev = [...newProjects, ...data.webDev];

fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated projects.json with the new sites at the top of webDev.');
