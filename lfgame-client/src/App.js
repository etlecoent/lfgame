import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

import NavBar from './pages/Nav_bar/NavBar';
import MenuBar from './pages/Menu_bar/MenuBar';
import Loading from './pages/Loading/Loading';
import GamesPage from './pages/Games_page/GamesPage';
import LoginPage from './pages/Login_page/LoginPage';
import RegisterPage from './pages/Register_page/RegisterPage';
import SessionPage from './pages/Session_page/SessionPage';
import HomePage from './pages/Home_page/HomePage';
import ProfilePage from './pages/Profile_page/ProfilePage';
import UpdatePage from './pages/Update_page/UpdatePage';

import './App.scss';


const App = () => {
   

  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {

      if (token) {
        axios.get("/api/users", {
          headers: {"Authorization" : token}
        })
        .then((res) => {
          setCurrentUser(res.data);
          setLoading(false);
        })
      } else {
        setLoading(false);
      }

    }, 2000);

  }, [token]);


  const logout = () => {
    setCurrentUser(null);
    setCurrentSession(null);
    setToken(null);
    localStorage.removeItem("token");
  };
  
  const redirectHome = () => {
    if (!currentUser) {
      return <Redirect to="/" />;
    }
  }

  const redirectGames = () => {
    if (currentUser) {
      return <Redirect to="/games" />;
    }
  }

  const checkForSession = () => {
    if (!currentUser) {
      return redirectHome();
    } else if (currentUser && !currentSession) {
      return <Redirect to="/games" />;
    }
  }

  return (
    <div id="App" >
      <Router>
        <NavBar currentUser={currentUser} logout={() => logout()}/>
          { loading ? 
            <Loading /> :
            <Switch>
              
              <Route exact path="/">
                {redirectGames() || <HomePage/> }
              </Route>

              <Route exact path ="/register">
                {redirectGames() || <RegisterPage setToken={setToken}/>}
              </Route>
            
              <Route exact path ="/login">
                {redirectGames() || <LoginPage setToken={setToken}/>}
              </Route>
              
              <Route exact path="/games">
                { redirectHome() || <GamesPage token={token} currentUser={currentUser} setCurrentSession={setCurrentSession}/> }
              </Route>

              <Route exact path="/sessions">
              { checkForSession() || <SessionPage token={token} currentSession={currentSession} setCurrentSession={setCurrentSession} currentUser={currentUser}/>}
              </Route>

              <Route exact path="/profile">
                {redirectHome() || <ProfilePage token={token} currentUser={currentUser} />}
              </Route>

              <Route exact path="/update">
                {redirectHome() || <UpdatePage token={token} currentUser={currentUser} setToken={setToken}/>}
              </Route>
              
              <Route path="*">
                <h1 className="notFound">404 - Not Found</h1>
              </Route>

            </Switch>
          }
        <MenuBar currentUser={currentUser} logout={() => logout()}/>
      </Router>
    </div>
  );
};

export default App;
