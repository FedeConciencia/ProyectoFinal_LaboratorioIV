import React, { useState, useEffect, Fragment } from "react";
import Navigation from "../Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/registrar.css';
import Button from "react-bootstrap/Button";
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const VerificarDomicilio = (props) => {

   
    let history = useHistory();

    let idCliente = 0;

    let idDomicilio = 0;

    const {register, formState: { errors }, handleSubmit, setValue} = useForm({



    })


    const [datos, setDatos] = useState({

        
        calle:'',
        numero:'',
        localidad:'',

        
    })

    
    useEffect( () => {

        ejecutarUseEffect()

    }, []) 

  
    const ejecutarUseEffect = async () => {

        await getIdCliente();

        await getDomicilio();

    }
   

    const handleInputChange = (event) => {

        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })

    }


    const enviarDatos = async (datos, event) => {

    
        await getDatos(datos)

   
        event.target.reset()

    }

    //Metodo para actualizar datos:
    const getDatos = async (datos) => {

        try{
            
           const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet", {
                params: {

                    action:'actualizar',
                    idDomicilio: idDomicilio, 
                    calle: datos.calle,
                    numero: datos.numero,
                    localidad: datos.localidad,
                    idCliente: idCliente, 
                    fechaAlta: moment().format('YYYY-MM-DD'), 
                    fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                    estado: "activo",

                    
                }
            })

            const resJson = await response.data;

            console.log("GET_DATOS => ", resJson)

            
            await history.push('/metodoPago');  

        }catch(error){

            console.log(error)

        }    
    

    }


    //Metodo Obtener los datos al Cargar la Pagina:
    const getDomicilio = async () => {

        try{
        
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet?action=buscarXIdCliente&idCliente="+ idCliente);
            const resJson = await response.json();
            
           
            console.log(JSON.stringify(resJson));

            setValue('calle', resJson.calle);
            setValue('numero', resJson.numero);
            setValue('localidad', resJson.localidad);
        
            idDomicilio = resJson.idDomicilio;
            
            idCliente = resJson.idCliente;

            console.log("ID_CLIENTE => ", idCliente)

            console.log("ID_DOMICILIO => ", idCliente)
                        
    
        }catch(error){

            console.log("Error: " + error);

        }
        
    }

     //Metodo que obtiene el idCliente a traves del mail buscando en la entidad cliente:
     const getIdCliente = async () => {

        //Obtenemos el email desde el usuario en localStorage, tener en cuenta el valor en localStorage:
        let email = JSON.parse(localStorage.getItem("usuario")).usuario;

        console.log(email);

        try{


            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
                params: {
        
                    action:'idxEmail',
                    email: email,
                
        
                }
            })

            const resJson = await response.data;

            idCliente = resJson;

            console.log("ID_CLIENTE => ", idCliente)


            }catch(error){


                console.log(error)

            }  
        
    }

    return(

        <Fragment>

            <Container>

            <br></br>
            <br></br>

            <Alert variant="success" className="body">

                <br></br>
                <br></br>

                <Alert.Heading className="titulo">ACTUALIZAR DOMICILIO ENVIO</Alert.Heading>
                
            
                <br></br>
                <br></br>  

                <Form onSubmit={handleSubmit(enviarDatos)}>

                    <Row>


                        <Col className="col-md-3">
                            
                            <label className="my-2">Calle: </label>


                        </Col>

                        <Col>
                            
                            <input 
                                type="text"
                                name="calle"
                                onChange={handleInputChange}
                                placeholder="Ingrese la Calle"
                                className="form-control my-2"
                                {...register("calle", { 

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
                                {errors.calle && errors.calle.message}
                                </span>

                        </Col>



                    </Row>

                    <Row>


                        <Col className="col-md-3">
                            <br></br>
                            <label>Numero: </label>


                        </Col>

                        <Col>
                            <br></br>
                            <input 
                                type="number"
                                name="numero"
                                onChange={handleInputChange}
                                placeholder="Ingrese el Numero"
                                className="form-control"
                                min="1"
                                {...register("numero", { 

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
                                {errors.numero && errors.numero.message}
                                </span>

                        </Col>



                    </Row>


                    <Row>


                        <Col className="col-md-3">
                            <br></br>
                            <label>Localidad: </label>


                        </Col>

                        <Col>
                            <br></br>
                            <input 
                                type="text"
                                name="localidad"
                                onChange={handleInputChange}
                                placeholder="Ingrese la Localidad"
                                className="form-control"
                                {...register("localidad", { 

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
                                {errors.localidad && errors.localidad.message}
                                </span>

                        </Col>

                    </Row>    

                    <Row>

                        <Col ClassName='boton'>
                            <br></br>
                            <br></br>
                            <Button type="submit" className="btn btn-primary">UPDATE</Button>
                        
                        </Col>


                    </Row>

        </Form>

        <br></br>
        <br></br>
     

        </Alert>

        <br></br>


        </Container>


        </Fragment>


    )




}

export default VerificarDomicilio;