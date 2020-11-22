import { useState } from "react";
import axios from 'axios';
import { isEmail } from 'validator';

import './LoginPage.scss'

const LoginPage = () => {
  const API_URL = "/api/users/login"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const login = (email, password) => {
    return axios
      .post(API_URL, {
        email,
        password
      })
      .then(response => {
        console.log(response)
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  
  const validate = () => {
    if (!email) {
      setMessage("Email cannot be blank");
      return;
    } else if (!isEmail(email)) {
      setMessage(`${email} is not a valid email`);
      return;
    } else if (!password) {
      setMessage("Password cannot be blank");
      return;
    } else {
      setMessage("");
      login(email, password)
      // .then(grab user info, store in somewhere, I don't know where, token? We haven't even figured out authentication yet.)
      // .then(redirect to games)
      .catch(err => setMessage("Invalid email or password, please try again!"));
    }
  }

  return(
    <div>
      <header>Login</header>
      {message && <div>{message}</div>}
      <form onSubmit={event => event.preventDefault}>
        <div>
          <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
        </div>
        <button type='button' onClick={validate}>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;