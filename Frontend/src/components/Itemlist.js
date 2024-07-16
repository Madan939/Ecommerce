import React from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { IMAGEURL } from './Commonroute';
const Itemlist = ({ item, idx,deleteItem }) => {
    const { _id, name, image, price, category } = item;
    return (
        <>
            <tr>
                <td>{idx + 1}</td>
                <td>{name}</td>
                <td>${price}</td>
                <td>
                    <img src={`${IMAGEURL}${image}`}alt='' className='tableimage-1 w-75' />
                    
                </td>
                <td>{category}</td>
                <td>
                    <Link to={`/Items/${_id}`}>
                        <p className='btn btn-success m-1'>Edit</p>
                    </Link>
                    <p className='btn btn-danger m-1' onClick={()=>deleteItem(_id)}>Delete</p>
                </td>
            </tr>
        </>
    );
};

export default Itemlist;
