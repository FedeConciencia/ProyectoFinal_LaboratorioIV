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


const Ganancias = () => {


    let ganancia = 0;

    let history = useHistory();


    const {register, formState: { errors }, handleSubmit} = useForm()


    const [datos, setDatos] = useState({

            fechaInicio:'',
            fechaFin:'',
            
    })


    useEffect(() => {



    }, [])


    const handleInputChange = (event) => {

        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })

    }

  
    const enviarDatos = async (datos, event) => {

            
            await getDatos(datos)

            event.target.reset()

            localStorage.setItem("fechaInicio", JSON.stringify(datos.fechaInicio))
            localStorage.setItem("fechaFin", JSON.stringify(datos.fechaFin))

            await history.push("/mostrarGanancias")

            
    }


    const getDatos = async (datos) => {

        console.log("FECHA INICIO => ", datos.fechaInicio)
        console.log("FECHA FIN => ", datos.fechaFin)

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxDuenoServlet", {
                params: {

                    action:'ganancias',
                    dateInicio: datos.fechaInicio, 
                    dateFin: datos.fechaFin, 
            
                }
            })

            const resJson = await response.data;
            
            console.log("GANANCIAS => ", resJson)

            ganancia = resJson;

            localStorage.setItem("ganancia", JSON.stringify(ganancia));
        
        }catch(error){

            console.log("Error => " + error)

        }


    }

  

  return (
  
    <Fragment>

        
        <Container>
        <br></br>
        <br></br>

        <Alert variant="success" className="body">

           

            <Alert.Heading className="titulo">SOLICITUD DE GANANCIAS</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

                <Row>

                        <Col className="col-md-3">
                            <br></br>
                            <label>Fecha de Inicio: </label>

                        
                        </Col>

                        <Col>
                            <br></br>
                            <input 
                                type="date"
                                name="fechaInicio"
                                onChange={handleInputChange}
                                placeholder="Ingrese la Fecha de Alta 2020-11-05"
                                className="form-control"
                                {...register("fechaInicio", { 

                                    required:{
                                        value: true,
                                        message: 'Campo Obligatorio' 
                                    },

                                })}      
                            >
                            </input>
                        
                        
                        </Col>

                        <Col className="col-md-3">

                                <br></br>
                                <span className="text-danger text-small d-block mb-2">
                                {errors.fechaInicio && errors.fechaInicio.message}
                                </span>

                        </Col>



                </Row>

                <Row>

                        <Col className="col-md-3">
                            <br></br>
                            <label>Fecha de Fin: </label>

                        
                        </Col>

                        <Col>
                            <br></br>
                            <input 
                                type="date"
                                name="fechaFin"
                                onChange={handleInputChange}
                                placeholder="Ingrese la Fecha de Alta 2020-11-05"
                                className="form-control"
                                {...register("fechaFin", { 

                                    required:{
                                        value: true,
                                        message: 'Campo Obligatorio' 
                                    },

                                })}      
                            >
                            </input>
                        
                        
                        </Col>

                        <Col className="col-md-3">

                                <br></br>
                                <span className="text-danger text-small d-block mb-2">
                                {errors.fechaFin && errors.fechaFin.message}
                                </span>

                        </Col>



                </Row>

                <Row>

                        <Col ClassName='boton'>
                            <br></br>
                            <br></br>
                            <Button type="submit" className="btn btn-primary">OBTENER GANANCIA</Button>&nbsp;&nbsp;
                            <Button type="button" href={`/adminDueño`} className="btn btn-danger">RETURN</Button>

                        </Col>

                </Row>

            </Form>

    
            </Alert>

            <br></br>


        </Container>

    </Fragment>
  );

};

export default Ganancias;
