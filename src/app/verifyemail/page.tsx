'use client'
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default  function verifyEmail(){
         const [token ,setToken] = useState("")
         const [verify , setVerify] = useState(false)
         const [error ,setError] = useState(false)
         const [errorType , setErrorType] = useState('')
         
         // function which verify the token
         async function verifyme(){
             try {
                 await axios.post('/api/users/verifyemail',{token})
                 setVerify(true)
                 
             } 
             catch (error:any) {
                 setError(true);
                 setErrorType(error.response.data?.error)
                 console.log('error:' ,error.response.data)
             }
         }

        // to get token from url/ path
         useEffect(()=>{
               // using core js
               const searchParams = new URLSearchParams(window.location.search)
               const urlQueryToken = searchParams.get('token')
               setToken(urlQueryToken || '')

         },[])

    return(
        <div className="flex flex-col justify-center items-center min-h-screen "> 
               <h1 className="text-4xl p-4">Verify your email</h1>
               {token ?`${token}`:'no token'}
               {error && (
                 <p className="text-red-500">error occured : {errorType}</p>
               )}
               <button 
                className={`border border-orange-500 py-3 px-4 rounded-2xl bg-black
                 ${token?'text-white':'text-gray-400'}`}
                 onClick={verifyme}
                 disabled ={verify ? true : false}
               >Verify</button> 

              {verify ? (
                <>
                 <Link className='p-4' href='/login'>login</Link>
               </>
             ) : null}


        </div>
    )
}
