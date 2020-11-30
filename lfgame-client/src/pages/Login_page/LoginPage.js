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
        if (res.data && res.data) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          props.setToken(res.data.token);
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
      .catch(err => setMessage(err.response.data.error));
    }
  }

  return(
    <section className="page">
      <div className="login-container">
      <div id="loginPage">
        <header className="login-header">Login</header>
        
        {message && <div className="alert alert-danger">{message}</div>}
        
        <form className="form-container" onSubmit={event => event.preventDefault()}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
          </div>
          <button type="button" className="btn btn-primary" onClick={validate}>Submit</button>
        </form>

        <div className="registerButton">
          <Link to="/register">
            <button className="btn btn-outline-primary">
              Register Now
            </button>
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
};

export default LoginPage;