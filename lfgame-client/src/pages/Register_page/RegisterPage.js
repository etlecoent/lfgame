import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isEmail } from 'validator';

import './RegisterPage.scss'

const RegisterPage = (props) => {
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
      .then(res => {
        if (res.data && res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          props.setCurrentUser(res.data);
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
    } else if (!username) {
      setMessage("Username cannot be blank");
      return;
    } else if (username.length > 20) {
      setMessage("Username must be less than 20 chars long");
      return;
    } else if (!password) {
      setMessage("Password cannot be blank");
      return;
    } else {
      setMessage("");
      register(username, email, password)
      .catch(err => setMessage("Email already exists, please use a different one!"));
    }
  }

  return(
    <section className="page">
      <div id="registerPage">

        <header>Register</header>

          {message && <div className="alert alert-danger">{message}</div>}
          <form onSubmit={event => event.preventDefault()}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputUsername">Username</label>
              <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" value={username} onChange={event => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={validate}>Submit</button>
          </form>
        
        <div className="loginButton">
          <Link to="/login">
            <button className ="btn btn-outline-primary">
              Log in
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;