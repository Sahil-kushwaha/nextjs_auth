import { NextRequest ,NextResponse } from "next/server";
import connectDB from "@/db/dbConfig";
import bcrypt from 'bcrypt'
import User from "@/models/userModel";
import jwt from 'jsonwebtoken'

connectDB()

export async function POST(request:NextRequest){
        
try {
          const reqBody = await request.json()   
          const {email , password} = reqBody;
          
          const user = await User.findOne({email})
          if(!user){
               return NextResponse.json({error:"user does not exist"},{status:400})
              }
              
          console.log("user exit")  
          const isPasswordMatched = await bcrypt.compare(password , user.password)
              
          if(!isPasswordMatched){
              return NextResponse.json({error:"incorrect password"},{status:400})
  
          }
  
          const jwtPayload = {
                id: user._id,
                username: user.username,
                email : user.email
          } 
  
          const jwtToken = await jwt.sign(jwtPayload , process.env.TOKEN_SECRET! ,{expiresIn:'1d'} ) 
  
          const response =  NextResponse.json({
               message:"login successfully",
               success : true
          },{status:200})
  
          response.cookies.set("token" ,jwtToken,
            {
              httpOnly:true,
      
            }
          )
    
        return response;
} 
catch (error:any) {
     return NextResponse.json({error: error.message},{status:500})
}

     
}