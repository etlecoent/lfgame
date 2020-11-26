import "./MessagesListItem.scss";

const MessagesListItem = (props) => {
  const checkForCurrentUser = () => {
    if (props.currentUser === props.message.username) {
      return "currentUser"
    } else {
      return "otherUser"
    }
  }
  
  return(
    
      <article className={checkForCurrentUser()}>
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