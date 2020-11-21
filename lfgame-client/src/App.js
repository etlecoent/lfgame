import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './pages/Nav_bar/NavBar';
import GamesPage from './pages/Games_page/GamesPage';
import LoginPage from './pages/Login_page/LoginPage';
import RegisterPage from './pages/Register_page/RegisterPage';

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

  return (
    <div className="App" >
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <GamesPage />      
          </Route>

          <Route path ="/register">
            <h1>
              This is the register page
            </h1>
            <RegisterPage />
          </Route>
          
          <Route path ="/login">
            <h1>
              This is the login page
            </h1>
            <LoginPage />
          </Route>

          <Route path="/profile">
            <h1>
              This is the profile page
            </h1>
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
