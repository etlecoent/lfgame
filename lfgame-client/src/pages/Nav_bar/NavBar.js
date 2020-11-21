import './NavBar.scss';

const NavBar = (props) => {

  const userName = 'XSlayerX';
  const logo = "https://i.pinimg.com/originals/16/1c/ff/161cff19e668e270ccb1b98856ebd81e.png";

  return (
    <nav>
      <div> 
        <img className="logo" src={logo}/>  
      </div>
      {/* If the user is connected, display his name */}
      <div> {userName} </div>
    </nav>
  )
}

export default NavBar;