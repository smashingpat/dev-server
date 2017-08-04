import express from 'express';
import bodyparser from 'body-parser';
import reactRenderHandler from './handlers/react-render';


/*
    Server setup & middleware
------------------------------------------ */
export const server = express();

server.use(express.static('public'));
server.use(bodyparser.urlencoded({ extended: true }));
server.use(bodyparser.json());
server.use(reactRenderHandler);
