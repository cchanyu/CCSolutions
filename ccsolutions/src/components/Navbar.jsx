import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/searchActions';
import "../css/Navbar.css";

const Navbar = () => {

    // check if user is logged in
    const [ isAuth, setIsAuth ] = useState(localStorage.getItem('isAuth'));
    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.searchQuery);

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
        <div className='navbar-card d-flex navbar bg-dark text-light text-center justify-content-between'>
            <Link to='/CCSolutions/home' className='text-decoration-none mx-3 text-white h4'>Chanyu's Solutions</Link>
            <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => (dispatch(setSearchQuery(e.target.value)))} className='navbar-search' />
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