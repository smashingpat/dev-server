import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../shared/App';


export default (req, res) => {
    const render = renderToString(<App />);
    const html = fs.readFileSync(path.resolve(__dirname, './public/shell.html'), 'utf-8');

    res.send(html.replace(
        '<div id="mount"></div>',
        `<div id="mount">${render}</div>`,
    ));
};
