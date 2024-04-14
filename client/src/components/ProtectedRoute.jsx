import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
    const location = useLocation();
    const receivedData = location.state;
    let login = receivedData;
    if (login) {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }
}

export default ProtectedRoute
