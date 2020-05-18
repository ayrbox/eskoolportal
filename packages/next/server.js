require('dotenv').config();
const next = require('next');
const api = require('@eskoolportal/api');

const { NODE_ENV, APP_PORT } = process.env;

const dev = NODE_ENV !== 'production';
const nextApp = next({ dev });

const handler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  api.all('*', (req, res) => {
    return handler(req, res);
  });

  api.listen(APP_PORT, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${APP_PORT}`);
  });
});
