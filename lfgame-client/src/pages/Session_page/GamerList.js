import GamerListItem from "./GamerListItem";

const GamerList = (props) => {

  return (
    <ul>
      {props.users.map((user, i) => ( 
      
        <GamerListItem 
          key={i} 
          username={user.username}
        /> 
      ))}
    </ul>
  )
};

export default GamerList;