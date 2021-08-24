import React, { Component, Fragment } from "react";
import Navigation from "./Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import "../assets/css/adminPrincipal.css";
import Alert from "react-bootstrap/Alert";

class AdminPrincipal extends Component {

  render() {

    return (
      <Fragment>
        

        <Container>

        <br></br>
        <Alert variant="success" className="body">
            <br></br>

          <Row>

            <Col>
              <div className="super">
                <h3 className="titulo">ADMINISTRADOR PRINCIPAL</h3>
              </div>
            </Col>

          </Row>

          <br></br>

          <Row>

            <Col>
                
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th><Button href="/adminCliente" className="botones" variant="primary"  size="lg" block>ADMIN.CLIENTE</Button></th>
                        <th><Button href="/adminDomicilio" className="botones" variant="primary" size="lg" block>ADMIN.DOMICILIO</Button></th>
                        
                    </tr>

                    <tr>

                        <th><Button href="/adminUsuario" className="botones" variant="primary" size="lg" block>ADMIN.USUARIO</Button></th>
                        <th><Button href="/adminPedido" className="botones" variant="primary" size="lg" block>ADMIN.PEDIDO</Button></th>

                    </tr>

                    <tr>

                        <th><Button href="/adminFactura" className="botones" variant="primary" size="lg">ADMIN.FACTURA</Button></th>
                        <th><Button href="/adminMercadoPago" className="botones" variant="primary" size="lg">ADMIN.MERCADOPAGO</Button></th>
                        

                    </tr>

                    <tr>

                        <th><Button href="/adminDetalleFactura" className="botones" variant="primary" size="lg">ADMIN.DETALLE_FACTURA</Button></th>
                        <th><Button href="/adminDetallePedido" className="botones" variant="primary" size="lg">ADMIN.DETALLE_PEDIDO</Button></th>

                    </tr>


                    <tr>

                        <th><Button href="/adminArtManufacturado" className="botones" variant="primary" size="lg">ADMIN.ART_MANUFACTURADO</Button></th>
                        <th><Button href="/adminArtManDetalle" className="botones" variant="primary" size="lg">ADMIN.ART_MANUF_DETALLE</Button></th>

                    </tr>


                    <tr>

                        <th><Button href="/adminRubroGeneral" className="botones" variant="primary" size="lg">ADMIN.RUBRO_GENERAL</Button></th>
                        <th><Button href="/adminRubroArticulo" className="botones" variant="primary" size="lg">ADMIN.RUBRO_ARTICULO</Button></th>

                    </tr>

                    <tr>

                        <th><Button href="/adminArtInsumo" className="botones" variant="primary" size="lg">ADMIN.ART_INSUMO</Button></th>
                        <th><Button href="/adminConfiguracion" className="botones" variant="primary" size="lg">ADMIN.CONFIGURACION</Button></th>

                    </tr>

                  
                </thead>
  
            </Table>

            </Col>

         </Row>

         <Row>

           <Col>
           
            <Button type="button" href={`/home`}  className="boton" variant="danger" size="lg">RETURN</Button> 
           
           </Col>

         </Row>

        </Alert>
          
        </Container>
      </Fragment>
    );
  }
}

export default AdminPrincipal;
