import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminProductDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.8:8080/product')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  const handleUpdate = (id) => {
    axios.get(`http://127.0.0.8:8080/product/${id}`)
      .then((res) => {
        // console.log(res.data.data)
        if (res.data.status === 200) {
          navigate('/admin/update-product', { state: res.data.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.8:8080/product/${id}`)
      .then((res) => {
        console.log(res)
        setData(data.filter(item => item._id !== id));
        toast(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='container-fluid'>
      <h3 className='text-center text-danger mt-3'><u>Product Details</u></h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr className='text-sm'>
            <th scope="col">ID</th>
            <th scope="col">Product Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Author</th>
            <th scope="col">Publisher Name</th>
            <th scope="col">Publisher Date</th>
            <th scope="col">Available Product</th>
            <th scope="col">Language</th>
            <th scope="col">Price</th>
            <th scope="col">Offer Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.map((item) => {
              const { _id, img, name, author, publishername, publisherdate, qty, language, price, newprice } = item;
              return (
                <tr className='text-sm'>
                  <td scope="row">{_id}</td>
                  <td className="text-center">
                    <img src={img} alt={name} height={50} width={50} />
                  </td>
                  <td>{name}</td>
                  <td>{author}</td>
                  <td>{publishername}</td>
                  <td>{publisherdate}</td>
                  <td className="text-center">{qty === 0 ? "Stock Empty" : qty}</td>
                  <td>{language}</td>
                  <td>{price}</td>
                  <td>{newprice}</td>
                  <td className='d-flex gap-1'>
                    <button onClick={() => handleUpdate(_id)} className="fa fa-pencil-square-o btn btn-primary" aria-hidden="true"></button>
                    <i className="fa fa-trash-o btn btn-danger" onClick={() => handleDelete(_id)} aria-hidden="true"></i>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminProductDetails
