import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isEmail } from 'validator';

import './LoginPage.scss'

const LoginPage = (props) => {
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
      .then(res => {
        if (res.data && res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          props.setCurrentUser(res.data)
        }
        return res.data;
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
      .catch(err => setMessage("Invalid email or password, please try again!"));
    }
  }

  return(
    <section className="page">
      <header>Login</header>
      {message && <div>{message}</div>}
      <form onSubmit={event => event.preventDefault()}>
        <div>
          <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
        </div>
        <button type='button' onClick={validate}>Submit</button>
      </form>

      <div>
        <Link to="/register">
          <button>
            Register Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;