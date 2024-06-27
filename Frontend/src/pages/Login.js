// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link,  useNavigate } from 'react-router-dom'
// import { APIROUTE } from '../components/Commonroute'
// const Login = () => {
//     const [email, setemail] = useState('')
//     const [password, setpassword] = useState('')
//     const navigate=useNavigate()
//     function loginform(e) {
//         e.preventDefault()
//         const data = {
//             email: email,
//             password: password
//         }
//         console.log(data)
//         axios.post(`${APIROUTE}users/userLogin`, data)
//             .then((res) => {
//                 //console.log(res.data.user)
//                 localStorage.setItem('User', JSON.stringify(res.data.user))
//                 navigate("/")
//             })
//             .catch(err => {
//                 console.log(err)
//             })

//     }
//     useEffect(()=>{
//         if(localStorage.getItem('User')){
//             navigate("/")
//         }
        
//     },[])
//     return (
//         <>
//             <div className='w-50 m-auto border container my-3'>
//                 <p className='h2 text-primary text-center' >Login Form</p>
//                 <form className='p-2' onSubmit={loginform} >
//                     <div className="form-floating mb-3">
//                         <input type="email" className="form-control" id="floatingInput" placeholder='' onChange={(e) => setemail(e.target.value)} value={email} />
//                         <label htmlFor="floatingInput">Email</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input type="password" className="form-control" id="floatingPrice" placeholder='' onChange={(e) => setpassword(e.target.value)} value={password} />
//                         <label htmlFor="floatingPrice">Password</label>
//                     </div>
//                     <div className=''>
//                         <input type='submit' value="Login" className='btn btn-primary m-2' />
//                         <Link className='m-2' to="/Signup">Didn't have an account? Register</Link>
//                     </div>

//                 </form>
//             </div>
//         </>
//     )
// }

// export default Login
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APIROUTE } from '../components/Commonroute'

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()

    function loginform(e) {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        console.log(data)
        axios.post(`${APIROUTE}users/userLogin`, data)
            .then((res) => {
                //console.log(res.data.user)
                localStorage.setItem('User', JSON.stringify(res.data.user))
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (localStorage.getItem('User')) {
            navigate("/")
        }
    }, [navigate]) // Added navigate to the dependency array

    return (
        <>
            <div className='w-50 m-auto border container my-3'>
                <p className='h2 text-primary text-center' >Login Form</p>
                <form className='p-2' onSubmit={loginform} >
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder='' onChange={(e) => setemail(e.target.value)} value={email} />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPrice" placeholder='' onChange={(e) => setpassword(e.target.value)} value={password} />
                        <label htmlFor="floatingPrice">Password</label>
                    </div>
                    <div className=''>
                        <input type='submit' value="Login" className='btn btn-primary m-2' />
                        <Link className='m-2' to="/Signup">Didn't have an account? Register</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
