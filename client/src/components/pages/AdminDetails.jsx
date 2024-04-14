import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDetails = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.8:8080/admin-data')
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='container-fluid'>
            <h4 className='text-center mt-4 text-danger'><u>Admin Login Details</u></h4>
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

                            <tr className='text-sm' key={_id}>
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
    )
}

export default AdminDetails
