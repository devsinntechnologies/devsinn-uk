const fs = require('fs');
const logContent = fs.readFileSync('C:/Users/S S C/.gemini/antigravity-ide/brain/be7e2708-75f1-47f8-add4-6c15d9d786a1/.system_generated/logs/transcript.jsonl', 'utf-8');
const lines = logContent.split('\n');

for(let l of lines) {
    if (l.includes('CaseStudies.tsx') && l.includes('const projects = [')) {
        let matchStr = 'const projects = [';
        let start = l.indexOf(matchStr);
        if(start === -1) continue;
        let end = l.indexOf('];', start);
        if (end === -1) continue;
        let content = l.substring(start, end + 2);
        
        // Remove escape characters from JSON log format
        content = content.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\\"/g, '"').replace(/\\\\/g, '\\');
        
        fs.writeFileSync('original_casestudies.txt', content);
        break;
    }
}
console.log('Done');
