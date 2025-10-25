import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faPlus, faList } from '@fortawesome/free-solid-svg-icons';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to={"/"} className="navbar-brand">
          <img src='/public/Car_logo.png' width={80}/>
        </Link>
        <Nav className="mr-auto">
          <Link to={"add"} className="nav-link">
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Ajouter Voiture
          </Link>
          <Link to={"list"} className="nav-link">
            <FontAwesomeIcon icon={faList} className="mr-1" />
            Liste Voiture
          </Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;