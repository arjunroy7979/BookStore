import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useLocation } from 'react-router-dom';

const Admin = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const receivedData = location.state;
  const [emaildata, setemailData] = useState(
    {
      email: receivedData
    }
  )

  useEffect(() => {
    axios.get('http://127.0.0.8:8080/user-data')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>
      <div className="container-fluid mt-4">
        <h4 className='text-danger text-center'><u>Admin Panel Dashboard</u></h4>
        <div className="row">
          <div className="col-2 col-md-4 d-flex">
            <Logout emaildata={emaildata} />
            <Link to={'/admin/login-details'} className='btn btn-sm btn-outline-primary mx-1'>Admin Details</Link>
          </div>
          <div className=" col-10 col-md-8 d-flex justify-content-end">
            <div className="btn-group">
            <Link to={'/admin/product-listing'} className='btn btn-sm bg-warning mx-1'>Product Listing</Link>
            <Link to={'/admin/product-details'} className='btn btn-sm bg-success mx-1'>Product Details</Link>
            </div>
          </div>
        </div>
        <h6 className='text-primary mt-3 text-center'>User Login Details</h6>
        <table className="table table-bordered shadow border-primary mt-4">
          <thead>
            <tr className='text-sm'>
              <th scope="col">ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col">Login Time</th>
              <th scope="col">Logout Time</th>
            </tr>
          </thead>
          <tbody >
            {data && data.map((item) => {
              const { _id, fullname, username, email, loginTimes, logoutTime, loginDate } = item;
              return (
                <tr key={_id} className='text-sm'>
                  <td>{_id}</td>
                  <td>{fullname}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td className='m-0 p-0'>{loginDate.map((i) => <p className='border border-primary p-0 m-1'>{i}</p>)}</td>
                  <td className='m-0 p-0'>{loginTimes.map((i) => <p className='border border-primary p-0 m-1'>{i}</p>)}</td>
                  <td className='m-0 p-0'>{logoutTime.map((i) => <p className='border border-primary p-0 m-1'>{i}</p>)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
