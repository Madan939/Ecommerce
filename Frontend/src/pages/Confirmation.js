import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { APIROUTE } from '../components/Commonroute';
import axios from 'axios';

const Confirmation = () => {
    const [validUrl,setvalidUrl]=useState(false);
    const params=useParams()
    useEffect(()=>{
        const verifyemail=async()=>{
            try{
                const url=`${APIROUTE}users/confirmation/${params.token}`
                const {data}= await axios.get(url)
                console.log(data)
                setvalidUrl(true)

            }
            catch(err){
                console.log(err)
                setvalidUrl(false)
            }
        }
        verifyemail()
    },[])
  return (
    <>
    {validUrl?(
        <>
        <h1>EMail verified successfully</h1>
        <Link to='/Login' className='btn btn-primary'> Back to login </Link>
        </>     

    ):(
        <>
        <h1 className='text-center '>Something went wrong</h1>
        <Link to='/Signup' className='btn btn-primary'> Back to register </Link>
        </>
        
    )}
    </>
  )
}

export default Confirmation