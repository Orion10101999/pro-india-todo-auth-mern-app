
import UserModel from "../models/UserModel.js"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

async function checkPassword(request, response) {
    try {
        const { password, userId } = request.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return response.status(404).json({
                message: 'User not found',
                error: true
            });
        }

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return response.status(400).json({
                message: 'Please Check Password',
                error: true
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        const cookieOptions = {
            httpOnly: true,
            secure : true
        };

        return response.cookie('token', token, cookieOptions).status(200).json({
            message: 'Login Successfully',
            token,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}


export default checkPassword