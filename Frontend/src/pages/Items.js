import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Itemlist from '../components/Itemlist'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../store/cartSlice'
import { APIROUTE } from '../components/Commonroute'
import { toast } from 'react-toastify'

const Items = () => {
  const [allitems, setAllitems] = useState([])
  const dispatch = useDispatch()
  const getallitems = async () => {
    dispatch(showloading())
    await axios.get(`${APIROUTE}items/getallitems`)
      .then(res => {
        //console.log(res)
        dispatch(hideloading())
        setAllitems(res.data)

      })
      .catch(err => {
        console.log(err)
        dispatch(hideloading())
      })
  }
  useEffect(() => {
    getallitems()
  }, [])
  const deleteItem = async (_id) => {
    console.log(_id)
    dispatch(showloading())
    await axios.post(`${APIROUTE}items/deleteitem/${_id}`)

      .then(res => {
        getallitems()
        toast.error(`Item deleted successfully`);
        dispatch(hideloading())
      })
      .catch(err => {
        console.log(err);
        toast.error("Error deleting item");
        dispatch(hideloading())
      });
  };
  return (
    <>
      <p className='text-primary h4 '>ItemList</p><br />
      <Link to='/AddItems'>Add Items</Link>
      <table className='table table-bordered text-center align-middle '>
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allitems && allitems.map((item, idx) => (
            <Itemlist item={item} key={idx} idx={idx} deleteItem={deleteItem} />
          ))}

        </tbody>
      </table>
    </>
  )
}

export default Items