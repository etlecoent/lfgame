
import axios from 'axios';
import { useState, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { isEmail } from 'validator';

import './UpdatePage.scss';

const UpdatePage = (props) => {

  const {currentUser, setCurrentUser, setCurrentProfile} = props;
  const [avatar, setAvatar] = useState(currentUser.image);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  const update = (avatar, username, email) => {

    return axios.post(`/api/users/${currentUser.username}`, {
      id: currentUser.id,
      avatar,
      username,
      email
    })
    .then(res => {
      setCurrentProfile({})
      localStorage.setItem("user", JSON.stringify(res.data));
      setCurrentUser(res.data)
      setRedirect(true);
    });
  }

  const redirectProfile = () => {
    if (redirect) {
      return <Redirect to='/profile'/>
    }
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
    } else if (!avatar) {
      setMessage("Avatar cannot be blank");
      return;
    } else {
      setMessage("");
      update(avatar, username, email)
      .catch(err => setMessage("Error! We could not update your profile! Please try again later!"));
    }
  }

  return (
    <Fragment>
    {redirectProfile() || 
      <section className="page">
        <div className="update-page">
          <header className="update-header">Update Profile</header>
  
          {message && <div className="alert alert-danger">{message}</div>}
  
          <div className="update-avatar">
            <img className="avatar" alt="User Avatar" src={currentUser.image}/>
            <div className="update-avatar-text">
              <label className="update-user-header">Update Avatar:</label>
              <input type="text" placeholder="Enter new username" value={avatar} onChange={event => setAvatar(event.target.value)}/>
            </div>
          </div>
          <div className="user-info">
            <form>
            <div className="form-group">
              <label className="update-user-header">Update Username:</label>
              <input type="text" placeholder="Enter new username" value={username} onChange={event => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
              <label className="update-user-header">Update Email Address:</label>
              <input type="text" placeholder="Enter new Email Address" value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={validate}>Update Profile</button>
            </form>
          </div>
        </div>
      </section>
    }
    </Fragment>


  )

}

export default UpdatePage;
