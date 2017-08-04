import React from 'react';
import { render } from 'react-dom';
import App from '../shared/App';


const mountElement = document.getElementById('mount');

render(
    <App />,
    mountElement,
);
