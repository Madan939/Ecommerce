import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { APIROUTE } from '../components/Commonroute'
import { useNavigate } from 'react-router-dom'

const Chargebill = () => {
    const [cname, setcname] = useState('')
    const [cphone, setcphone] = useState('')
    const [cpayment, setcpayment] = useState('')
    const cardlist = useSelector(state => state.cartState.cartlist)
    const [subtotal, settotal] = useState(0)
    const user = JSON.parse(localStorage.getItem('User'))
    const navigate = useNavigate()
    useEffect(() => {
        let temp = 0
        cardlist.forEach((item) => {
            temp = temp + (item.price * item.quantity)
        })
        settotal(temp)
    }, [cardlist])
    //console.log(subtotal)
    function handlesubmit(e) {

        e.preventDefault()
        let data = {
            customername: cname,
            customerphone: cphone,
            payment: cpayment,
            subtotal: subtotal,
            tax: Number((subtotal * 0.1).toFixed(2)),
            totalamount: Number((subtotal + (subtotal * 0.1)).toFixed(2)),
            user: user.name,
            item: cardlist
        }
        console.log(data)
        axios.post(`${APIROUTE}bills/charge-bill`, data)
            .then((res) => {
                console.log(res.data.message)
                localStorage.removeItem('cartItems')
                navigate('/')

            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <div className='w-50 m-auto border container my-3'>

                <form className='p-2' onSubmit={handlesubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="cname" placeholder='' onChange={(e) => setcname(e.target.value)} value={cname} />
                        <label htmlFor="cname">Customer name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="cphone" placeholder='' onChange={(e) => setcphone(e.target.value)} value={cphone} />
                        <label htmlFor="cphone">Phone</label>
                    </div>
                    <div className=" mb-3">
                        <label>Payment method:</label>
                        <select classame="form-select" aria-label="Default select example" onChange={(e) => setcpayment(e.target.value)} value={cpayment} >
                            <option value="">select any</option>
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>

                        </select>
                    </div>
                    {subtotal && subtotal > 0 &&
                        <div className='mb-3'>
                            <p className='h5'>Subtotal:${subtotal}</p>

                            <p className='h5'>Tax:${(subtotal * 0.1).toFixed(2)}</p>
                            <p className='h5'>GrandTotal:${(subtotal + (subtotal * 0.1)).toFixed(2)}</p>
                        </div>
                    }

                    <div className=''>
                        <input type='submit' value="Submit" className='btn btn-primary m-2' />
                    </div>

                </form>
            </div>
        </>
    )
}

export default Chargebill