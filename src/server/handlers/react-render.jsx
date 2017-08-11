import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../shared/App';
import manifest from '../manifest';

const createHtml = render => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    ${manifest.main.css ? `<link rel="stylesheet" href="${manifest.main.css}">` : ''}
</head>
<body>
    <div id="mount">${render}</div>
    <script src="${manifest.runtime.js}"></script>
    <script src="${manifest.vendor.js}"></script>
    <script src="${manifest.main.js}"></script>
</body>
</html>
`;

export default (req, res) => {
    const render = renderToString(<App />);

    res.send(createHtml(render));
};
