const fs = require('fs');
const file = "C:\\Users\\Win10\\atifmalik.me\\src\\components\\layout\\ThemePreview.tsx";
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/224\\,0\\,138/g, '217\\\\,119\\\\,87');
content = content.replace(/rgba\(224\\,0\\,138/g, 'rgba(217\\\\,119\\\\,87');
content = content.replace(/rgba\\\(224\\,0\\,138/g, 'rgba\\(217\\,119\\,87');
// to be safe:
content = content.replace(/224\\\,0\\\,138/g, '217\\,119\\,87');

fs.writeFileSync(file, content);
