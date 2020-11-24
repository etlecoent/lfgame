// import "./MessagesListItem.scss";

const MessagesListItem = (props) => {
  const checkForSystem = () => {
    if (props.message.username !== 'System') {
      return <p> {props.message.username} says: {props.message.content} </p>
    } else {
      return <p> {props.message.content} </p>
    }
  }
  
  return(
    <li>
      <article>
        <header>
          {props.message.username}
        </header>
        <p>
          {props.message.content}
        </p>
      </article>
    </li>
  )
}

export default MessagesListItem;