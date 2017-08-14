import fs from 'fs';
import path from 'path';


const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, './manifest.json'), 'utf-8'));


export default manifest;
