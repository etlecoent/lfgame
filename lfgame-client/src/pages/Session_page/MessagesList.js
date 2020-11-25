import MessagesListItem from "./MessagesListItem";

import "./MessagesList.scss";

const MessagesList = (props) => {

  const { messages } = props;

  return (

    <ul>
        {messages.map((message, i) => (
          <MessagesListItem key={i} message={message} />
        ))}
    </ul>

  )
}


export default MessagesList;