const next = require('next');
const api = require('@eskoolportal/api');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });

const handler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  api.all('*', (req, res) => {
    return handler(req, res);
  });

  api.listen(3000, err => {
    if (err) throw err;
    console.log('Ready on http://localhost:3000');
  });
});
