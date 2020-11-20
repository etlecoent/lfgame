import NavBar from './pages/Nav_bar/NavBar';
import GamesPage from './pages/Games_page/GamesPage';
import './App.scss';
import useApplicationData from "./hooks/useApplication.js"

const App = () => {
  const {
      state,
      dispatch
  } = useApplicationData();
    const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
));
return (<div className="App" >
  <NavBar />
  <GamesPage />
  <h1> Users </h1>
  <ul> {userList} </ul>
</div >
);
};

export default App;
