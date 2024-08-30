import UserModel from "../models/UserModel.js"

async function checkEmail(request , response){
    try {
        const {email} = request.body

        const checkEmail = await UserModel.findOne({email})
        
        if(!checkEmail){
            return response.status(400).json({
                message : 'user not exists',
                error : true
            })
        }

        return response.status(201).json({
            message : 'email verify',
            data : checkEmail,
            success : true
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }

}

export default checkEmail ;

