import { Link } from 'react-router-dom';

import connect from  "./../../styles/connect.jpg";
import "./HomePage.scss";

const HomePage = (props) => {
  

  return (
    <section className="page">
      <div id="homePage">

        <header>Connect with gamers</header>
        
        <img id="connect" alt="connect" src={connect}/>
        
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