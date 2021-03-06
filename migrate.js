require('dotenv').config();

const fs = require('fs');
const mysql = require('mysql2/promise');

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  const sql = fs.readFileSync('./database.sql', 'utf8');

  await connection.query(sql);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.log(err);
}
