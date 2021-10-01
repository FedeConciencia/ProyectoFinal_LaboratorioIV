import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import "../../assets/css/adminPrincipal.css";
import Alert from "react-bootstrap/Alert";

const AdminDueño = () =>  {


    return (

      <Fragment>

        <Container>

        <br></br>
        <Alert variant="success" className="body">
            <br></br>

          <Row>

            <Col>
              <div className="super">
                <h3 className="titulo">ADMINISTRADOR PRINCIPAL DUEÑO</h3>
              </div>
            </Col>

          </Row>

          <br></br>

          <Row>

            <Col>
                
            <Table striped bordered hover variant="dark">
                <thead>
                   

                    <tr>

                        <th><Button href="/rankingComidas" className="botones" variant="primary" size="lg">RANKING DE COMIDAS</Button></th>
                        <th><Button href="/ingresosrecaudacion" className="botones" variant="primary" size="lg">RECAUDACION</Button></th>

                    </tr>

                    <tr>

                        <th><Button href="/pedidosCliente" className="botones" variant="primary" size="lg">PEDIDOS POR CLIENTE</Button></th>
                        <th><Button href="/ganancias" className="botones" variant="primary" size="lg">GANANCIAS LOCAL</Button></th>
                    </tr>

                  
                </thead>
  
            </Table>

            </Col>

         </Row>


        </Alert>
          
        </Container>
      </Fragment>

    )

}

export default AdminDueño;
