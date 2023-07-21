import mongoose from "mongoose";

let isConnected = false; 

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); 

    if(isConnected) { 
        console.log("MongoDB is connected and ready to go."); 
        return; 
    } 

    console.log(process.env.MONGODB_URL)
    try { 
        await mongoose.connect(process.env.MONGODB_URL, { 
            dbName: 'gym-online', 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }); 

        isConnected = true; 
        console.log("MongoDB Connected"); 
    } catch (err) { 
        console.error(err);  
    }
}; 