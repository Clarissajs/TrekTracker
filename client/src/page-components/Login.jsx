import React from 'react';
import GoogleButton from 'react-google-button';
import fbStyles from '../styles.css';

const Home = (props) => {
  return(
    <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
  )
}

// <GoogleButton className='loginBtn' onClick={() => {window.location.href = '/auth/facebook'}} />

export default Home;
