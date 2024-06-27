import React, { useEffect, useState } from 'react'
import Carts from '../components/Carts'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cartlist = () => {
    const cardlist = useSelector(state => state.cartState.cartlist)
    const [subtotal, settotal] = useState(0)
    useEffect(() => {
        let temp = 0
        cardlist.forEach((item) => {
            temp = temp + (item.price * item.quantity)
        })
        settotal(temp)
    }, [cardlist])
    //console.log(subtotal)
    return (
        <>
            <p className='h4 text-primary '>Shopping Cart</p>
            <div class="d-flex justify-content-between">

                <p className='h4'>Total price=${subtotal.toFixed(4)}</p>
                {cardlist && cardlist.length > 0 &&
                    <Link to="/chargebill" className='btn btn-success'>Charge Bill</Link>
                }
            </div>
            <br />
            <div className='row'>
                {cardlist.map((item, idx) =>
                    <Carts key={item._id} item={item} idx={idx} />
                )}
            </div>

        </>
    )
}

export default Cartlist