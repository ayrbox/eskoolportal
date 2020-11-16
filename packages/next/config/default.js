const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  PORT,
} = process.env;

module.exports = {
  db: {
    name: POSTGRES_DB || 'eskoolportal',
    user: POSTGRES_USER || 'eskuser',
    password: POSTGRES_PASSWORD || 'eskpassword',
    host: POSTGRES_HOST || 'localhost',
    port: POSTGRES_PORT || 5432,
  },
  app: {
    port: PORT || 8080,
    secret: '293749283749hsadf982hv9c8h398w7354ojhd9872hsd92hdi9uw',
    authCookieName: '__AUTH__',
  },
};
