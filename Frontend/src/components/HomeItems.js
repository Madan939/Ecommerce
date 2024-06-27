import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../store/cartSlice';
import { toast } from 'react-toastify';
const HomeItems = ({ item }) => {
    const dispatch = useDispatch();
    const { cartlist } = useSelector(state => state.cartState);
    const [addedToCart, setAddedToCart] = useState(false);
    const { _id, name, image, price, category } = item;

    useEffect(() => {
        const productsInCart = cartlist.find(cartItem => cartItem._id === _id);
        setAddedToCart(!!productsInCart);
    }, [_id, cartlist]);

    const handleAddToCart = () => {
        dispatch(add(item));
        toast.success(`${name} added to cart!`);
    };

    const handleRemoveFromCart = () => {
        dispatch(remove(item));
        toast.error(`${name} removed from cart`);
    };

    return (
        <>
            <div className='col-md-3 mt-2 mb-2'>
                <div className="card-1 card">
                    <img src={image} className="image card-img-top p-2" alt="" />
                    <p className='h6 text-dark text-center'>Name={name}</p>
                    <p className=' text-center'>Price=${price}</p>
                    <p className=' text-center'>Category={category}</p>
                    {addedToCart ? (
                        <button onClick={handleRemoveFromCart} className='w-75 m-auto btn btn-danger mb-2'>Remove</button>
                    ) : (
                        <button onClick={handleAddToCart} className='w-75 m-auto btn btn-primary mb-2'>Add to cart</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomeItems;
