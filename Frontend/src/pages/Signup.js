// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { APIROUTE } from '../components/Commonroute'

// const Signup = () => {
//     const [uname, setuname] = useState('')
//     const [email, setemail] = useState('')
//     const [password, setpassword] = useState('')
//     const navigate = useNavigate()
//     function loginform(e) {
//         e.preventDefault()
//         const data = {
//             name: uname,
//             email: email,
//             password: password
//         }
//         console.log(data)
//         axios.post(`${APIROUTE}users/userRegister`, data)
//             .then((res) => {
//                 console.log(res.data.message)
//                 navigate('/Login')
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
//                 <p className='h2 text-primary text-center' >Sign up Form</p>
//                 <form className='p-2' onSubmit={loginform} >
//                     <div className="form-floating mb-3">
//                         <input type="text" className="form-control" id="floatingInputuname" placeholder='' onChange={(e) => setuname(e.target.value)} value={uname} />
//                         <label htmlFor="floatingInputuname">Username</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input type="email" className="form-control" id="floatingInputemail" placeholder='' onChange={(e) => setemail(e.target.value)} value={email} />
//                         <label htmlFor="floatingInputemail">Email</label>
//                     </div>
//                     <div className="form-floating mb-3">
//                         <input type="password" className="form-control" id="floatingPass" placeholder='' onChange={(e) => setpassword(e.target.value)} value={password} />
//                         <label htmlFor="floatingPass">Password</label>
//                     </div>
//                     <div className=''>
//                         <input type='submit' value="Register" className='btn btn-primary m-2' />
//                         <Link className='m-2 ' to="/Login">Already have an account?Login</Link>
//                     </div>

//                 </form>
//             </div>
//         </>
//     )
// }

// export default Signup
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APIROUTE } from '../components/Commonroute'

const Signup = () => {
    const [uname, setuname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()

    function loginform(e) {
        e.preventDefault()
        const data = {
            name: uname,
            email: email,
            password: password
        }
        console.log(data)
        axios.post(`${APIROUTE}users/userRegister`, data)
            .then((res) => {
                console.log(res.data.message)
                navigate('/Login')
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
                <p className='h2 text-primary text-center' >Sign up Form</p>
                <form className='p-2' onSubmit={loginform} >
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputuname" placeholder='' onChange={(e) => setuname(e.target.value)} value={uname} />
                        <label htmlFor="floatingInputuname">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInputemail" placeholder='' onChange={(e) => setemail(e.target.value)} value={email} />
                        <label htmlFor="floatingInputemail">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPass" placeholder='' onChange={(e) => setpassword(e.target.value)} value={password} />
                        <label htmlFor="floatingPass">Password</label>
                    </div>
                    <div className=''>
                        <input type='submit' value="Register" className='btn btn-primary m-2' />
                        <Link className='m-2 ' to="/Login">Already have an account?Login</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
