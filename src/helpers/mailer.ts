import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }:any) => {
  const html = emailType === "VERIFY" ? `<h1>Click on the link to verify your email</h1> <a href="http://localhost:3000/verifyemail/${userId}">Verify Email</a>` : `<h1>Click on the link to reset your password</h1> <a href="http://localhost:3000/resetpassword/${userId}">Reset Password</a>`
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId, {
            $set: {
              verifyToken: hashedToken, 
              verifyTokenExpire: Date.now() + 3600000
            },
            
          });
          
        } else if (emailType === "RESET"){
          await User.findByIdAndUpdate(userId,{
            $set: {
              forgotPasswordToken: hashedToken,
              forgotPasswordExpire: Date.now() + 3600000
            }
          });
        }

        let transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "f2006321dbd946",
            pass: "25432d5e2b4e9b"
          }
        });
        
        const mailOptions = {
            from: 'sugam@sugam.ai',
            to: email,
            subject: emailType === "VERIFY" ? "VERIFY your email" : "Reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: html
          }
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const sendContactEmail = async ({ email, name, message }:any) => {
  const html = `<h1>Message from ${name}</h1> <p>${message}</p>`
  try {
          let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f2006321dbd946",
              pass: "25432d5e2b4e9b"
            }
          });
          
          const mailOptions = {
            from: email,
            to:   "sugam@sugam.ai",
            subject: "Contact Form", // Subject line
            text: "Hello world?", // plain text body
            html: html
          }
          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;
  } catch (error: any) {
      throw new Error(error.message);
  }
}