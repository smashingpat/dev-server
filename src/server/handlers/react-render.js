import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../shared/App';


const createHtml = (reactRender) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="mount">${reactRender}</div>
    <script src="/assets/main.bundle.js"></script>
</body>
</html>
`
export default (req, res) => {
    const render = renderToString(<App />);

    res.send(createHtml(render));
}