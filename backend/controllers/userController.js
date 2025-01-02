import bcrypt from 'bcrypt';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const createUser = async (req, res) => {
    const {first_name, last_name, username, email, password} = req.body;

    try{
        const [existingUser] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)';
        const [results] = await connection.promise().query(query, [first_name, last_name, username, email, hashedPassword]);

        res.status(201).json({ message: 'User created successfully', userId: results.insertId });


    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'There was an error while creating the user.', error: err.message });
    }
}

export default createUser;