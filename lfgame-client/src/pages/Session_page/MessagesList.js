import MessagesListItem from "./MessagesListItem";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

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
                <MessagesListItem key={i} message={message} />
              ))}
            </Card.Body>
            </div>
            <Card.Footer className="textBox">
              <form onSubmit={event => event.preventDefault()}>
                <div>
                  <input onSubmit={props.sendMessage} type="text" placeholder="Enter message" value={props.msg} onChange={props.onChange} />
                </div>
                <button onClick={props.sendMessage}>
                  Send Message
                </button>
              </form>
            </Card.Footer>
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion> 

  )
}


export default MessagesList;

{/* <Accordion defaultActiveKey="0">
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Click me!
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion> 
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> for usernames?, No I think I will just fix it in css, so have like name above message or something
*/}