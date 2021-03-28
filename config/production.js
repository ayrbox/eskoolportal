const { PORT, DATABASE_URL } = process.env;

module.exports = {
  db: {
    url: DATABASE_URL || 'UNDEFINED',
    logging: false,
    ssl: true,
  },
  app: {
    port: PORT,
  },
};
