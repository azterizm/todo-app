import React, { useState } from 'react';
import { auth, googleProvider } from '../develop';
import { SignUp } from './SignUp';
import '../styles/Login.css';
import googleIcon from '../assets/Google-512.png';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState('');

  const loginWithEmailAndPassword = () => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => setError(err));
  };

  const loginWithGoogle = () => {
    auth.signInWithPopup(googleProvider);
  };

  if (showSignUp) {
    return (
      <div className="login">
        <SignUp />
        <button onClick={() => setShowSignUp((e) => !e)}>Go Back</button>
      </div>
    );
  } else {
    return (
      <div className="login">
        <h1>Login</h1>
        <div className="customLogin">
          <input
            type="email"
            name="loginInput"
            id="login"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="passwordInput"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <p style={{ color: 'red' }}>{error.message}</p> : ''}
          <button onClick={loginWithEmailAndPassword}>Sign In</button>
          <button onClick={() => setShowSignUp((e) => !e)}>Create an Account</button>
        </div>
        <div className="providerLogin">
          <button id="google" onClick={loginWithGoogle}>
            <img src={googleIcon} alt="" />
            <p>Sign In with Google</p>
          </button>
        </div>
      </div>
    );
  }
};
