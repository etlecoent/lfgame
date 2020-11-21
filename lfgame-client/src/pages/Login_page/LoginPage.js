import { useState } from "react";
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './LoginPage.scss'

const LoginPage = () => {
  const API_URL = "/api/users/login"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


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

  return(
    <div>
      <header>Login</header>
      <form onSubmit={event => event.preventDefault}>

        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" onSubmit={() => login(email, password)}>
          Submit
        </Button>

      </form>
    </div>
  );
};

export default LoginPage;