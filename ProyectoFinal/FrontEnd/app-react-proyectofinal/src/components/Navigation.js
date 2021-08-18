import React, { Component, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { GoogleLogout } from 'react-google-login';

class Navigation extends Component {

  

  render() {

    //Metodo para desloquearte de API google:
    const logout = (response) => {
      alert(response);
    }

    return (
      <Fragment>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">INICIO</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">HOME</Nav.Link>
            <Nav.Link href="/contacto">CONTACTO</Nav.Link>
            <Nav.Link href="/adminPrincipal">ADMINISTRADOR</Nav.Link>
            <Nav.Link href="/loguin">LOGUIN</Nav.Link>
            <GoogleLogout
            clientId="190721094702-ifpj8nj34rqig6799jeqjrjolpanmssa.apps.googleusercontent.com"
            onLogoutSuccess={logout}
            render={renderProps => (
              <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="warning"  size="mg">LOGOUT</Button>
            )}
            
          >
          </GoogleLogout>
          
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
