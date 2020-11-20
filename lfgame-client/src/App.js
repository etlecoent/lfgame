import './App.css';
import useApplicationData from "./hooks/useApplication.js"

const App = () => {
  const {
      state,
      dispatch
  } = useApplicationData();
    const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
));
return (<div className="App" >
  <h1> Users </h1>

  <ul> {userList} </ul>
</div >
);
};

export default App;
