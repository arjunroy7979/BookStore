import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const Model = ({ onClose, viewData }) => {

    const handleCart = (data) => {
        console.log(data)
        axios.post('http://127.0.0.8:8080/add-to-cart', {
            data
        }).then(response => {
            if(response.status===200){
                toast.success(response.data.message)
            }
            console.log(response.data);
        }).catch(error => {
            console.error('Error adding product to cart:', error);
        });
    }

    return (
        <>
            <div className="pop-up border border-danger rounded shadow-lg w-50 bg-light">
                <div className='p-0 m-0 d-flex justify-content-end'>
                    <i className="fa fa-times btn btn-sm m-0" onClick={() => { onClose() }} />
                </div>
                <div className='container-fluid mb-2'>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img src={viewData.img} alt={viewData.name} height={"200 px"} />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className='text-danger'>{viewData.name}</h5>
                                    <span className='text-sm'>(Hard Cover - {viewData.language}) | Released: {viewData.publisherdate}</span>
                                    <p className='p-0 m-0 text-sm'>By: <span className='text-primary'>{viewData.author}</span> (Author) |</p>
                                    <p className='p-0 m-0 text-sm'> Publisher: <span className='text-primary'>{viewData.publishername}</span></p>
                                </div>
                                <div className="col-md-12">
                                    <p className='p-0 m-0 text-sm text-danger'>₹{viewData.newprice}</p>
                                    <p className='p-0 m-0 text-sm text-secondary'><s>M.R.P. :₹{viewData.price}</s></p>
                                </div>
                                <div className="col-md-12">
                                    <p className='p-0 m-0 text-sm text-success'>Available</p>
                                    <p className='p-0 m-0 text-sm'>Ships within 4-6 Business Days</p>
                                    <button className='btn btn-sm btn-success mt-1 mb-2' onClick={() => { handleCart(viewData) }}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Model
