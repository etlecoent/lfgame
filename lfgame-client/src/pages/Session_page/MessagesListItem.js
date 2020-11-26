// import "./MessagesListItem.scss";
import Card from "react-bootstrap/Card";

const MessagesListItem = (props) => {
  const checkForSystem = () => {
    if (props.message.username !== 'System') {
      return <p> {props.message.username} says: {props.message.content} </p>
    } else {
      return <p> {props.message.content} </p>
    }
  }
  
  return(
    
      <article>
        <header>
          {props.message.username}:
        </header>
        <p>
          {props.message.content}
        </p>
      </article>
    
  )
}

export default MessagesListItem;