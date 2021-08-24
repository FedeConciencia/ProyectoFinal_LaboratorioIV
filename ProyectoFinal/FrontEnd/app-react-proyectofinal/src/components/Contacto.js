import React, { Component, Fragment } from "react";
import Navigation from "./Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assets/css/contacto.css";
import Alert from "react-bootstrap/Alert";

class Contacto extends Component {
  render() {
    return (
      <Fragment>
        
        <Container>

        <br></br>
        <Alert variant="success">
            <br></br>
          <Row>
            <Col>
              <div className="super">
                <h3 className="titulo">CONTACTO</h3>
              </div>
            </Col>
          </Row>

          <br></br>

          <Row>
            <Col>
              <div className="super">
                <h4 className="dato">Telefono:&nbsp;</h4>
                <label className="info">(261)-4236271 , (261)-4235152 , (261)-6524212</label>
              </div>
            </Col>
          </Row>

          <br></br>

          <Row>
            <Col>
              <div className="super">
                <h4 className="dato">Email:&nbsp;</h4>
                <label className="info">comidasabrosa@gmail.com</label>
              </div>
            </Col>
          </Row>

          <br></br>

          <Row>
            <Col>
              <div className="super">
                <h4 className="dato">Direccion:&nbsp;</h4>
                <label className="info">25 de Mayo y Colon Ciudad de Mendoza</label>
              </div>
            </Col>
          </Row>

          <br></br>

       </Alert>   

          <br></br>
          

          <Row>

              <Col className="imagenFrame">

            
                <div className="imagenFrame">

                    <iframe className="iframe" title="myiframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.1741112955956!2d-68.85042238511005!3d-32.89356457653247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e090f8a9bd249%3A0xd9975cde8edd6c9a!2sAvenida%20Col%C3%B3n%20%26%2025%20de%20Mayo%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1623757691605!5m2!1ses!2sar" width="600px" height="450px"  allowfullscreen="" loading="lazy"></iframe>
                    
                </div>

              </Col>
            
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Contacto;
