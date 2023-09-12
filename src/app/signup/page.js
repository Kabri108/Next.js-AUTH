
"use client";/// use this  we can transfrom the server side component to client side component

import React from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";


export default function SignupPage(){
    /// when user signup then we push user to login page . for this we use Router
    const router=useRouter();
    const [user,setUser]=React.useState({
        username:"",
        email:"",
        password:"",
    })
    const[loading,setLoading]=React.useState(false);

    const onSignup=async()=>{
        try {
            setLoading(true);
            const responce=await axios.post("api/users/signup",user);
            console.log("Signup success",responce.data);
            router.push("/login")
            
        } catch (error) {
            console.log("Signup faild",error.message)
            toast.error(error.message); 
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
        <div className=" flex flex-col items-center max-h-screen py-2  m-auto">
        <h1>{loading ? "processing" : "Signup"}</h1>
        <label htmlFor="username">username</label>
        <input 
        className="p-1 border rounded-xl"
        type="text"
         id="username" 
         value={user.username}
         onChange={(e)=>setUser({...user,username:e.target.value})}
         placeholder="username"
         />
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
         onClick={onSignup}
         className=" p-2 border border-black rounded-xl mt-2">Sign Up</button>

         <Link href="/login">Visit Login Page</Link>
        </div>
        </>
    )
}



/// when someone sign up then we redirect user on Home Page 