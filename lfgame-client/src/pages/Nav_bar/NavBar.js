import { Link } from 'react-router-dom';

import logo from  "./../../styles/logo.png";
import './NavBar.scss';


const NavBar = (props) => {

  return (
    <nav className="topNav">
      <div> 
        <Link to="/">
        <img className="logo" alt= "logo" src={logo}/>  
        </Link> 
      </div>
      
      <div className="username"> 
        <Link to="/profile" >
          {props.currentUser && props.currentUser.username}
        </Link>
      </div>

      <div>
        <Link to="/login" >
          {props.currentUser ? 
            <p onClick={props.logout}>
              Logout
            </p>          
          : null}
        </Link>
      </div>

    </nav>
  )
}

export default NavBar;