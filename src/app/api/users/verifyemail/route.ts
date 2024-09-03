import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/db/dbConfig";


connectDB()
export async function POST(request:NextRequest){
       
    try {
         const reqBody = await request.json()
         const {token} = reqBody
         console.log(token)

         const user = await User.findOne({verifyToken:token ,verifyTokenExpiry:{$gt:Date.now()}})
         
         if(!user){
            return  NextResponse.json({error:"Invalid Token"},{status:400})
         }
    
        // update isVerifed , delete verifyToken and verifyToken expiry
        user.isVerified = true
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined
        
        await user.save()

       return NextResponse.json({
            message:"Email verified Successfully",
            success: true
        })
    } catch (error:any) {
        NextResponse.json({error:error.message},{status:500})
    }
}