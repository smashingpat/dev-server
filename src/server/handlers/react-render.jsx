import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../shared/App';
import manifest from '../manifest';

const createHtml = render => `
    <link rel="stylesheet" href="${manifest.main.css}">
    <div id="mount">${render}</div>
    <script src="${manifest.runtime.js}"></script>
    <script src="${manifest.vendor.js}"></script>
    <script src="${manifest.main.js}"></script>
`;

export default (req, res) => {
    const render = renderToString(<App />);

    res.send(createHtml(render));
};
