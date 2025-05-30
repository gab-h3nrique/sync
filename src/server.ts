import http from 'http'
import WebSocket from 'ws';
import database from './auth';
import jwt from 'jsonwebtoken';
import express from 'express';
import routes from './api/routes';

const port = parseInt(process.env.PORT || '3000', 10)

const app = express()

routes(app)

app.listen(port, () => console.log(`Server listening at http://localhost:${port} as ${ process.env.NODE_ENV ? process.env.NODE_ENV : 'development' }`))


