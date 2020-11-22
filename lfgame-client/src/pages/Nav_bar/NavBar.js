import { Link } from 'react-router-dom';

import './NavBar.scss';

const NavBar = (props) => {

  const logo = "https://i.pinimg.com/originals/16/1c/ff/161cff19e668e270ccb1b98856ebd81e.png";


  return (
    <nav>
      <div> 
        <Link to="/">
        <img className="logo" src={logo}/>  
        </Link> 
      </div>
      {/* If the user is connected, display his name */}
      <div className="username"> 
        <Link to="/profile" />
          {props.currentUser ? props.currentUser.username : null}

          {props.currentUser ? 
            
          <Link to="/login">
            <button onClick={props.logout}>
              Logout
            </button>
          </Link>
          
          : null}

      </div>
    </nav>
  )
}

export default NavBar;