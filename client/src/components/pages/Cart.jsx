import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.8:8080/cart-data')
            .then((res) => {
                setCartData(res.data.cartData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.8:8080/cart-data/${id}`)
            .then((res) => {
                console.log(res)
                setCartData(cartData.filter(item => item._id !== id));
                toast.success(res.data.message)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleQtyDecrese = (id) => {
        axios.put(`http://127.0.0.8:8080/cart-data/decrease/${id}`)
            .then((res) => {
                // Decrease quantity in the cart
                setCartData(cartData.map(item => item._id === id ? { ...item, qty: item.qty - 1 } : item));
                toast.success(res.data.message);
                // Increase quantity in the product API
                axios.put(`http://127.0.0.8:8080/product/increase-qty/${id}`)
                    .then((res) => {
                        console.log(res.data.message);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleQtyIncrease = (id) => {
        axios.put(`http://127.0.0.8:8080/cart-data/increase/${id}`)
            .then((res) => {
                // Increase quantity in the cart
                setCartData(cartData.map(item => item._id === id ? { ...item, qty: item.qty + 1 } : item));
                toast.success(res.data.message);
                // Decrease quantity in the product API
                axios.put(`http://127.0.0.8:8080/product/decrease-qty/${id}`)
                    .then((res) => {
                        console.log(res.data.message);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <>
            <div className='container-fluid'>
                <div className='d-flex'>
                    <div className="row">
                        {
                            cartData && cartData.map((item) => {
                                return (
                                    <div className="col-md-12 mt-3">
                                        <div className="row border w-100">
                                            <div className="col-md-2 text-center">
                                                <img src={item.img} alt="" height={'120px'} />
                                            </div>
                                            <div className="col-md-10">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h5 className='p-0 m-0 text-danger'>{item.name}</h5><span className='text-sm'>(Hard Cover - {item.language}) | Released: {item.publisherdate}</span>
                                                        <p className='p-0 m-0 text-sm'>By: {item.author} (Author) | Publisher: {item.publishername}</p>
                                                    </div>
                                                    <div className="col-md-12 d-flex gap-2">
                                                        <p className='p-0 m-0 text-sm text-danger'>₹{item.newprice*item.qty} |</p>
                                                        <s className='p-0 m-0 text-sm text-secondary'>M.R.P. :₹{item.price}</s>
                                                    </div>
                                                    <div className="col-md-2 d-flex gap-3">
                                                        <i class="fa fa-minus-circle btn btn-sm" onClick={() => handleQtyDecrese(item._id)} />
                                                        <p className='p-0 m-0'>{item.qty}</p>
                                                        <i class="fa fa-plus-circle btn btn-sm" onClick={() => handleQtyIncrease(item._id)} />
                                                    </div>
                                                    <div className="col-md-10  d-flex justify-content-end m-0 p-0">
                                                        <i className="fa fa-trash btn text-danger" onClick={() => handleDelete(item._id)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='border mt-3 w-50 h-50'>
                        45
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
