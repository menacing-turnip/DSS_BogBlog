const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "itsaflickingbean",
    host: "localhost",
    port: 5432,
    database: "bogblogdb"
})

module.exports = pool;