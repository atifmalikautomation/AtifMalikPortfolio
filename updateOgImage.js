const fs = require('fs');
const file = "C:\\Users\\Win10\\atifmalik.me\\src\\app\\opengraph-image.tsx";
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/#E0008A/g, '#D97757');
content = content.replace(/#FF4DA6/g, '#E8956F');
content = content.replace(/rgba\(224,0,138/g, 'rgba(217,119,87');

fs.writeFileSync(file, content);
console.log("Done opengraph-image.tsx");
