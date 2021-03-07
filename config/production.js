const { PORT, DATABASE_URL } = process.env;

module.exports = {
  db: {
    url: DATABASE_URL,
    logging: false,
    ssl: true,
  },
  app: {
    port: PORT,
  },
};
