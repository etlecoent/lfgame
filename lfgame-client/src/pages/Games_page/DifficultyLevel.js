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
        {"Difficulties in here"}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DifficultyLevel;