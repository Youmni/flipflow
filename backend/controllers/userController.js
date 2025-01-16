import bcrypt from 'bcrypt'; 

class UserController{

    constructor(connection){
        this.connection = connection;
    }

    async createUser (req, res){
        const {first_name, last_name, username, email, password} = req.body;

        try{
            const [existingUser] = await this.connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO users (first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?)';
            const [results] = await this.connection.promise().query(query, [first_name, last_name, username, email, hashedPassword]);

            res.status(201).json({ message: 'User created successfully.', userId: results.insertId });


        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error while creating the user.', error: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ message: 'User ID is required' });
            }
    
            const [result] = await this.connection.promise().query('DELETE FROM users WHERE id = ?', [id]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: `No user found with ID ${id}` });
            }
                
            res.status(200).json({ message: `User with ID ${id} has been deleted successfully` });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was an error deleting the user', error: err.message });
        }
    }

    async updateUser (req, res){

        const { first_name, last_name, username, email} = req.body;
        const userId = req.params.id;

        try{
            const [existingUser] = await this.connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

            if (existingUser.length === 0) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const query = 'UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ? WHERE id = ?';
            await this.connection.promise().query(query, [first_name, last_name, username, email, userId]);

            res.status(200).json({ message: 'User updated successfully.' });
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error while updating the user.', error: err.message });
        }
    }

    async updatePassword (req, res){
        const { password } = req.body;
        const userId = req.params.id;

        try{
            const [existingUser] = await this.connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

            if (existingUser.length === 0) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const query = 'UPDATE users SET password = ?  WHERE id = ?';
            await this.connection.promise().query(query, [hashedPassword, userId]);

        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error while updating the password.', error: err.message });
        }

        res.status(200).json({ message: 'Password updated successfully.' });
    }

    async getUserById (req, res){
        const userId = req.params.id;

        try{
            const [user] = await this.connection.promise().query('SELECT * FROM users WHERE id = ?', [userId]);

            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.status(200).json({ user: user[0] });
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error fetching the user: ', error: err.message });
        }
    }

    async getAllUsers (req, res){
        try{
            const [users] = await this.connection.promise().query('SELECT * FROM users');

            res.status(200).json({ users: users });
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'There was an error fetching the users: ', error: err.message });
        }
    }
}
export default UserController;