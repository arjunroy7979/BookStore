import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Navbar = ({fullname,emaildata}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand mx-4" to="#">welcome: <span className='text-primary'>{fullname}</span></Link>
                <div className="navbar-nav ms-auto d-flex mx-2">
                    <div className='mt-1 mx-2'>
                        <Link to={'/user/cart'} className="fa fa-shopping-cart fa-lg" />
                    </div>
                    <Logout emaildata={emaildata} />
                </div>
            </nav >
        </div>
    )
}

export default Navbar
