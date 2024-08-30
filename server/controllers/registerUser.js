
import bcryptjs from 'bcryptjs'
import UserModel from "../models/UserModel.js"

async function registerUser(request , response){
    try {
        const { name, email, password , profile_pic} = request.body;
        
        const checkEmail = await UserModel.findOne({email}) 
        if(checkEmail){
            return response.status(400).json({
                message : 'User Already  Exists',
                error : true
            })
        }

        const salt = await bcryptjs.genSalt(10) 
        const hashedPassword = await bcryptjs.hash(password , salt)

        const payload = {
            name ,
            email ,
            password : hashedPassword ,
            profile_pic ,
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        return response.status(201).json({
            message : 'User created successfully',
            data : userSave,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

export default registerUser; 
