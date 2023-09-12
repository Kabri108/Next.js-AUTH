import { NextResponse } from "next/server";
import axios from "axios";




export async function GET(request){

        try {
            
            const responce=NextResponse.json({
                message:"Logout Successful",
                success:true,
            })            
            responce.cookies.set("token","",{
                httpOnly:true,expires:new Date(0)
            });
            return responce
        } 
        catch (error) {
            return NextResponse.json({error:error.message},{status:500})
        }
}