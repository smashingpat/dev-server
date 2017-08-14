import fs from 'fs';
import path from 'path';


const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, './manifest.json')));

export default manifest;
