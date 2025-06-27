import mongoose from "mongoose";

export const ConnectToDB =async()=>{
    const connection =await mongoose.connect(process.env.DB_URI);
    return connection;
}


