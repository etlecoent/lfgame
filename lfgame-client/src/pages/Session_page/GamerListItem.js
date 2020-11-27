
const GamerListItem = (props) => {
  
  return(
    <div className="gamerListItem">
      <img src={props.avatar}/>
      <div className="gamerName">
        {props.username}
        </div>
    </div>
  )
}

export default GamerListItem;