async function logout(request , response){
    try {
        
        const cookieOptions = {
            httpOnly: true,
            secure : false,
            // secure : true
            // secure: process.env.NODE_ENV === 'production', // Ensure this matches your environment
            // sameSite: 'Lax' // Adjust if necessary
        };
        return response.cookie('token', '', cookieOptions).status(200).json({
            message: "session out",
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })  
    }
}

export default logout;