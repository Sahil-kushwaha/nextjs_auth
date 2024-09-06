'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {toast} from "react-hot-toast"

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState<any>("nothing")

    const getUserDetails = async function () {
         try {
                const res = await axios.get('/api/users/me')
                console.log(res.data?.data)
                setData(res.data.data)
          } 
         catch (error:any) {
             console.log("error: " ,error?.res.data.error)
             toast.error(error.message)
            } 
     }
          
   const logoutUser = async function () {
      try {
                const res = await axios.get('/api/users/logout')
                console.log(res.data.message)
                toast.success(res.data.message)
                router.push('/login')
          } 
      catch (error:any) {
             console.log("error: " ,error?.res.data.error)
             toast.error(error.message)
         } 
    }
         
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen"> 
           <h1>User profile</h1>
            <h2 className="mt-4">
              {
                data === 'nothing'?"Nothing":
                <Link href={`/profile/${data._id}`} 
                  className="border bg-orange-500 text-black p-3"
                 >profile picture</Link>
              }
            </h2>
            <p>{data.username}</p>
            <p>{data.email}</p>
           <button
             className="p-3 bg-blue-500 "
             onClick={logoutUser}
           >
               logout
           </button>
           <button
             className="p-3 bg-green-400 "
             onClick={getUserDetails}
            >
               Get user details
           </button>      
    </div>
  )
}
