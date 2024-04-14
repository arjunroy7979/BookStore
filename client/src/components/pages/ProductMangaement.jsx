import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const ProductMangaement = () => {
    const [book, setBook] = useState({
        img: '',
        name: '',
        author: '',
        publishername: '',
        publisherdate: '',
        qty: '',
        language: '',
        price: '',
        newprice: '',

    });


    const register = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.8:8080/product-listing', book)
            .then((res) => {
                if (res.data.status === 200) {
                    toast(res.data.message);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container mt-3'>
            <h4 className='text-center text-danger'><u>Product Listing</u></h4>
            <form action="" className='border border-primary bg-light p-5 m-4' onSubmit={register}>
                <div className="d-flex gap-3">
                    <div className="mt-3 w-100">
                        <label htmlFor="" className='form-label'>Books Image URL</label>
                        <input type="text" name="img" className='form-control' onChange={e => setBook({ ...book, img: e.target.value })} />
                    </div>
                    <div className="mt-3 w-100">
                        <label for="role" className="form-label">Language</label>
                        <select name="" id="" className='form-control' onChange={e => setBook({ ...book, language: e.target.value })}>
                            <option>select</option>
                            <option name="hindi" value={"hindi"} >Hindi</option>
                            <option name="english" value={"english"}>English</option>
                            <option name="bangla" value={"bangla"}>Bangla</option>
                            <option name="sanskrit" value={"sanskrit"}>Sanskrit</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <div className="mt-3 w-100">
                        <label htmlFor="" className='form-label'>Books Name</label>
                        <input type="text" className='form-control' name='name' onChange={e => setBook({ ...book, name: e.target.value })} />
                    </div>
                    <div className="mt-3 w-100">
                        <label htmlFor="" className='form-label'>Author Name</label>
                        <input type="text" className='form-control' name='author' onChange={e => setBook({ ...book, author: e.target.value })} />
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <div className="mt-3 w-100">
                        <label htmlFor="" className='form-label'>Publisher Name</label>
                        <input type="text" className='form-control' name='publishername' onChange={e => setBook({ ...book, publishername: e.target.value })} />
                    </div>
                    <div className="mt-3 w-100">
                        <label htmlFor="" className='form-label'>Publisher Date</label>
                        <input type="date" className='form-control' name='publisherdate' onChange={e => setBook({ ...book, publisherdate: e.target.value })} />
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <div className="mt-3 w-100">
                        <label htmlFor="" className='form-label'>Quantity</label>
                        <input type="number" className='form-control' name='qty' onChange={e => setBook({ ...book, qty: e.target.value })} />
                    </div>
                    <div className="mt-3 w-100">
                        <label htmlFor="" className='form-label'>Actual Price</label>
                        <input type="number" className='form-control' name='price' onChange={e => setBook({ ...book, price: e.target.value })} />
                    </div>
                    <div className="mt-3 w-100">
                        <label htmlFor="" className='form-label'>Offer Price</label>
                        <input type="number" className='form-control' name='newprice' onChange={e => setBook({ ...book, newprice: e.target.value })} />
                    </div>
                </div>
                <div className="mt-3 w-100 text-center">
                    <button className='btn btn-sm btn-primary w-50'>Product Added</button>
                </div>
            </form>
        </div >
    )
}

export default ProductMangaement
