import fs from 'fs';
import path from 'path';


const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'static-rev/manifest.json')));

export default manifest;
