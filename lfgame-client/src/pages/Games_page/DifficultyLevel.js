import {Modal, Button} from "react-bootstrap/";

function DifficultyLevel(props) {
  

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose a difficulty
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div onClick={() => props.findSession("beginner")}>
          Beginner
        </div>
        <div onClick={() => props.findSession("intermediate")}>
          Intermediate
        </div>
        <div onClick={() => props.findSession("advanced")}>
          Advanced
        </div>
        <div onClick={() => props.findSession("competitive")}>
          Competitive
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DifficultyLevel;