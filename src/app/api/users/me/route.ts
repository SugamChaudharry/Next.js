import { connectDB } from "@/db/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";


connectDB();

export async function POST(request: NextRequest){

    const userId = await getDataFromToken(request);
    const user = await User.findOne({_id: userId}).select("-password");
    if(!user){
        return NextResponse.json({error:"User not found"}, { status: 404 });
    }
    return NextResponse.json({
        massage: "User found",
        data: user
    });

    
}