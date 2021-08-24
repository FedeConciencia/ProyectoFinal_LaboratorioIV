import React, { useState, Fragment } from "react";
import Navigation from "../Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/registrar.css';
import moment from 'moment';


//React Hook:

const RegistrarConfiguracion = () => {

   //Usamos el useForm para la validacion del formulario:

   const {register, formState: { errors }, handleSubmit} = useForm()

  //Creamos nuestro Hook inicializando como objeto del Form:  

  const [datos, setDatos] = useState({

        cantidadCocineros:'',
        emailEmpresa:'',
        tokenMercadoPago:'',
       
  })

  //Metodo que se ejecuta en los input onChange, permite detectar el ingreso de datos:
  const handleInputChange = (event) => {

        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })

  }

  //Metodo que se ejecuta en el evento onSubmit desde el formulario:

  const enviarDatos = (datos, event) => {

        
        alert(JSON.stringify(datos))

        getDatos(datos)

        //Limpio todos los input
        event.target.reset()

        
  }

  const getDatos = (datos) => {

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/ConfiguracionServlet", {
        params: {

            action:'insertar',
            cantidadCocineros: datos.cantidadCocineros,
            emailEmpresa: datos.emailEmpresa,
            tokenMercadoPago: datos.tokenMercadoPago,
            fechaAlta: moment().format('YYYY-MM-DD'), 
            fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
            estado: "activo"

            //fechaAlta, fechaBaja, estado se crean x defecto:


        }
      })
    .then(response => {

        console.log(JSON.stringify(response))
        

    })
    .catch(error =>{
        console.log("Error");
        console.log(error);
    })


  }



  return (
  
    <Fragment>

        
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO CONFIGURACION</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Cantidad Cocineros: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="number"
                        name="cantidadCocineros"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Cantidad de Cocineros"
                        className="form-control my-2"
                        min="1"
                        {...register("cantidadCocineros", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                           

                        })}   

                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        
                        <span className="text-danger text-small d-block mb-2">
                        {errors.cantidadCocineros && errors.cantidadCocineros.message}
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Email Empresa: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="email"
                        name="emailEmpresa"
                        onChange={handleInputChange}
                        placeholder="Ingrese el email"
                        className="form-control"
                        {...register("emailEmpresa", { 

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
                        {errors.emailEmpresa && errors.emailEmpresa.message}
                        </span>

                </Col>



            </Row>


            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Token MercadoPago: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="text"
                        name="tokenMercadoPago"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Token"
                        className="form-control"
                        {...register("tokenMercadoPago", { 

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
                        {errors.tokenMercadoPago && errors.tokenMercadoPago.message}
                        </span>



                </Col>



            </Row>

            <Row>

                <Col ClassName='boton'>
                    <br></br>
                    <br></br>
                    <Button type="submit" className="btn btn-primary">REGISTER</Button>&nbsp;&nbsp;
                    <Button type="button" href={`/adminConfiguracion`} className="btn btn-danger">RETURN</Button>
                
                </Col>


            </Row>

            </Form>

            <br></br>
            <br></br>
             

            </Alert>

            <br></br>


        </Container>

    </Fragment>
  );

};

export default RegistrarConfiguracion;
