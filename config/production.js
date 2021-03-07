const { PORT, DATABASE_URL } = process.env;

module.exports = {
  db: {
    url: DATABASE_URL,
    logging: false,
  },
  app: {
    port: PORT,
  },
};
