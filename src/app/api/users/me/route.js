import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "mongoose";
import { useRouter } from "next/router";

connect();

export async function GET(request){
    const router =useRouter()
    try {
       const userId=await getDataFromToken(request);
      const user=await User.findOne({_id:userId}).select("-password");
      return NextResponse.json({
        message:"User found",
        data:user
      })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}