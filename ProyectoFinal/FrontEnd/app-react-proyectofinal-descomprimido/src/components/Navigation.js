import React, { Component, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

class Navigation extends Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">INICIO</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">HOME</Nav.Link>
            <Nav.Link href="/contacto">CONTACTO</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">BUSCAR</Button>
          </Form>
        </Navbar>
      </Fragment>
    );
  }
}

export default Navigation;
