import http from 'http'
import WebSocket from 'ws';
import jwt from 'jsonwebtoken';
import express from 'express';
import routes from './api/routes';
import path from 'path';

const port = parseInt(process.env.PORT || '3000', 10)

const app = express()

app.use('/app', express.static(path.join(__dirname, 'public/app')));

app.get('/app/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/app/index.html'));
});

app.use(express.json())

routes(app)

app.listen(port, () => console.log(`Server listening at http://localhost:${port} as ${ process.env.NODE_ENV ? process.env.NODE_ENV : 'development' }`))


