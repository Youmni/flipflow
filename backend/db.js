import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

connection.connect((err) => {
    if (err) {
      console.error('Error making database connection:', err.stack);
      return;
    }
    console.log('Connected to database with ID ' + connection.threadId);
});

export default connection;