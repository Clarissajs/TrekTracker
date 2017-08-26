import React from 'react';
//import GoogleButton from 'react-google-button';
import '../styles.css';

const Home = (props) => {
  return(
    <div>
    <button className="loginBtn loginBtn--facebook" onClick={() => {window.location.href = '/auth/facebook'}}>
      Login with Facebook</button>
    <button className="loginBtn loginBtn--google" onClick={() => {window.location.href = '/auth/google'}}>Login with Google
    </button>
    </div>
  )
}

export default Home;
