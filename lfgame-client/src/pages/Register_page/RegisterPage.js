import { useState } from "react";
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './RegisterPage.scss'

const RegisterPage = () => {
  const API_URL = "/api/users/register"

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   
  const register = (username, email, password) => {
    console.log("Jason rulez")
    return axios
      .post(API_URL, {
        username,
        email,
        password
      })
      .then(response => {
        console.log("Jason sux")
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  return(
    <div>
      <header>Register</header>
      <form onSubmit={event => event.preventDefault}>

        <Form.Group controlId="formBasicUsername">
          <Form.Control type="username" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" onSubmit={() => register(username, email, password)}>
          Submit
        </Button>

      </form>
    </div>
  );
};

export default RegisterPage;