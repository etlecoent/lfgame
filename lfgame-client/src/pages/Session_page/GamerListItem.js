
const GamerListItem = (props) => {
  
  return(
    <li className="gamerListItem">
      <img src={props.avatar}/>
      <span>{props.username}</span>
    </li>
  )
}

export default GamerListItem;