import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export async function POST(request){
    try {
    const reqBody= await request.json()
    const {email,password}=reqBody;
    console.log(reqBody);

    //Check user exit or not 
    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error:"User Does not exist"},{status:400})
    }
    //Check if PAssword is Correct
    const validPassword= await bcryptjs.compare(password,user.password)
    if(!validPassword){
        return NextResponse.json({error:"Invalid password"},{status:400})
    }


    //create token data 

    const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
    }
    //create token
    //sign( )is a methode in jwt token 
    const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})

    //token is created but token is not set in user cooke so lets create

    const responce=NextResponse.json({
        message:"Login successful",
        success:true,
    })

    responce.cookies.set("token",token,{httpOnly:true,})

    return responce;

    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}