import MessagesListItem from "./MessagesListItem";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./MessagesList.scss";

const MessagesList = (props) => {

  const { messages } = props;

  return (

    <Accordion className="chat" defaultActiveKey="1">
      <Card>
        <Accordion.Toggle className="chatButton" as={Card.Header} eventKey="0">
          Chat
        </Accordion.Toggle>
        <Accordion.Collapse className="collapse" eventKey="0">
          <div>
            <div className="scrollable" id="scrollable">
            <Card.Body className="chatWindow">
              {messages.map((message, i) => (
                <MessagesListItem key={i} message={message} currentUser={props.currentUser}/>
              ))}
            </Card.Body>
            </div>
            <Card.Footer className="textBox">
              <form onSubmit={event => event.preventDefault()}>
                <div>
                  <textarea
                    onSubmit={props.sendMessage} 
                    type="text" placeholder="Enter message" 
                    value={props.msg} 
                    onChange={props.onChange} 
                  />
                </div>
                <Button onClick={props.sendMessage}>
                  Send Message
                </Button>
              </form>
            </Card.Footer>
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion> 

  )
}


export default MessagesList;