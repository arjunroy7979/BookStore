import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = (e) => {
        e.preventDefault();
        if (!user.email.trim()) {
            toast('Email is Required');
            return;
        }

        if (!user.password.trim()) {
            toast('Password is required');
            return;
        }
        axios.post('http://127.0.0.8:8080/login', user)
            .then((res) => {
                if (res.data.message === "Password didn't match") {
                    toast(res.data.message)
                }
                else if (res.data.user.role === 'admin' && res.data.user.email === user.email) {
                    toast(res.data.message);
                    setTimeout(() => {
                        navigate('/admin', { state: res.data.user.email });
                    }, 2000)

                } else if (res.data.user.role === 'user' && res.data.user.email === user.email) {
                    toast(res.data.message);
                    setTimeout(() => {
                        navigate('/user', { state: res.data.user });
                    }, 2000)

                } else {

                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };
    return (
        <>
            <div className="container-fluid">
                <div className="container mt-4">
                    <h1 className='text-center text-primary mb-3'>Login</h1>
                    <form className='border shadow p-4 mb-5'>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" name='email' id="email" value={user.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' id="password" value={user.password} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <button className='btn btn-primary w-100' onClick={login}>Login</button>
                        </div>
                        <div className="mb-3">
                            <p><Link to={'/register'}>Register</Link> here?</p>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Login;
