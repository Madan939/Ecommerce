import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideloading, showloading } from '../store/cartSlice';
import { APIROUTE } from '../components/Commonroute';
import Billlist from '../components/Billlist';

const Bills = () => {
  const [billlist, setbilllist] = useState([])
  const dispatch = useDispatch()
  const getbilllist = async () => {
    dispatch(showloading())
    await axios.get(`${APIROUTE}bills/bill-list`)
      .then(res => {
        setbilllist(res.data)
        dispatch(hideloading())
      })
      .catch(err => {
        console.log(err)
        dispatch(hideloading())
      })
  }
  useEffect(() => {
    getbilllist()
  }, [])
  //console.log(billlist)
  return (
    <>
      <p className='h5 text-primary p-2 text-center'>List of bills</p>
      <div className='container-fluid mt-3'>
        <table className='table table-bordered align-middle  table-hover'>
          <thead>
            <tr className='text-center' >
              <th>SN</th>
              <th>Customer_Name</th>
              <th>Customer_Phone</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {billlist && billlist.map((customer, idx) => (
              <Billlist customer={customer} idx={idx} key={idx} />
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default Bills;
