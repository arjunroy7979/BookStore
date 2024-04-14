import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [user, setUser] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        cpassword: '',
        role: '',
    })

    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.8:8080/register', user)
            .then((res) => {
                if (res.data.status === 200) {
                    toast(res.data.message);
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                } else if (res.data.status === 201) {
                    toast(res.data.message)
                }
            })
            .catch(err => console.log(err))
    }
    // console.log(user)

    return (
        <>
            <div className="container-fluid">
                <div className="container mt-4">
                    <h1 className='text-center text-primary mb-3'>Registration</h1>
                    <form className='border shadow p-4 mb-5' onSubmit={register}>
                        <div className="d-flex gap-3">
                            <div className="mb-3 w-100">
                                <label for="fullname" className="form-label">Full Name</label>
                                <input type="text" className="form-control" name='fullname' id="fullname" onChange={e => setUser({ ...user, fullname: e.target.value })} />
                            </div>
                            <div className="mb-3 w-100">
                                <label for="username" className="form-label">User Name</label>
                                <input type="text" className="form-control" name='username' id="username" onChange={e => setUser({ ...user, username: e.target.value })} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" name='email' id="email" onChange={e => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="d-flex gap-3">
                            <div className="mb-3 w-100">
                                <label for="password" className="form-label">Password</label>
                                <input type="text" className="form-control" name='password' id="password" onChange={e => setUser({ ...user, password: e.target.value })} />
                            </div>
                            <div className="mb-3 w-100">
                                <label for="confirmpassword" className="form-label">Confirm Password</label>
                                <input type="text" className="form-control" name='cpassword' id="confirmpassword" onChange={e => setUser({ ...user, cpassword: e.target.value })} />
                            </div>
                        </div>
                        <div className="mb-3 w-100">
                            <label for="role" className="form-label">Role</label>
                            <select name="" id="" className='form-control' onChange={e => setUser({ ...user, role: e.target.value })}>
                                <option>select</option>
                                <option name="admin" value={"admin"} >Admin</option>
                                <option name="user" value={"user"}>User</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <button className='btn btn-primary w-100'>Registar</button>
                        </div>
                        <div className="mb-3">
                            <p><Link to={'/'}>Login</Link> here?</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register