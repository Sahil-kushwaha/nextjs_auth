import mongoose from "mongoose";
import { dataBaseName } from "@/constant";
async function connectDB() {
     try {
          await mongoose.connect(`${process.env.MONGODB_URI}/${dataBaseName}`)
          const connection = mongoose.connection
          connection.on("connected",()=>{
              console.log('MongoDB connected')
          })
          connection.on('error',(err)=>{
              throw new Error("MongoDB connection error, please make sure db is up and running: "+err )
           
          })

     } catch (error) {
        console.log('Something went wrong to DB')
        console.log('Erorr:: '+error)
     }
}


export default connectDB;