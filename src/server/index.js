import express from 'express';
import bodyparser from 'body-parser';
import compression from 'compression';
import manifest from './manifest';


/*
    Server setup & middleware
------------------------------------------ */
export const server = express();
const PORT = process.env.PORT || 3000;

server.use(compression());
server.use((req, res) => res.json(manifest));
server.use(express.static('public-rev'));
server.use(express.static('public'));
server.use(bodyparser.urlencoded({ extended: true }));
server.use(bodyparser.json());

if (!process.env.DEV_SERVER) {
    server.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));
}
