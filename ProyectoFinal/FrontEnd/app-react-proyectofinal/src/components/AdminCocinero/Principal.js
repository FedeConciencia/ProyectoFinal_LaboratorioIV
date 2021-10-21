import React, { Component, Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import "../../assets/css/adminPrincipal.css";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import ModalStock from './ModalStock.js'

const Principal = () =>  {


    let productos = new Array ();

    let datos = new Array ();

    const [modalStock, setModalStock] = useState(false);


    useEffect(() => {

      controlStock() 

    },[])


    const controlStock = async () => {

      try{

        const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet", {
            params: {
    
                action:'listar',
                
            
            }
        })

        const resJson = await response.data;

        datos = resJson;

        console.log("LISTA INSUMOS DATOS =>", datos)

        let validarStock = false;

        for(let i = 0; i < datos.length; i++){

            if(datos[i].stockActual <= datos[i].stockMinimo){

              validarStock = true;
              productos.push(datos[i].denominacion);

            }

        }

        console.log("LISTA PRODUCTOS =>", productos)

        console.log("VALIDAR STOCK =>", validarStock)


        const modal = () => {
            
          return (
            
          <ModalStock
              stock = { validarStock }
              productos = { productos }
          ></ModalStock>

          );
      }    
      
      setModalStock(modal);  



      }catch(error){

          console.log(error)

      }  


    }


    return (
      <Fragment>

        { modalStock }
        

        <Container>

        <br></br>
        <Alert variant="success" className="body">
            <br></br>

          <Row>

            <Col>
              <div className="super">
                <h3 className="titulo">ADMINISTRADOR PRINCIPAL COCINERO</h3>
              </div>
            </Col>

          </Row>

          <br></br>

          <Row>

            <Col>
                
            <Table striped bordered hover variant="dark">
                <thead>
                   

                  


                    <tr>

                        <th><Button href="/adminArtManufacturado" className="botones" variant="primary" size="lg">ADMIN.ART_MANUFACTURADO</Button></th>
                        <th><Button href="/adminArtManDetalle" className="botones" variant="primary" size="lg">ADMIN.ART_MANUF_DETALLE</Button></th>

                    </tr>

                    <tr>

                        <th><Button href="/adminArtInsumo" className="botones" variant="primary" size="lg">ADMIN.ART_INSUMO</Button></th>
                        <th><Button href="/confirmarPedido" className="botones" variant="primary" size="lg">CONFIRMAR PEDIDO TERMINADO</Button></th>
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
