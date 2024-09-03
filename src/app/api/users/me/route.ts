import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/db/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";

connectDB()

export async function GET(request:NextRequest) {
      
        // extract data from token
     try {
            const userId= await getDataFromToken(request)
            const user = await User.findOne({_id : userId}).select("-password")
            if(!user){
               return NextResponse.json({error:"user not found"} ,{status:400})
            }
           
           return NextResponse.json({
                       data: user,
                       message: "User found",
                       success: true
               },{status:200})
     } catch (error:any) {
        NextResponse.json({error: error.message} ,{status:500})
     }
}