import getUserDetailsFromtoken from "../helpers/getUserDetailsFromToken.js"
async function userDetails(request , response){
    try {
        const token = request.cookies.token || ""

        const user = await getUserDetailsFromtoken(token)

        return response.status(200).json({
            message : "user Details",
            data : user
        })
        
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })   
    }
}


export default userDetails