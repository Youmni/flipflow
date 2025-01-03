import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AuthController{

    constructor(connection){
        this.connection = connection;
    }

    generateAccessToken(userId){
        return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn:process.env.ACCESS_TOKEN_EXPIRY });
    };

    generateRefreshToken(userId){
        return jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, { expiresIn:process.env.REFRESH_TOKEN_EXPIRY });
    };

    static authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader &&  authHeader.split(' ')[0] === "Bearer" && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401); 
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.userId = decoded.userId;
            next();
        });
    }

    static getNewAccessToken(req, res) {
        const {refreshToken } = req.body;

        if(!refreshToken){
            return res.status(401).json({ message: 'Refresh token is required' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const newAccessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
            
            return res.json({ accessToken: newAccessToken });
        });
    }

    async login(req, res){
        const {email, password} = req.body;

        try{
            const [user] = await this.connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);
            
            if (!user || user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user[0].password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const accessToken = this.generateAccessToken(user[0].id);
            const refreshToken = this.generateRefreshToken(user[0].id);

            return res.json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                message: 'Succesvol login',
            });
        }catch(err){
            console.error('Login error:', err);
            return res.status(500).json({ message: 'There was an error signing up' });
        }
    }
}

export default AuthController;