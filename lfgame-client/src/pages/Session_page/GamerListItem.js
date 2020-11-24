import "./GamerListItem.scss";

const GamerListItem = (props) => {
  
  return(
    <li className="gamerListItem">
      {/* <div> image for later 
        <img className="userImage" src={props.imageSource}></img>
      </div> */}
      <div className="gamerListName">
        {props.username}
      </div>
    </li>
  )
}

export default GamerListItem;