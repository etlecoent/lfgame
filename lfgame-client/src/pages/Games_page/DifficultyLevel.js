import {Modal} from "react-bootstrap/";
import { Link } from "react-router-dom";

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
        <Link to={"/sessions"} onClick={() => props.findSession("Beginner")}>
          <div className="difficultyLevel" onClick={() => props.findSession("Beginner")}>
            Beginner
          </div>
        </Link>

        <Link to={"/sessions"} onClick={() => props.findSession("Intermediate")}>
          <div className="difficultyLevel" onClick={() => props.findSession("Intermediate")}>
            Intermediate
          </div>
        </Link>
        <Link to={"/sessions"} onClick={() => props.findSession("Advanced")}>
          <div className="difficultyLevel" onClick={() => props.findSession("Advanced")}>
            Advanced
          </div>
        </Link>
        <Link to={"/sessions"} onClick={() => props.findSession("Competitive")}>
          <div className="difficultyLevel" onClick={() => props.findSession("Competitive")}>
            Competitive
          </div>
        </Link>

      </Modal.Body>
    </Modal>
  );
}

export default DifficultyLevel;