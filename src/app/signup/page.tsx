'use client'

import React ,{ useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {

    const [user,setUser] = useState({
         username:"",
         password:"",
         email:""
    })

    const [signUpDisabled , setSignUpDisabled] = useState(true)
    const [loading , setLoading] = useState(false)
    const router = useRouter();
  
    const singUP = async function(){
          try {
                      
             setLoading(true);
             const response = await axios.post('/api/users/signup',user)
             console.log('signup successfully' ,response.data)
             setLoading(false)
             router.push('/login')
           } 
           catch (error:any) {
               console.log("signup failed")
               toast(error.message) 
            }  
        }
 
  // to make submit buttom disable till all field get fill
     useEffect(()=>{
          if(user.email.length>0 && user.password.length>0 && user.username.length>0){
               setSignUpDisabled(false)
          }
          else{
             setSignUpDisabled(true)
            }
     },[user])     

    return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
       <h1 className='mb-6'>{loading?"processing...":"Signup"}</h1>

          <label htmlFor="username">Username</label>
          <input type="text" 
            name="username" 
            id="username"
            placeholder='Enter username'
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            className='text-black rounded-lg p-2 outline-none'
          />
          
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
           className={`my-5 border p-3 rounded-2xl ${signUpDisabled?'text-gray-500':'bg-black'}`}
           disabled={signUpDisabled}
           onClick={singUP}
          >SignUp</button>
          <Link href={'/login'} className='text-neutral-300 bg-'>login here</Link>
    </div>
  )
}

