const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

module.exports = {
  db: {
    name: POSTGRES_DB || "eskoolportal",
    user: POSTGRES_USER || "eskuser",
    password: POSTGRES_PASSWORD || "eskpassword",
    host: POSTGRES_HOST || "localhost",
    port: POSTGRES_PORT || 5432,
  },
};
