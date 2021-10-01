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

const MostrarGanancias = () => {

    //Redireccion de la Pagina:
    let history = useHistory();

    const [datos, setDatos] = useState(0)


    useEffect(() => {

        //Se ejecuta el metodo obtener One al cargar la pagina
        getDatos();
       

    }, [])

    //Ejecuto con un Metodo Asyn-Await dentro del UseEffect =>
    const getDatos = async () =>{

        let response = await JSON.parse(localStorage.getItem("ganancia"));

        console.log(response)

        await setDatos(response);


    }

    const enviarExcel = async (e) => {

        let fechaInicio = JSON.parse(localStorage.getItem("fechaInicio")); //Importante pasarlo como JSON.parse (si no deja las "" dentro del String)
        let fechaFin = JSON.parse(localStorage.getItem("fechaFin"));

        console.log("FECHA INICIO => ", fechaInicio)
        console.log("FECHA FIN => ", fechaFin)

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxDuenoServlet", {

                params: {


                    action:'gananciasMail',
                    email: "federicosabatini@gmail.com", //Ingresa el mail inventado del usuario dueño, colocar uno real para testear
                    dateInicio: fechaInicio, //Importante no colocar el mismo nombre entre variable y valor que se pasa GENERA CONFLICTO
                    dateFin: fechaFin,
                    ganancias: datos,
                    
                    

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
    
               
                <Alert.Heading className="titulo">GANANCIAS</Alert.Heading>
                <br></br>
                <br></br>

                <Table className="tabla" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Ganancias</th>
       
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
                            <Button type="button" href={`/ganancias`} className="btn btn-danger">RETURN</Button>

                        </Col>

                </Row>

                </Alert>

                <br></br>


                </Container>    
        </Fragment>
    )

}


export default MostrarGanancias;