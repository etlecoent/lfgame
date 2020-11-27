import { Link, Redirect } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./MenuBar.scss";


const MenuBar = (props) => {

  return (
    <Dropdown className="menuBar">
      
    {props.currentUser && 
      <DropdownButton
        key={"up"}
        id={"dropdown-button-drop-up"}
        drop={"up"}
        title={"Menu"}
      >
      <Dropdown.Item className="menuItem" href="/games" >Games</Dropdown.Item>
      <Dropdown.Item className="menuItem" href="/profile" >Profile</Dropdown.Item>
      <Dropdown.Item className="menuItem" onClick={props.logout}>Logout</Dropdown.Item>
      </DropdownButton>
    }
  </Dropdown>
  )
}

export default MenuBar;