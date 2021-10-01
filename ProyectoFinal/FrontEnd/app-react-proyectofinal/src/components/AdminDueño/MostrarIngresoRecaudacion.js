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

const MostrarIngresosRecaudacion = () => {

    //Redireccion de la Pagina:
    let history = useHistory();

    const [datos, setDatos] = useState(0)


    useEffect(() => {

        //Se ejecuta el metodo obtener One al cargar la pagina
        getDatos();
       

    }, [])


    const getDatos = async () =>{

        let response = await JSON.parse(localStorage.getItem("recaudacion"));

        console.log(response)

        await setDatos(response);


    }

    const enviarExcel = async (e) => {

        let fechaInicio = JSON.parse(localStorage.getItem("fechaInicio"));
        let fechaFin = JSON.parse(localStorage.getItem("fechaFin"));

        console.log("FECHA INICIO => ", fechaInicio)
        console.log("FECHA FIN => ", fechaFin)

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxDuenoServlet", {

                params: {

                    action:'recaudacionMail',
                    email: "federicosabatini@gmail.com", //Ingresa el mail inventado del usuario dueño, colocar uno real para testear
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                    recaudacion: datos,
                    

                }
            })

            const resJson = await response.data;

            console.log("RESPUESTA MAIL EXCEL =>", resJson)

            alert("ARCHIVO EXPORTADO CON EXITO AL MAIL.");

            await history.push("/adminDueño")

            //localStorage.setItem("fechaInicio", JSON.stringify(""))
            //localStorage.setItem("fechaFin", JSON.stringify(""))

        }catch(error){

            console.log(error)

        }    


    }


    return (
  
        <Fragment>
    
            
            <Container>
            <br></br>
            <br></br>
    
            <Alert variant="success" className="body">
    
               
                <Alert.Heading className="titulo">INGRESOS-RECAUDACION</Alert.Heading>
                <br></br>
                <br></br>

                <Table className="tabla" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Recaudacion</th>
                
                        </tr>
                    </thead>

                    <tbody>

                        <tr>

                            <td>$ {datos}</td>
                            
                           
                        </tr>   
                    </tbody>
                    
                </Table>

                <Row>

                        <Col ClassName='boton'>
                            <br></br>
                            <br></br>
                            <Button type="button" onClick={(e) => enviarExcel(e)} className="btn btn-primary">EXPORTAR EXCEL</Button>&nbsp;&nbsp;
                            <Button type="button" href={`/ingresosRecaudacion`} className="btn btn-danger">RETURN</Button>

                        </Col>

                </Row>

                </Alert>

                <br></br>


                </Container>    
        </Fragment>
    )

}


export default MostrarIngresosRecaudacion;