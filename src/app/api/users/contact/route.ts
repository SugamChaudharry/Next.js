import { connectDB } from "@/db/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, message } = reqBody;

        console.log("reqBody", reqBody);

        // send email to admin
        await sendContactEmail({email, name , message});
        console.log("email sent to admin");
        

        return NextResponse.json({
            message: "Message sent successfully",
            success: true,
        });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}