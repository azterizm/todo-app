import React, { useState } from 'react';
import { auth } from '../develop';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveHandler = () => {
    auth.createUserWithEmailAndPassword(email, password);
  };

  return (
    <div className="signUp">
      <h1>Create an Account</h1>
      <input
        type="email"
        name="emailInput"
        id="email"
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
      <button onClick={saveHandler}>Submit</button>
    </div>
  );
};
