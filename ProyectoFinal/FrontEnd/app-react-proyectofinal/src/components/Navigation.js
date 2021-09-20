import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { GoogleLogout } from 'react-google-login';
import './../assets/css/navigation.css';
import { ContextoUsuario } from "./ContextoUsuario";

export default function Navigation() {

  // Hook con el estado actual
  const {usuario, setUsuario} = useContext(ContextoUsuario);
  
  const history = useHistory();

  function VerificarRolUsuario() {

    if(usuario !== null && usuario !== undefined) {

      if(usuario["rol"] === "administrador"){
        
          return <Nav.Link href="/adminPrincipal">ADMINISTRADOR</Nav.Link>;
        
      }else if(usuario["rol"] === "cliente"){

        return <><Nav.Link href="/productos">PRODUCTOS</Nav.Link>
                <Nav.Link href="/contacto">CONTACTO</Nav.Link>
                <Nav.Link href="/carrito">CARRITO</Nav.Link></>;

      }else if(usuario["rol"] === "cocinero"){

        return <Nav.Link href="/cocineroPrincipal">PRINCIPAL</Nav.Link>;

      }else if(usuario["rol"] === "cajero"){

        return <Nav.Link href="/cajeroPrincipal">PRINCIPAL</Nav.Link>;
      }  

      
    }else{

      return <><Nav.Link href="/productos">PRODUCTOS</Nav.Link>
                <Nav.Link href="/contacto">CONTACTO</Nav.Link></>;

    }

   
  }

  //Metodo para desloquearte de API google:
  const logout = (response) => {
    alert(response);
    setUsuario(null);
    localStorage.setItem('usuario', null);
    history.push("/");
  }

  return (
    <Fragment>
      <Navbar bg="primary" variant="dark" className="navbar-parent">
        <Navbar.Brand href="/">INICIO</Navbar.Brand>
        <Nav className="mr-auto">
          <VerificarRolUsuario />
          
          <Form inline className="search-box">
            <FormControl type="text" placeholder="Search" className="mr-sm-2 box" />
            <Button variant="outline-light">BUSCAR</Button>
          </Form>
          {console.log(usuario)}
          { usuario === null
          ? <Nav.Link href="/loguin" className="log-btn">LOGIN</Nav.Link>
          :
          <GoogleLogout
          clientId="190721094702-63klckib64q045jnncsicra1m0t498ui.apps.googleusercontent.com"
          onLogoutSuccess={logout}
          render={renderProps => (
            <Button onClick={() => {
                      renderProps.onClick();
                    }} 
                    disabled={renderProps.disabled} 
                    variant="warning"
                    size="mg"
                    className="log-btn"
                    >LOGOUT
            </Button>
          )}/>
          }
        </Nav>
      </Navbar>
    </Fragment>
  );
  
}
