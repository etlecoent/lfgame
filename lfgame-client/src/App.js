import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState } from "react";

import NavBar from './pages/Nav_bar/NavBar';
import GamesPage from './pages/Games_page/GamesPage';
import LoginPage from './pages/Login_page/LoginPage';
import RegisterPage from './pages/Register_page/RegisterPage';
import SessionsPage from './pages/Session_page/SessionPage';

import './App.scss';

import useApplicationData from "./hooks/useApplication.js"

const App = () => {
  
  const {
    state,
    dispatch
  } = useApplicationData();
    
  const userList = state.users.map((user) => (
    <li key={user.id} > 
      {user.first_name} {user.last_name}  {user.email} 
    </li>
  ));
  
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };
  
  const redirectLogin = () => {
    if (!currentUser) {
      return <Redirect to="/login" />;
    }
  }

  const redirectGames = () => {
    if (currentUser) {
      return <Redirect to="/" />;
    }
  }

  return (
    <div className="App" >
      <Router>
        <NavBar currentUser={currentUser} logout={() => logout()}/>
        <Switch>

          <Route exact path="/">
            {redirectLogin() || <GamesPage /> }
          </Route>

          <Route path="/sessions">
            <SessionsPage />
          </Route>

          <Route path="/profile">
            {redirectLogin() || 
            
            <h1>
              This is the profile page
            </h1>
            }
          </Route>

          <Route path ="/register">
            {redirectGames() || <RegisterPage setCurrentUser={setCurrentUser}/>}
          </Route>
        
          <Route path ="/login">
            {redirectGames() || <LoginPage setCurrentUser={setCurrentUser}/>}         
          </Route>
          
          <Route path="*">
            <h1>404 - Not Found</h1>
          </Route>

        </Switch>
      </Router>
    </div>
  );
};

export default App;
