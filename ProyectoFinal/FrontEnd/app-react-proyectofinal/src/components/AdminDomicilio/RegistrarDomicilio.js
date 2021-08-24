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

const RegistrarDomicilio = () => {

   //Usamos el useForm para la validacion del formulario:

   const {register, formState: { errors }, handleSubmit} = useForm()

  //Creamos nuestro Hook inicializando como objeto del Form:  

  const [datos, setDatos] = useState({

        calle:'',
        numero:'',
        localidad:'',
        id:'',
        


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

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet", {
        params: {

            action:'insertar',
            calle: datos.calle,
            numero: datos.numero,
            localidad: datos.localidad,
            idCliente: datos.id,
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

  //Validacion personalizada que valida que el idCliente Ingresado exista en la BD y si esta inactivo baja logica no existe:

  const validarCliente = async (id) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
      const resJson = await response.json();
      
      const listaCliente =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaCliente.length; i++){

            //Se verifica que el .Json idCliente era un numero y el input devuelve un String, si encuentra existencia devuelve true,
            //caso contrario false y lanza el error personalizado.

            if(((listaCliente[i].idCliente).toString() === (id).toString()) && ((listaCliente[i].estado).toString() === "activo")  ){

                return validar = true;
                break;


            }
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }
  

  //Validacion personalizada que valida que el idCliente Ingresado exista en la BD y si esta inactivo baja logica no existe:

  const validarDomicilio = async (id) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet?action=listar");
      const resJson = await response.json();
      
      const listaDomicilio =   resJson;
      let validar = true;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaDomicilio.length; i++){

            //Se verifica que el .Json idCliente era un numero y el input devuelve un String, si encuentra existencia devuelve true,
            //caso contrario false y lanza el error personalizado.

            if(((listaDomicilio[i].idCliente).toString() === (id).toString()) && ((listaDomicilio[i].estado).toString() === "activo")  ){

                return validar = false;
                break;


            }
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }



  return (
  
    <Fragment>

        
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO DOMICILIO</Alert.Heading>
            
           
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


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Cliente: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="id"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idCliente"
                            className="form-control"
                            min="1"
                            {...register("id", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:{

                                    validate1:validarCliente,
                                    validate2:validarDomicilio,

                                }    

                                
                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.id && errors.id.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.id && errors.id.type === "validate1" && (
                                    <div className="error">El idCliente no existe</div>
                                )
                            }
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.id && errors.id.type === "validate2" && (
                                    <div className="error">El idCliente ya esta asociado a un Domicilio activo</div>
                                )
                            }
                            </span>

                           
                    </Col>



            </Row>

             <Row>   

                <Col ClassName='boton'>
                    <br></br>
                    <br></br>
                    <Button type="submit" className="btn btn-primary">REGISTER</Button>&nbsp;&nbsp;
                    <Button type="button" href={`/adminDomicilio`} className="btn btn-danger">RETURN</Button>
                
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

export default RegistrarDomicilio;
