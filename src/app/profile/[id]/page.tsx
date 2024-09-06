import React from 'react'
import mongoose from 'mongoose'

export default function page({params}:{params:{id:mongoose.Types.ObjectId}}) {
  return (
    <div className='flex justify-center items-center min-h-screen'>
         <p className='bg-blue-400 p-2 text-black'>{ params.id.toString()}</p>
    </div>
  )
}
