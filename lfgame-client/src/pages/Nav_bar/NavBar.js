import { Link } from 'react-router-dom';

import './NavBar.scss';

const NavBar = (props) => {

  const userName = 'XSlayerX';
  const logo = "Lfga.me";

  return (
    <nav>
      <div> 
        <Link to="/">
          {logo} 
        </Link> 
      </div>
      {/* If the user is connected, display his name */}
      <div> 
        <Link to="/profile">
          {userName}
        </Link>
      </div>
    </nav>
  )
}

export default NavBar;