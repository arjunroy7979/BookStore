import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
  const location = useLocation();
  const receivedData = location.state;
  const [book, setBook] = useState({
    img: receivedData.img,
    name: receivedData.name,
    author: receivedData.author,
    publishername: receivedData.publishername,
    publisherdate: receivedData.publisherdate,
    qty: receivedData.qty,
    language: receivedData.language,
    price: receivedData.price,
    newprice: receivedData.newprice,
  });
  const [selectedLanguage, setSelectedLanguage] = useState(receivedData.language);
  const { img, name, author, publisherdate, publishername, qty, language, price, newprice } = book;
  const { _id } = receivedData


  const handleChange = (e) => {
    let { name, value } = e.target;
    setBook({
      ...book,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.8:8080/product/${_id}`, book)
      .then((res) => {
        toast(res.data.message);
      })
      .catch(err => console.log(err));
  }

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setBook({
      ...book,
      language: e.target.value,
    });
  };

  return (
    <div className='container mt-3'>
      <h3 className='text-center text-danger'><u>Product Update</u></h3>
      <form action="" className='border border-primary bg-light p-5 m-4' onSubmit={handleSubmit}>
        <div className="d-flex gap-3">
          <div className="mt-3 w-100">
            <label htmlFor="" className='form-label'>Books Image URL</label>
            <input type="text" name="img" className='form-control' value={img} onChange={handleChange} />
          </div>
          <div className="mt-3 w-100">
            <label for="role" className="form-label">Language</label>
            <select className='form-control' value={selectedLanguage} onChange={handleLanguageChange}>
              <option value='none'>Select</option>
              <option value='hindi'>Hindi</option>
              <option value='english'>English</option>
              <option value='bangla'>Bangla</option>
              <option value='sanskrit'>Sanskrit</option>
            </select>
          </div>
        </div>
        <div className="d-flex gap-3">
          <div className="mt-3 w-100">
            <label htmlFor="" className='form-label'>Books Name</label>
            <input type="text" className='form-control' name='name' value={name} onChange={handleChange} />
          </div>
          <div className="mt-3 w-100">
            <label htmlFor="" className='form-label'>Author Name</label>
            <input type="text" className='form-control' name='author' value={author} onChange={handleChange} />
          </div>
        </div>
        <div className="d-flex gap-3">
          <div className="mt-3 w-100">
            <label htmlFor="" className='form-label'>Publisher Name</label>
            <input type="text" className='form-control' name='publishername' value={publishername} onChange={handleChange} />
          </div>
          <div className="mt-3 w-100">
            <label htmlFor="" className='form-label'>Publisher Date</label>
            <input type="date" className='form-control' name='publisherdate' value={publisherdate} onChange={handleChange} />
          </div>
        </div>
        <div className="d-flex gap-3">
          <div className="mt-3 w-100">
            <label htmlFor="" className='form-label'>Quantity</label>
            <input type="number" className='form-control' name='qty' value={qty} onChange={handleChange} />
          </div>
          <div className="mt-3 w-100">
            <label htmlFor="" className='form-label'>Actual Price</label>
            <input type="number" className='form-control' name='price' value={price} onChange={handleChange} />
          </div>
          <div className="mt-3 w-100">
            <label htmlFor="" className='form-label'>Offer Price</label>
            <input type="number" className='form-control' name='newprice' value={newprice} onChange={handleChange} />
          </div>
        </div>
        <div className="mt-3 w-100 text-center">
          <button className='btn btn-sm btn-primary w-50'>Product Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
