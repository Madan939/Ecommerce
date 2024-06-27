import React from 'react';
import { useDispatch } from 'react-redux';
import { remove, updateCartQuantity } from '../store/cartSlice';
import { toast } from 'react-toastify';

const Carts = ({ item, idx }) => {
    const dispatch = useDispatch()

    const { name, image, price, quantity, category } = item;
    const Quantity = (quantity * price).toFixed(2)
    const sub = () => {
        if (quantity > 1) {
            dispatch(updateCartQuantity({ productId: item._id, newQuantity: quantity - 1 }));
        }
    }
    const add = () => {
        dispatch(updateCartQuantity({ productId: item._id, newQuantity: quantity + 1 }));
    }
    const handleRemoveFromCart = () => {
        dispatch(remove(item));
        toast.error(`${name} removed from cart`);
    };
    return (
        <>

            <div className='col-md-6  mb-2 '>
                <div className="card-2 card">
                    <div className='row container-fluid p-2'>
                        <div className='col-md-5'>
                            <img src={image} className='tableimage' alt="" />
                        </div>
                        <div className='col-md-7'>
                            <div className='d-flex'>
                                <p className='h5 m-2'>{name}</p>
                                <p className='m-2'>Price:${price}</p>
                            </div>
                            <p>Quantity:
                                <button onClick={sub} className='btn bg-body-secondary m-2'>-</button>
                                <span>{quantity}</span>
                                <button onClick={add} className='btn bg-body-secondary m-2'>+</button>
                            </p>
                            <p>Category:{category}</p>
                            <div className='d-flex justify-content-space-between'>
                                <p className='m-1'>Subtotal:${Quantity}</p>
                                <button onClick={handleRemoveFromCart} className='btn btn-danger bg-danger m-auto'>Remove</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default Carts;

