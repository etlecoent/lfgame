
import axios from 'axios';
import { useState, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import { isEmail } from 'validator';

import './UpdatePage.scss';

const UpdatePage = (props) => {

  const {currentUser, setToken} = props;
  const [avatar, setAvatar] = useState(currentUser.image);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [steamID, setSteamID] = useState(currentUser.steam_id || null);
  const [message, setMessage] = useState("");
  let history = useHistory();

  const update = (avatar, username, email) => {
    return axios.post(`/api/users/${currentUser.username}`, {
      avatar,
      username,
      email,
      steamID
    }, { headers: {"Authorization" : props.token} })
    .then(res => {
      setToken(res.data.token)
      history.push("/profile")
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
    } else if (!avatar) {
      setMessage("Avatar cannot be blank");
      return;
    } else {
      setMessage("");
      update(avatar, username, email, steamID)
      .catch(err => setMessage("Sorry, a user account with this email or username already exists"));
    }
  }

  return (
    <Fragment>
    
      <section className="page">
        <div className="update-page">
          <header className="update-header">Update Profile</header>
  
          {message && <div className="alert alert-danger">{message}</div>}
  
          <div className="update-avatar">
            <img className="avatar" alt="User Avatar" src={currentUser.image}/>
            <div className="update-avatar-text">
              <label className="update-user-header">Update Avatar URL:</label>
              <input type="text" placeholder="Enter new username" value={avatar} onChange={event => setAvatar(event.target.value)}/>
            </div>
          </div>
          <div className="user-info">
            <form className="form">
            <div className="form-group">
              <label className="update-user-header">Update Username:</label>
              <input className="update-user-info" type="text" placeholder="Enter new username" value={username} onChange={event => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
              <label className="update-user-header">Update Email Address:</label>
              <input className="update-user-info" type="text" placeholder="Enter new Email Address" value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="form-group">
              <label className="update-user-header">Update Steam ID:</label>
              <input className="update-user-info" type="text" placeholder="Enter Steam ID" value={steamID} onChange={event => setSteamID(event.target.value)}/>
            </div>
            <div className="update-button">                
              <button type="button" onClick={validate} className="btn btn-primary">Update</button>
            </div>
            </form>
          </div>
        </div>
      </section>
    
    </Fragment>


  )

}

export default UpdatePage;
