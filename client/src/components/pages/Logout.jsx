import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Logout = ({ emaildata }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post('http://127.0.0.8:8080/logout', emaildata)
      .then((res) => {
        if (res.data.status === 200) {
          toast(res.data.message);
          setTimeout(() => {
            navigate('/');
          }, 2000)
        } else if (res.data.status === 404) {
          toast(res.data.message)
        }

      })
      .catch(err => console.log(err))
  }
  return (
    <div>
      <button className='btn btn-danger btn-sm px-3' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout