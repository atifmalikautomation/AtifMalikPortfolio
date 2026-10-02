const fs = require('fs');
const file = "C:\\Users\\Win10\\atifmalik.me\\src\\components\\layout\\ThemePreview.tsx";
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/#E0008A/g, '#D97757');
content = content.replace(/#e0008a/g, '#d97757');
content = content.replace(/#FF4DA6/g, '#E8956F');
content = content.replace(/#ff4da6/g, '#e8956f');
content = content.replace(/#C20076/g, '#C4603F');
content = content.replace(/#c20076/g, '#c4603f');
content = content.replace(/#A00062/g, '#B0522F');
content = content.replace(/#a00062/g, '#b0522f');

content = content.replace(/rgba\(224,\s*0,\s*138/g, 'rgba(217, 119, 87');
content = content.replace(/rgba\(224,0,138/g, 'rgba(217,119,87');
content = content.replace(/224,\s*0,\s*138/g, '217, 119, 87');
content = content.replace(/224,0,138/g, '217,119,87');

content = content.replace(/rgba\(194,\s*0,\s*118/g, 'rgba(196, 96, 63');
content = content.replace(/rgba\(194,0,118/g, 'rgba(196,96,63');
content = content.replace(/194,\s*0,\s*118/g, '196, 96, 63');
content = content.replace(/194,0,118/g, '196,96,63');

content = content.replace(/rgba\(209,\s*0,\s*120/g, 'rgba(196, 96, 63');
content = content.replace(/rgba\(209,0,120/g, 'rgba(196,96,63');
content = content.replace(/209,\s*0,\s*120/g, '196, 96, 63');
content = content.replace(/209,0,120/g, '196,96,63');

content = content.replace(/rgba\(160,\s*0,\s*98/g, 'rgba(176, 82, 47');
content = content.replace(/rgba\(160,0,98/g, 'rgba(176,82,47');
content = content.replace(/160,\s*0,\s*98/g, '176, 82, 47');
content = content.replace(/160,0,98/g, '176,82,47');

fs.writeFileSync(file, content);
console.log("Done ThemePreview.tsx");
