require('dotenv').config();

let dbParams = {}

if (process.env.NODE_ENV === "production") {
  dbParams.connectionString = process.env.DATABASE_URL
  dbParams.sslmode = "require"
} else {
  dbParams = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  };
}

module.exports = dbParams;