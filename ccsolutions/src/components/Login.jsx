import React from 'react'
import { auth, provider} from '../firebase/firebase.config';
import { signInWithPopup } from "firebase/auth";
import "../css/Login.css";

const Login = ({setIsAuth}) => {

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);

      // setting the props to true
      setIsAuth(true);

      // redirect user to the homepage
      window.location.pathname = 'CCSolutions/home';
    })
  }

  return (
    <div className='container'>
      <div className='login-card card mt-5 text-center'>
        <div className="card-body">
          <p className='display-6 mt-3'>Select a login method:</p>
          <button className='btn btn-dark' onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      </div>
    </div>
  )
}

export default Login