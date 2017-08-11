import express from 'express';
import bodyparser from 'body-parser';
import compression from 'compression';
import reactRenderHandler from './handlers/react-render';


/*
    Server setup & middleware
------------------------------------------ */
export const server = express();

server.use(compression());
server.use(express.static('static-rev'));
server.use(express.static('static'));
server.use(bodyparser.urlencoded({ extended: true }));
server.use(bodyparser.json());
server.use(reactRenderHandler);
