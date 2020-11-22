import { useState } from "react";
import axios from 'axios';
import { isEmail } from 'validator';

import './RegisterPage.scss'

const RegisterPage = () => {
  const API_URL = "/api/users/register"

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = (username, email, password) => {
    return axios
      .post(API_URL, {
        username,
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  const validate = () => {
    if (!username) {
      setMessage("Username cannot be blank");
      return;
    } else if (!email) {
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
      register(username, email, password)
      .then(res => console.log(res))
      // .then(grab user info, store in somewhere, I don't know where, token? We haven't even figured out authentication yet.)
      // .then(redirect to games)
      .catch(err => setMessage("Email already exists, please use a different one!"));
    }
  }

  return(
    <div>
      <header>Register</header>
      {message && <div>{message}</div>}
      <form onSubmit={event => event.preventDefault}>
        <div>
          <input type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
        </div>
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

export default RegisterPage;