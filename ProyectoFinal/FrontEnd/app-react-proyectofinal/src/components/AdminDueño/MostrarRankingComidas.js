import React, { useState, Fragment, useEffect } from "react";
import Navigation from "../Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import moment from 'moment';
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router-dom';

const MostrarRankingComidas = () => {

    //Redireccion de la Pagina:
    let history = useHistory();

    const [datos, setDatos] = useState([])


    useEffect(() => {

        //Se ejecuta el metodo obtener One al cargar la pagina
        getDatos();
       

    }, [])


    const getDatos = async () =>{

        let response = await JSON.parse(localStorage.getItem("rankingComidas"));

        console.log(response)

        await setDatos(response);


    }


    return (
  
        <Fragment>
    
            
            <Container>
            <br></br>
            <br></br>
    
            <Alert variant="success" className="body">
    
               
                <Alert.Heading className="titulo">RANKING DE COMIDAS MAS PEDIDAS</Alert.Heading>
                <br></br>
                <br></br>

                <Table className="tabla" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Ranking Posicion</th>
                            <th>Producto</th>
                            <th>Cantidad de Ventas</th>
             
                        </tr>
                    </thead>

                    <tbody>

                        {
       
                        datos.map((producto, i)=> (

                        
                        <tr key={i}>

                            <td>{i + 1}</td>
                            <td>{producto.denominacionComidad}</td>
                            <td>{producto.cantidadComida}</td>
                           
                        </tr>

                        ))

                       

                        }

                            
                    </tbody>
                    
                </Table>

                <Row>

                        <Col ClassName='boton'>
                            <br></br>
                            <br></br>
                            <Button type="button" className="btn btn-primary">EXPORTAR EXCEL</Button>&nbsp;&nbsp;
                            <Button type="button" href={`/rankingComidas`} className="btn btn-danger">RETURN</Button>

                        </Col>

                </Row>

                </Alert>

                <br></br>


                </Container>    
        </Fragment>
    )

}


export default MostrarRankingComidas;