import GamerListItem from "./GamerListItem";

import "./GamerList.scss";

const GamerList = (props) => {

  return (
    
    <section className="gamerList">
      <h1>Users</h1>
    
      <ul>
        {props.users.map((user, i) => ( 
        
          <GamerListItem 
            key={i} 
            username={user.username}
          /> 
        ))}
      </ul>
    </section>
  )
};

export default GamerList;