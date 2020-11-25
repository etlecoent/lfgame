import { Link, Redirect } from "react-router-dom";
import DropDown from "react-bootstrap/DropDown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./MenuBar.scss";


const MenuBar = (props) => {

  return (
    <DropDown className="menuBar">
      {/* <DropDown.Toggle key={"up"} drop={"up"} id="dropdown-button-drop-up">Menu</DropDown.Toggle> */}
      {props.currentUser && 
      <DropdownButton
        key={"up"}
        id={"dropdown-button-drop-up"}
        drop={"up"}
        title={"Menu"}
      >
      {/* <DropDown.Menu className="menu"> */}
          <DropDown.Item class="menuItem" href="/profile" >Profile</DropDown.Item>
          {/* <Dropdown.Item href="/profile/edit">Edit Profile</Dropdown.Item> */}
          <DropDown.Item class="menuItem" onClick={props.logout}>Logout</DropDown.Item>
          {/* <Dropdown.Item href="/home">Home Page</Dropdown.Item> */}
      {/* </DropDown.Menu> */}
        
      </DropdownButton> }
  </DropDown>
  )
}

export default MenuBar;