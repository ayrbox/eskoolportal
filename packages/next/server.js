const next = require('next');
const config = require('config');
const api = require('@eskoolportal/api');

const { NODE_ENV } = process.env;

const dev = NODE_ENV !== 'production';

const port = config.get('app.port');

const nextApp = next({ dev });

const handler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  api.all('*', (req, res) => {
    return handler(req, res);
  });

  api.listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
