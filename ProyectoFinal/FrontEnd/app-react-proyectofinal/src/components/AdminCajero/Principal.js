import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import "../../assets/css/adminPrincipal.css";
import Alert from "react-bootstrap/Alert";

const Principal = () =>  {


    return (
      <Fragment>
        

        <Container>

        <br></br>
        <Alert variant="success" className="body">
            <br></br>

          <Row>

            <Col>
              <div className="super">
                <h3 className="titulo">ADMINISTRADOR PRINCIPAL CAJERO</h3>
              </div>
            </Col>

          </Row>

          <br></br>

          <Row>

            <Col>
                
            <Table striped bordered hover variant="dark">
                <thead>
                   

                  


                    <tr>

                        <th><Button href="/tablaIngreso" className="botones" variant="primary" size="lg">PEDIDOS INGRESOS</Button></th>
                        <th><Button href="/tablaEgreso" className="botones" variant="primary" size="lg">PEDIDOS EGRESOS</Button></th>

                    </tr>

                                      
                </thead>
  
            </Table>

            </Col>

         </Row>


        </Alert>
          
        </Container>
      </Fragment>
    );
  
}

export default Principal;
