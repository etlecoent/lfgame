import { Link } from 'react-router-dom';

import connect from  "./../../styles/connect.jpg";
import "./HomePage.scss";

const HomePage = (props) => {
  

  return (
    <section className="page">
      <div id="homePage">
        
        <h1 id="lfgame">Lfga.me</h1>

        <div id="connect">
          <header>Connect with gamers</header>
        </div>
        
        <div id="about">
          <p>
            A place where gamers can look for groups to play games with. Perfect for people who just bought a game but have no one to play it with.
          </p>
        </div> 
        <div className="buttons">

          <div className="registerButton">
            <Link to="/register">
              <button className="btn btn-outline-primary">
                Register Now
              </button>
            </Link>
          </div>

          <div className="loginButton">
            <Link to="/login">
              <button className ="btn btn-outline-primary">
                Log in
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HomePage;