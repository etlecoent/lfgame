import {Modal} from "react-bootstrap/";

function DifficultyLevel(props) {
  
  const {show, onHide, animation } = props;

  return (
    <Modal
      {...{show, onHide, animation }}
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

        <div className="difficultyLevel" onClick={() => props.findSession("beginner")}>
          Beginner
        </div>

        <div className="difficultyLevel" onClick={() => props.findSession("intermediate")}>
          Intermediate
        </div>

        <div className="difficultyLevel" onClick={() => props.findSession("advanced")}>
          Advanced
        </div>

        <div className="difficultyLevel" onClick={() => props.findSession("competitive")}>
          Competitive
        </div>

      </Modal.Body>
    </Modal>
  );
}

export default DifficultyLevel;