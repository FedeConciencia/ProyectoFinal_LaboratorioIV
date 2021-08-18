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

const RegistrarCliente = () => {

   //Usamos el useForm para la validacion del formulario:

   const {register, formState: { errors }, handleSubmit} = useForm()

  //Creamos nuestro Hook inicializando como objeto del Form:  

  const [datos, setDatos] = useState({

        nombre:'',
        apellido:'',
        dni:'',
        fechaNacimiento:'',
        telefono:'',
        email:'',
        


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

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
        params: {

            action:'insertar',
            nombre: datos.nombre,
            apellido: datos.apellido,
            dni: datos.dni,
            fechaNacimiento: datos.fechaNacimiento,
            telefono: datos.telefono,
            email: datos.email,
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

  //Validacion personalizad que valida que el DNI Ingresado no exista en la BD:

  const validarDni = async (dni) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
      const resJson = await response.json();
      
      const listaCliente =   resJson;
      let validar = true;

      //alert(JSON.stringify(listaCliente))

    
      for(let i = 0; i < listaCliente.length; i++){

            if((listaCliente[i].dni).toString() === (dni).toString()){ 

                return validar = false;

                break;

            }


      }


    }catch(error){

      console.log("Error: " + error);

    }
      
  }




  return (
  
    <Fragment>

        <Navigation></Navigation>
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO CLIENTE</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Nombre: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="text"
                        name="nombre"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Nombre"
                        className="form-control my-2"
                        {...register("nombre", { 

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
                        {errors.nombre && errors.nombre.message}
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Apellido: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="text"
                        name="apellido"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Apellido"
                        className="form-control"
                        {...register("apellido", { 

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
                        {errors.apellido && errors.apellido.message}
                        </span>

                </Col>



            </Row>


            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Dni: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="number"
                        name="dni"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Dni"
                        className="form-control"
                        {...register("dni", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            pattern: {
                                value: /^\d{8}(?:[-\s]\d{4})?$/,
                                message: "Invalid format Dni 8 digits"
                            },

                            validate:validarDni

                        })}      
                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        <br></br>
                        <span className="text-danger text-small d-block mb-2">
                        {errors.dni && errors.dni.message}
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                        {
                            errors.dni && errors.dni.type === "validate" && (
                                <div className="error">El DNI ingresado ya existe</div>
                            )
                        }
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Fecha Nacimiento: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="date"
                        name="fechaNacimiento"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Fecha Nacimiento 2020-11-05"
                        className="form-control"
                        {...register("fechaNacimiento", { 

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
                        {errors.fechaNacimiento && errors.fechaNacimiento.message}
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Telefono: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="number"
                        name="telefono"
                        onChange={handleInputChange}
                        placeholder="Ingrese el telefono"
                        className="form-control"
                        {...register("telefono", { 

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
                        {errors.telefono && errors.telefono.message}
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Email: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="email"
                        name="email"
                        onChange={handleInputChange}
                        placeholder="Ingrese el email"
                        className="form-control"
                        {...register("email", { 

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
                        {errors.email && errors.email.message}
                        </span>

                </Col>



            </Row>


            <Row>

                <Col ClassName='boton'>
                    <br></br>
                    <br></br>
                    <Button type="submit" className="btn btn-primary">REGISTER</Button>&nbsp;&nbsp;
                    <Button type="button" href={`/adminCliente`} className="btn btn-danger">RETURN</Button>
                
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

export default RegistrarCliente;
