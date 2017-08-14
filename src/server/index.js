import express from 'express';
import bodyparser from 'body-parser';
import compression from 'compression';
import hbs from 'hbs';
import manifest from './manifest';

export const server = express();
const PORT = process.env.PORT || 3000;

hbs.registerHelper('manifest', manifest);


/*
    Server setup & middleware
------------------------------------------ */

server.set('view engine', 'hbs');
server.use(compression());
server.use(express.static('public-rev'));
server.use(express.static('public'));
server.use((req, res) => {
    res.render('shell', { manifest });
});
server.use(bodyparser.urlencoded({ extended: true }));
server.use(bodyparser.json());

// if (!process.env.DEV_SERVER) {
//     server.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));
// }
