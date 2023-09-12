"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

export default function ProfilePage(){
  const [data,setData]=useState("")

  const logOut= async()=>{
    try {
      axios.get('api/users/logout')
      toast.success('Logout Successful')
      router.push('/login')
      
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

    const getUserDetails=async()=>{
     
      axios.get('/api/users/me')
      console.log(res.data)
      setData(res.data.data._id)
    }
  return (
    <div className=' items-center flex justify-center flex-col mt-10'>page
    <button 
    onClick={logOut}
    className='bg-blue-800 mt-4 p-2 text-white'>Logout</button>
    </div>
  )
}

