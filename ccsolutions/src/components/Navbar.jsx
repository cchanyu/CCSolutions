import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const Navbar = () => {

    // check if user is logged in
    const [ isAuth, setIsAuth ] = useState(localStorage.getItem('isAuth'));

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);

            // useNavigate('/') only works inside of BrowserRouter
            // but since we're outside of it, we need to use window.location
            window.location.pathname = 'CCSolutions/home';
        })
    }

    return (
        <div className='d-flex navbar bg-dark text-light text-center justify-content-between'>
            <div className='mx-3 h4'>Chanyu's Solutions</div>
            <nav className='navbar justify-content-center p-3 navbar-light text-center py-4'>
                <Link to='/CCSolutions/home' className='nav-link text-white mx-2'>Home</Link>
                {!isAuth ? <Link to='CCSolutions/login' className='nav-link text-white mx-2'>Login</Link> : 
                (<>
                    <Link to='CCSolutions/create' className='nav-link text-white mx-3'>Create</Link>
                    <button className='btn btn-primary' onClick={signUserOut}>Log out</button>
                </>)}
            </nav>
        </div>
    )
}

export default Navbar