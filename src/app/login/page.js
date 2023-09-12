
"use client";/// use this  we can transfrom the server side component to client side component

import React from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";


export default function LoginPage(){
    const router =useRouter();
    const [user,setUser]=React.useState({
       
        email:"",
        password:"",
    })

    const onLogin=async()=>{
        try {
         const responce=   await axios.post("/api/users/login",user);
         console.log(responce);
         toast.success("login Successful");
         router.push("/profile")

        } catch (error) {
            console.log("Login faild".error.message);
            toast.error(error.message)
        }
    }


    return (
        <>
        <div className=" flex flex-col  items-center max-h-screen py-2  m-auto">
        <h1>Login</h1>
        
        <label htmlFor="email">email</label>
        <input 
        className="p-1 border rounded-xl"
        type="text"
         id="email" 
         value={user.email}
         onChange={(e)=>setUser({...user,email:e.target.value})}
         placeholder="email"
         />
        <label htmlFor="password">password</label>
        <input 
        className="p-1 border rounded-xl"
        type="password"
         id="password" 
         value={user.password}
         onChange={(e)=>setUser({...user,password:e.target.value})}
         placeholder="password"
         />

         <button
         onClick={onLogin}
         className=" p-2 border border-black rounded-xl mt-2">Login</button>

         <Link href="/signup">Visit Sign Up Page</Link>
        </div>
        </>
    )
}



/// when someone sign up then we redirect user on Home Page 