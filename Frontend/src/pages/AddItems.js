import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIROUTE } from '../components/Commonroute';
import { Authcontext } from '../context/Authcontext';

const AddItems = () => {
  const{getToken,logOut}=useContext(Authcontext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Use null for file input
  const [category, setCategory] = useState('');
  const [imagepreview,setimagepreview]=useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const token=getToken();
    if(!token){
      alert("You are not authorized");
      logOut();
      return
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', Number(price));
    formData.append('image', image); 
    formData.append('category', category);
    try {
      // await axios.post(`${APIROUTE}items/add-item`, formData);
      
      const res= await axios.post(`${APIROUTE}items/add-item`, formData,{
        headers:{
          'Content-Type':'multipart/form-data',
          'Authorization':`Bearer ${token}`
        }
        
      })
      console.log("response",res)
      if(res.data.sucess==true){
        toast.success(res.data.message);
        navigate('/');
      setName('');
      setPrice('');
      setImage(null);
      setCategory('');
      }
      
      
    } catch (err) {
      console.error('Error adding item:', err);
      toast.error('Failed to add item. Please try again.');
    }
  };
  const onfilechange=e=>{
    const file=e.target.files[0];
    setImage(file)
    //generate image preview
    const reader=new FileReader();
    reader.onloadend=()=>{
      setimagepreview(reader.result)
    }
    reader.readAsDataURL(file)
    
  }

  return (
    <>
      <br />
      <div className='w-75 m-auto border'>
        <p className='h2 text-success text-center'>Add Items</p>
        <form className='p-2' onSubmit={submit} encType='multipart/form-data'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='floatingInput'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor='floatingInput'>Name</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='number'
              className='form-control'
              id='floatingPrice'
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label htmlFor='floatingPrice'>Price</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='file'
              className='form-control'
              id='floatingImage'
              onChange={onfilechange}
              required
            />
            <label htmlFor='floatingImage'>Image</label>
            {imagepreview && 
            <div>
              <img src={imagepreview} style={{width:'200px',height:'auto'}}/>
              </div>}
          </div>
          <div className='input-group mb-3'>
            <label className='input-group-text' htmlFor='inputGroupSelect01'>
              Category:
            </label>
            <select
              className='form-select'
              id='inputGroupSelect01'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value=''>Choose any</option>
              <option value='fruits'>Fruits</option>
              <option value='vegetables'>Vegetables</option>
              <option value='meat'>Meat</option>
            </select>
          </div>
          <input type='submit' value='Submit' className='btn btn-primary' />
        </form>
      </div>
    </>
  );
};

export default AddItems;
