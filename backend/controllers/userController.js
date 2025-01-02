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

        res.status(201).json({ message: 'User created successfully.', userId: results.insertId });


    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'There was an error while creating the user.', error: err.message });
    }
}

const updateUser = async (req, res) => {

    const { first_name, last_name, username, email} = req.body;
    const userId = req.params.id;

    try{
        const [existingUser] = await connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

        if (existingUser.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const query = 'UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ? WHERE id = ?';
        await connection.promise().query(query, [first_name, last_name, username, email, userId]);

        res.status(200).json({ message: 'User updated successfully.' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'There was an error while updating the user.', error: err.message });
    }
}

const updatePassword = async (req, res) => {
    const { password } = req.body;
    const userId = req.params.id;

    try{
        const [existingUser] = await connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

        if (existingUser.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'UPDATE users SET password = ?  WHERE id = ?';
        await connection.promise().query(query, [hashedPassword, userId]);

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'There was an error while updating the password.', error: err.message });
    }

    res.status(200).json({ message: 'Password updated successfully.' });
}

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try{
        const [user] = await connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user: user[0] });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'There was an error fetching the user: ', error: err.message });
    }
}

export { createUser, updateUser, updatePassword, getUserById };