import React from 'react';
import { render } from 'react-dom';
import App from '../shared/App';


const mountElement = document.getElementById('mount');

const renderReact = (AppComponent) => {
    render(
        <AppComponent />,
        mountElement,
    );
};

renderReact(App);

if (module.hot) {
    module.hot.accept('../shared/App', () => {
        const NextApp = require('../shared/App').default; // eslint-disable-line global-require

        renderReact(NextApp);
    });
}
