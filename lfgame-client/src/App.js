import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import NavBar from './pages/Nav_bar/NavBar';
import GamesPage from './pages/Games_page/GamesPage';
import LoginPage from './pages/Login_page/LoginPage';
import RegisterPage from './pages/Register_page/RegisterPage';
import SessionPage from './pages/Session_page/SessionPage';
import MenuBar from './pages/Menu_bar/MenuBar';
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
    if (token) {
      
      axios.get("/api/users", {
        headers: {"Authorization" : token}
      })
      .then((res) => {
        setCurrentUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
      });
    } else {
      setLoading(false);
    }
  }, [token]);


  const logout = () => {
    setCurrentUser(null);
    setCurrentSession(null);
    setToken(null);
    localStorage.removeItem("token");
  };
  
  const redirectHome = () => {
    if (!currentUser) {
      console.log("REDIRECT HOME")
      return <Redirect to="/" />;
    }
  }

  const redirectGames = () => {
    if (currentUser) {
      console.log("REDIRECT GAMES")
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
          { !loading &&
            <Switch>
              
              <Route exact path="/">
                <div>{redirectGames() || <HomePage/> }</div>
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
              {!currentSession ? checkForSession() : <SessionPage token={token} currentSession={currentSession} currentUser={currentUser}/>}
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
