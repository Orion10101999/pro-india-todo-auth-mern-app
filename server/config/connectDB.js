import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('connect to DB');
            
        })
        connection.on('error',(error)=>{
            console.log('somthing went wrong in mongodb ', error);
            
        })
        
    } catch (error) {
        console.log('something went wrong ',error);
        
    }
}

export default connectDB;
