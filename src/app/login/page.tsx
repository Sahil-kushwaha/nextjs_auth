'use client'

import React ,{ useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function loginPage() {

    const [user,setUser] = useState({
         password:"",
         email:""
    })

    const [loginDisabled , setLoginDisabled] = useState(true)
    const [loading , setLoading] = useState(false)
    const [errorType ,setErrorType] = useState('')
    const router = useRouter();
  
    const login = async function(){
          try {
                      
             setLoading(true);
             const response = await axios.post('/api/users/login',user)
             console.log('login successfully' ,response.data)
             setLoading(false)
             router.push('/profile')
            } 
            catch (error:any) {
                console.log("login failed")
                setLoading(false)
                setErrorType(error?.response.data.error)
                toast(error.message) 
            }  
        }
 
  // to make submit buttom disable till all field get fill
     useEffect(()=>{
          if( user.password.length>0 && user.email.length>0){
               setLoginDisabled(false)
          }
          else{
             setLoginDisabled(true)
            }
     },[user])     

    return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
       <h1 className='mb-6'>{loading?"processing...":"Login"}</h1>
        {errorType && (
            <p className="text-red-500">error occured : {errorType}</p>
        )}
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            placeholder='Enter your email'
            value={user.email}
            onChange={(e)=>setUser({...user ,email:e.target.value})}
            className='text-black rounded-lg p-2 outline-none'
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password"
            placeholder='Enter your password'
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            className='text-black rounded-lg p-2 outline-none'
          />

          <button
           className={`my-5 border p-3 rounded-2xl ${loginDisabled?'text-gray-500':'bg-black'}`}
           disabled={loginDisabled}
           onClick={login}
          >login</button>
          <Link href={'/signup'} className='text-neutral-300 bg-'>Sign up</Link>
    </div>
  )
}

