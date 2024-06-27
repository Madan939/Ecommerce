import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../store/cartSlice'
import axios from 'axios'
import { APIROUTE } from '../components/Commonroute'
const Customers = () => {
  const [customerlist, setcustomerlist] = useState([])
  const dispatch = useDispatch()
  const getcustomerlist = async () => {
    dispatch(showloading())
    await axios.get(`${APIROUTE}bills/bill-list`)
      .then(res => {
        setcustomerlist(res.data)
        dispatch(hideloading())
      })
      .catch(err => {
        console.log(err)
        dispatch(hideloading())
      })
  }
  useEffect(() => {
    getcustomerlist()

  }, [])
  return (
    <>
      <p className='h5 text-center mt-3'>Customers Lists</p>
      <table className='table table-bordered align-middle text-center table-hover'>
        <thead>
          <tr >
            <th>SN</th>
            <th>Customer name</th>
            <th>Customer phone</th>
          </tr>
        </thead>
        <tbody>
          {customerlist && customerlist.map((item, idx) => (
            <tr key={item._id}>
              <td>{idx + 1}</td>
              <td>{item.customername}</td>
              <td>{item.customerphone}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}

export default Customers