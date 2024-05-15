import mongoose from 'mongoose';

const connectdb = async (DATABASE_URL) =>{
    try{
        const DB_OPTION ={
            dbName : "control_panel"
        }
        await mongoose.connect(DATABASE_URL , DB_OPTION);
        console.log("DB connected successfully");
    }catch (error){
        console.log(error);
    }
}

export default connectdb;