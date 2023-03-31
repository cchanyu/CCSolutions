import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Create from './components/Create';
import Login from './components/Login';
import Navbar from './components/Navbar';
import './App.css';

function App() {

    const [ isAuth, setIsAuth ] = useState(localStorage.getItem('isAuth'));

    return (
        <div className='App'>
            <Router>
                <Navbar />
                
                <div className='container mt-5'>
                    <Routes>
                        <Route path='/CCSolutions/home' element={<Home isAuth={isAuth} />} />
                        <Route path='/CCSolutions' element={<Home isAuth={isAuth} />} />
                        <Route path='/CCSolutions/create' element={<Create isAuth={isAuth} />} />
                        <Route path='/CCSolutions/login' element={<Login setIsAuth={setIsAuth} />} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default App;