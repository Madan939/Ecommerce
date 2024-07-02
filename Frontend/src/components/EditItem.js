import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { APIROUTE, IMAGEURL } from './Commonroute'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const EditItem = () => {
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [image, setimage] = useState(null)
    const [imageUrl, setimageUrl] = useState(null)
    const [imagepreview, setimagepreview] = useState(null)
    const [category, setcategory] = useState('')
    const { _id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (_id) {
            axios.get(`${APIROUTE}items/edit/${_id}`)
                .then(res => {
                    setname(res.data.name)
                    setprice(res.data.price)
                    setimageUrl(res.data.image)
                    setcategory(res.data.category)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [_id])

    const updateform = async (e) => {
       
        e.preventDefault()
        console.log("hello")
        // const data = {
        //     id: _id,
        //     name: name,
        //     price: Number(price),
        //     image: image,
        //     category: category
        // }
        const formData = new FormData();
        formData.append('id',_id);
        formData.append('name', name);
        formData.append('price', Number(price));
        // formData.append('image', image); 
        formData.append('category', category);
        if(image){
            formData.append('image',image)
        }
        else{
            formData.append('image',imageUrl)
        }
         await axios.post(`${APIROUTE}items/update`, formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
            .then(res => {
                //console.log(res.data)
                toast.success("Item updated successfully");
                navigate('/Items')

            })
            .catch(err => {
                console.log(err)

            })
        // console.log(data)
    }
    const onfilechange = e => {
        setimageUrl(null)
        const file = e.target.files[0];
        setimage(file)
        //generate image preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setimagepreview(reader.result)
        }
        reader.readAsDataURL(file)

    }

    return (
        <>
            <p>Item Edit</p>
            <div className='w-50 m-auto border'>
                <p className='h2 text-success text-center'>Edit Item</p>
                <form className='p-2' onSubmit={updateform}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder='' onChange={(e) => setname(e.target.value)} value={name || ''} />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="double" className="form-control" id="floatingPrice" placeholder='' onChange={(e) => setprice(e.target.value)} value={price || ''} />
                        <label htmlFor="floatingPrice">Price</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type='file'
                            className='form-control'
                            id='floatingImage'
                            
                            onChange={onfilechange}
                            
                        />
                        <label htmlFor='floatingImage'>Image</label>
                        {!imageUrl ?(
                             <div>
                             <img src={imagepreview} style={{ width: '200px', height: 'auto' }} />
                         </div>
                        ):(
                            <div>
                            <img src={`${IMAGEURL}${imageUrl}`} style={{ width: '200px', height: 'auto' }} />
                        </div>  
                        )
                           
                            }
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Category:</label>
                        <select className="form-select" id="inputGroupSelect01" onChange={(e) => setcategory(e.target.value)} value={category || ''}>
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
