import mongoose from "mongoose";

//MongoDB server connection
export const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.ATLAS_URL);
        console.log("MongoDB server connected sucessfully");

    } catch (error) {
        console.log("MongoDB server or Database connection error");
        process.exit();
    }
}