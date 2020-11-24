const { default: PrevSessionsList } = require("./PrevSessionsList");


const PrevSessionItem = (props) => {


  return (
    <div>
      <p>
        Game: {props.game}, 
        Session ID: {props.joinID}
      </p>
    </div>

  )

}

export default PrevSessionItem;