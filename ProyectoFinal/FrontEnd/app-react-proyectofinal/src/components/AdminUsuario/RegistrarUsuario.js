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

const RegistrarUsuario = () => {

   //Usamos el useForm para la validacion del formulario:

   const {register, formState: { errors }, handleSubmit} = useForm()

  //Creamos nuestro Hook inicializando como objeto del Form:  

  const [datos, setDatos] = useState({

        usuario:'',
        contrasena:'',
        rol:'',
        idCliente:'',
        


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

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet", {
        params: {

            action:'insertar',
            usuario: datos.usuario,
            contrasena: datos.contrasena,
            rol: datos.rol,
            idCliente: datos.idCliente,
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

  const validarCliente = async (idCliente) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
      const resJson = await response.json();
      
      const listaCliente =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaCliente.length; i++){

            //Se verifica que el .Json idCliente era un numero y el input devuelve un String, si encuentra existencia devuelve true,
            //caso contrario false y lanza el error personalizado.

            if((listaCliente[i].idCliente).toString() === (idCliente).toString() && ((listaCliente[i].estado).toString() === "activo")){

                return validar = true;
                break;


            }
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }


   //Validacion personalizada que valida que el idCliente Ingresado exista en la entidad Usuario y este Activo:

   const validarClienteDos = async (idCliente) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=listar");
      const resJson = await response.json();
      
      const listaUsuario =   resJson;
      let validar = true;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaUsuario.length; i++){

            //Si verifica el idCliente esta ya asociado a un Usuario y este esta Activo es false:

            if((listaUsuario[i].idCliente).toString() === (idCliente).toString() && ((listaUsuario[i].estado).toString() === "activo")){

                return validar = false;
                break;


            }
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }


  //Validacion personalizada que valida que el usuario ingresado no deba existir o estar activo:

  const validarUsuario = async (usuario) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=listar");
      const resJson = await response.json();
      
      const listaUsuario =   resJson;
      let validar = true;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaUsuario.length; i++){

             //Se verifica si el usuario existe y esta inactivo === true se puede ingresar (Eliminado Logico):
	        //Si el usuario existe y el estado es activo === false, no se puede crear el usuario	

            if((listaUsuario[i].usuario).toString() === (usuario).toString() && ((listaUsuario[i].estado).toString() === "inactivo")){

                return validar = true;
                break;


            }else if((listaUsuario[i].usuario).toString() === (usuario).toString() && ((listaUsuario[i].estado).toString() === "activo")){

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

        <Navigation></Navigation>
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO USUARIO</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Usuario: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="email"
                        name="usuario"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Usuario (email@example.com)"
                        className="form-control my-2"
                        {...register("usuario", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            validate:validarUsuario

                        })}   

                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        
                        <span className="text-danger text-small d-block mb-2">
                        {errors.usuario && errors.usuario.message}
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                            {
                                errors.usuario && errors.usuario.type === "validate" && (
                                    <div className="error">El usuario ya existe</div>
                                )
                            }
                            </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Contraseña: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="password"
                        name="contrasena"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Contraseña"
                        className="form-control"
                        {...register("contrasena", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            pattern: {
                                    
                                //Se debe agregar /^+expression regular + $/:
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "Invalid format PassWord"
                            },

                        })}      
                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        <br></br>
                        <span className="text-danger text-small d-block mb-2">
                        {errors.contrasena && errors.contrasena.message}
                        </span>

                </Col>



            </Row>

    
            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Rol: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="text"
                        name="rol"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Rol"
                        className="form-control"
                        {...register("rol", { 

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
                        {errors.rol && errors.rol.message}
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
                            name="idCliente"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idCliente"
                            className="form-control"
                            min="1"
                            {...register("idCliente", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },

                                validate:{

                                    validacion1:validarCliente,
                                    validacion2:validarClienteDos,
                            

                                },    
                                

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idCliente && errors.idCliente.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idCliente && errors.idCliente.type === "validacion1" && (
                                    <div className="error">El idCliente no existe</div>
                                )
                            }
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idCliente && errors.idCliente.type === "validacion2" && (
                                    <div className="error">El idCliente ya esta asociado a un Usuario Activo</div>
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
                    <Button type="button" href={`/adminUsuario`} className="btn btn-danger">RETURN</Button>
                
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

export default RegistrarUsuario;
