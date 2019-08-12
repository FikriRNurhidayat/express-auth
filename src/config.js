module.exports = {
  development: process.env.DBCONNECTION_DEV,
  test: process.env.DBCONNECTION_TEST,
  staging: process.env.DB_CONNECTION,
  production: process.env.DB_CONNECTION
}
