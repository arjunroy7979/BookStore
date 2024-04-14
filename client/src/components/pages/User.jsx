import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Model from './Model';

const User = () => {
  const [data, setData] = useState([]);
  // const [cartData, setCartData] = useState([]);
  const [viewData, setViewData] = useState();
  const [modelOpen, setModelOpen] = useState(false);
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();

  const [emaildata] = useState(
    {
      email: receivedData.email
    }
  )

  useEffect(() => {
    axios.get('http://127.0.0.8:8080/product')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleIssueBook = (id, qty) => {
  //   if (qty > 0) {
  //     const updatedData = data.map(item => {
  //       if (item._id === id) {
  //         return {
  //           ...item,
  //           qty: item.qty - 1
  //         };
  //       }
  //       return item;
  //     });
  //     setData(updatedData);

  //     axios.put(`http://127.0.0.8:8080/products/${id}`, { qty: qty - 1 })
  //       .then((res) => {
  //         toast(res.data.message);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // const sendCartData = (id) => {
  //   const selectedItem = data.find((item) => item._id === id);
  //   if (selectedItem) {
  //     const updatedCartData = [...cartData, selectedItem];
  //     if (updatedCartData.length > 0) {
  //       setCartData(updatedCartData)
  //       navigate('/user/cart', { state: updatedCartData })
  //     } else {
  //       alert("cart is empty")
  //     }
  //   }
  // };

  const handleViewDetails = (product) => {
    setModelOpen(true)
    setViewData(product)

  };

  const handleModelClose = () => {
    setModelOpen(false)
  }

  return (
    <>
      <Navbar fullname={receivedData.fullname} emaildata={emaildata} />
      <div className='container-fluid'>
        {
          data && data.map((item) => {
            return (
              item.qty === 0 ? "" :
                <div className="card mx-3 mt-3" style={{ width: "18rem", display: 'inline-block' }} key={item._id}>
                  <img className="card-img-top" src={item.img} alt="Card image cap" height={200} />
                  <div className="card-body m-0 p-1">
                    <p className="card-text text-sm p-0 m-0"><b>Books Name:</b> {item.name.substring(0, 18)}</p>
                    <p className="card-text text-sm p-0 m-0"><b>Author Name:</b> {item.author}</p>
                    <p className="card-text text-sm p-0 m-0"><b>Publisher:</b> {item.publishername}</p>
                    <p className="card-text text-sm p-0 m-0"><b>Total Items:</b> {item.qty} | <b>Released:</b> {item.publisherdate}</p>
                    <button className='btn btn-sm btn-outline-dark form-control' onClick={() => handleViewDetails(item)}>View Details</button>
                    {/* <button className="card-text w-100 text-sm p-1 m-0 btn btn-sm btn-danger mt-1" onClick={() => handleIssueBook(item._id, item.qty)}>Issue Book</button> */}
                    {/* <i className="fa fa-cart-plus btn p-0 m-0" onClick={() => sendCartData(item._id)} /> */}
                  </div>
                </div>
            )
          })
        }
      </div>
      {
        modelOpen && (
          <Model onClose={handleModelClose} viewData={viewData} />
        )
      }
    </>
  )
}

export default User
