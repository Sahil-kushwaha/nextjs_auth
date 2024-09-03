import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

export const sendEmail = async ({email, emailType ,userId}:any)=>{

    try {
       const plainToken = userId.toString()
 // we can use other library for token too but here we use bcyrpt
    const hashedToken =  await bcrypt.hash(plainToken,10)   

    if(emailType === 'VERIFY'){
          await User.findByIdAndUpdate(userId,
            {
                verifyToken:hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }
          )
     }
    else if(emailType === 'RESET') {
    await User.findByIdAndUpdate(userId,
        {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry:Date.now() + 3600000
        }
      )
   }
          

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "13ca21b168773b", // not a good way put this credential in enviromnent file smtp server ka user and pass
                pass: "95ea52a416ffaf" // " "
            },
          });
     
         const mailOptions =
            {
                from: 'sahil.5@kushwaha.ai', // sender address
                to: email, // 
                subject: emailType === 'VERIFY'?'Verify your email':'Reset your password', // Subject line
                html: `<p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>here</a> to 
                 ${emailType==='VERIFY'?'Verify your email':'Reset your Password'}
                 or copy and paste the link below in your browser
                 <br>
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`, // html body

            }  
        
        // send mail with defined transport object
        const mailResponse = await transporter.sendMail(mailOptions);
          
        return mailResponse
    
    } catch (error:any) {
        throw new Error("mailer error: "+error.message)
    }
}