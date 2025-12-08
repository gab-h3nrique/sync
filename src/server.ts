import http from 'http'
import WebSocket from 'ws';
import jwt from 'jsonwebtoken';
import express from 'express';
import routes from './routes';
import path from 'path';

const port = parseInt(process.env.PORT || '3000', 10)

const app = express()

app.use('/app', express.static(path.join(__dirname, '..', 'public', 'app')));
// Servir os arquivos do front
// app.use('/app', express.static(path.join(__dirname, 'public/app')));


// app.get('/app/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'app', 'index.html'));
// });
app.get('/app/*', (req, res, next) => {
  // Se a URL tiver um ponto, provavelmente é um arquivo (ex: .js, .css, .map)
  if (req.path.includes('.')) return next();

  // Senão, retorna o index.html (para rotas SPA)
  res.sendFile(path.join(__dirname, '..', 'public', 'app', 'index.html'));
});

app.use(express.json())

// middleware to handle CORS and preflight requests
app.use((req, res, next) => {

  // allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*')

  // allow common HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // allow all headers
  res.setHeader('Access-Control-Allow-Headers', '*')

  // allow credentials if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // respond immediately to OPTIONS preflight requests
  if(req.method === 'OPTIONS') return res.sendStatus(200)

  console.log(`request received: ${req.method} ${req.url}`)

  // pass control to the next middleware or route
  next()

})

routes(app)

app.listen(port, () => console.log(`Server listening at http://localhost:${port} as ${ process.env.NODE_ENV ? process.env.NODE_ENV : 'development' }`))


