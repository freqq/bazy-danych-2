import express from 'express';
import morgan from 'morgan';
import path from 'path';
import https from 'https';
import fs from 'fs';
import noCache from 'nocache';

const app = express();

const PORT = process.env.PORT || 9050;
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const httpsConfig = {
  key: fs.readFileSync(process.env.KEY_PATH, 'utf8'),
  cert: fs.readFileSync(process.env.CRT_PATH, 'utf8'),
};

app.use(morgan('combined'));
app.use(noCache());
app.use(PUBLIC_PATH, express.static(path.resolve(__dirname, 'dist')));

app.get('/*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

https
  .createServer(httpsConfig, app)
  .listen(PORT, () => console.log(`Application listening on port ${PORT}`));
