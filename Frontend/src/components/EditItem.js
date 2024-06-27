import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { APIROUTE } from './Commonroute'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const EditItem = () => {
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [image, setimage] = useState('')
    const [category, setcategory] = useState('')
    const { _id } = useParams()
    const navigate=useNavigate()
    useEffect(() => {
        if (_id) {
            axios.get(`${APIROUTE}items/edit/${_id}`)
                .then(res => {
                    setname(res.data.name)
                    setprice(res.data.price)
                    setimage(res.data.image)
                    setcategory(res.data.category)  
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [_id])

    const updateform = async (e) => {
        e.preventDefault()
        const data = {
            id:_id,
            name: name,
            price: Number(price),
            image: image,
            category: category
        }
        await axios.post(`${APIROUTE}items/update`, data)
            .then(res => {
                console.log(res.data)
                toast.success("Item updated successfully");
                navigate('/Items')

            })
            .catch(err => {
                console.log(err)
               
            })
        console.log(data)
    }
    return (
        <>
            <p>Item Edit</p>
            <div className='w-50 m-auto border'>
                <p className='h2 text-success text-center'>Edit Item</p>
                <form className='p-2' onSubmit={updateform}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder='' onChange={(e) => setname(e.target.value)} value={name||''} />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="double" className="form-control" id="floatingPrice" placeholder='' onChange={(e) => setprice(e.target.value)} value={price||''} />
                        <label htmlFor="floatingPrice">Price</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingimage" placeholder='' onChange={(e) => setimage(e.target.value)} value={image||''} />
                        <label htmlFor="floatingimage">Image URL</label>
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Category:</label>
                        <select className="form-select" id="inputGroupSelect01" onChange={(e) => setcategory(e.target.value)} value={category||''}>
                            <option>Choose any</option>
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="meat">Meat</option>
                        </select>
                    </div>
                    <input type='submit' value="Update" className='btn btn-primary' />
                </form>
            </div>
        </>
    )
}

export default EditItem;
