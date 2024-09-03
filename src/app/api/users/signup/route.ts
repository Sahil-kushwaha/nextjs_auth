import connectDB from "@/db/dbConfig";
import User from '@/models/userModel'
import {NextRequest ,NextResponse} from 'next/server'
import bcrypt from 'bcrypt'
import { sendEmail } from "@/helper/mailer";


connectDB()

export async function POST(request: NextRequest) {
    
    
    try {
        // request.json() return promise i.e we need to use await
        const reqBody = await request.json()
        const {username , email , password} = reqBody
        // validation
        console.log(reqBody);

        const user = await User.findOne({email})
        if(user){
             return NextResponse.json({error:"User alredy exist"},{status:400})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
       
        const newUser =  new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()
      
        // send verification email
       await sendEmail({email, emailType:'VERIFY' ,userId:savedUser._id})
         return NextResponse.json({
            message:"User created Successfully",
            success: true,
            savedUser
         })

    } catch (error:any) {
         return NextResponse.json({error:error.message},
          {status:500})
    }
}