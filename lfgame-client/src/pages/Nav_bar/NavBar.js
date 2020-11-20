import './NavBar.scss';

const NavBar = (props) => {

  const userName = 'XSlayerX';
  const logo = "I'm a logo";

  return (
    <nav>
      <div> {logo} </div>
      {/* If the user is connected, display his name */}
      <div> {userName} </div>
    </nav>
  )
}

export default NavBar;