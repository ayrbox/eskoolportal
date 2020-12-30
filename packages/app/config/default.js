const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  PORT,
  DATABASE_URL,
  DATABASE_LOG,
} = process.env;

console.log('URL', DATABASE_URL);

module.exports = {
  db: {
    name: POSTGRES_DB || 'eskoolportal',
    user: POSTGRES_USER || 'eskuser',
    password: POSTGRES_PASSWORD || 'eskpassword',
    host: POSTGRES_HOST || 'localhost',
    port: POSTGRES_PORT || 5432,
    url: DATABASE_URL,
    logging: DATABASE_LOG || false,
  },
  app: {
    port: PORT || 8080,
    secret: '293749283749hsadf982hv9c8h398w7354ojhd9872hsd92hdi9uw',
    authCookieName: '__AUTH__',
  },
};
