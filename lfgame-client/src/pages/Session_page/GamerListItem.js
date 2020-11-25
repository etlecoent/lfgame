import "./GamerListItem.scss";

const GamerListItem = (props) => {
  
  return(
    <li className="gamerListItem">
      {/* <div> image for later 
        <img className="userImage" src={props.imageSource}></img>
      </div> */}
      {props.username}
    </li>
  )
}

export default GamerListItem;