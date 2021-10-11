import React, {Component, useState, useEffect, Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Navigation from "../Navigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import moment from 'moment';



const ActualizarUsuario = (props) => {

    
   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

   })

    
   const [datos, setDatos] = useState({

        
        usuario:'',
        contrasena:'',
        rol:'',
        idCliente:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:'',

        
    })


    useEffect(() => {

        
        getUsuario();
       
    },[])


    const handleInputChange = (event) => {

        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })

    }

   
    const enviarDatos = (datos, event) => {

        
        getDatos(datos)

        
        event.target.reset()
    
    }

    //Metodo para actualizar los datos =>
    const getDatos = async (datos) => {

    
        const id = props.match.params.id

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet", {
                params: {
        
                    action:'actualizar',
                    idUsuario: id,
                    usuario: datos.usuario,
                    contrasena: datos.contrasena,
                    rol: datos.rol,
                    idCliente: datos.idCliente,
                    fechaAlta: datos.fechaAlta,
                    fechaBaja: datos.fechaBaja,
                    estado: datos.estado
        
                    
                }
            })

            const resJson = await response.data;

            console.log(resJson)

        }catch(error){

            console.log(error)


        }    
        
    }


    //Metodo Obtener los datos al Cargar la Pagina:
    const getUsuario = async () => {

        try{
            
            const id = props.match.params.id;  
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/UsuarioServlet?action=buscar&idUsuario="+id);
            const resJson = await response.json();

            setDatos(resJson);

            setValue('usuario', resJson.usuario);
            setValue('contrasena', resJson.contraseña);
            setValue('rol', resJson.rol);
            setValue('idCliente', (resJson.idCliente).toString()); //parseo a String
            setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('estado', resJson.estado);
            
        }catch(error){

            console.log("Error: " + error);

        }
        
    }


    //Validacion personalizada que valida que el idCliente Ingresado exista en la BD y si esta inactivo baja logica no existe:
    const validarCliente = async (idCliente) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
            const resJson = await response.json();
            
            const listaCliente =   resJson;
            let validar = false;


            for(let i = 0; i < listaCliente.length; i++){


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

           
            const id = props.match.params.id;


            for(let i = 0; i < listaUsuario.length; i++){

                    
                    if((listaUsuario[i].idUsuario).toString() !== (id).toString()){

                        
                        if((listaUsuario[i].idCliente).toString() === (idCliente).toString() && ((listaUsuario[i].estado).toString() === "activo")){

                            return validar = false;
                            break;


                        }

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

        const id = props.match.params.id;


        for(let i = 0; i < listaUsuario.length; i++){


            if((listaUsuario[i].idUsuario).toString() !== (id).toString()){

                	
                if((listaUsuario[i].usuario).toString() === (usuario).toString() && ((listaUsuario[i].estado).toString() === "inactivo")){

                    return validar = true;
                    break;


                }else if((listaUsuario[i].usuario).toString() === (usuario).toString() && ((listaUsuario[i].estado).toString() === "activo")){

                    return validar = false;
                    break;

                }
            }

        }

        return validar;

        }catch(error){

        console.log("Error: " + error);

        }
        
    }


    //Validar activo-inactivo en actualizacion datos input estado:
    const validarEstado = (estado) => {

        let validar = false;

        if(estado === "activo"){

            return validar = true;
        


        }else if(estado === "inactivo"){

            return validar = true;

        }

        return validar;

    }

    //Validar rol del usuario:
    const validarRol = (rol) => {

        let validar = false;

        if(rol === "cliente"){

            return validar = true;

        }else if(rol === "administrador"){

            return validar = true;

        }else if(rol === "cocinero"){

            return validar = true;
        
        }else if(rol === "cajero"){

            return validar = true;
        
        }else if(rol === "dueno"){

            return validar = true;  
            
        }    

        return validar;

    }

     
    return (  

        

        <Fragment>

       
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION USUARIO</Alert.Heading>
            
           
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
                        placeholder="Ingrese el Rol => cliente-administrador-cajero-cocinero-dueno"
                        className="form-control"
                        {...register("rol", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            validate:{

                                validate1: validarRol,
                            }

                        })}      
                    >
                    </input>


                </Col>

                <Col className="col-md-3">

                        <br></br>
                        <span className="text-danger text-small d-block mb-2">
                        {errors.rol && errors.rol.message}
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                            {
                            errors.rol && errors.rol.type === "validate1" && (
                            <div className="error">El rol ingresado no existe</div>
                            )
                            }
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

                            <Col className="col-md-3">
                                <br></br>
                                <label>Fecha de Alta: </label>

                            
                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="date"
                                    name="fechaAlta"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese la Fecha de Alta 2020-11-05"
                                    className="form-control"
                                    {...register("fechaAlta", { 

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
                                    {errors.fechaAlta && errors.fechaAlta.message}
                                    </span>

                            </Col>



                        </Row>

                        <Row>


                            <Col className="col-md-3">
                                <br></br>
                                <label>Fecha de Baja: </label>

                            
                            </Col>

                            <Col>
                                <br></br>
                                <input 
                                    type="date"
                                    name="fechaBaja"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese la Fecha de Baja 2020-11-05"
                                    className="form-control"
                                    {...register("fechaBaja", { 

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
                                    {errors.fechaBaja && errors.fechaBaja.message}
                                    </span>

                            </Col>



                        </Row>



                        <Row>


                                <Col className="col-md-3">
                                    <br></br>
                                    <label>Estado: </label>

                                
                                </Col>

                                <Col>
                                    <br></br>
                                
                                    <input 
                                        type="text"
                                        name="estado"
                                        onChange={handleInputChange}
                                        placeholder="Ingrese el estado (activo o inactivo)"
                                        className="form-control"
                                        {...register("estado", { 

                                            required:{
                                                value: true,
                                                message: 'Campo Obligatorio' 
                                            },

                                            validate:{

                                                validate1:validarEstado,
                                                
            
                                            }    

                                        })}      
                                    >
                                    </input>
                                
                                
                                </Col>

                                <Col className="col-md-3">

                                        <br></br>
                                        <span className="text-danger text-small d-block mb-2">
                                        {errors.estado && errors.estado.message}
                                        </span>

                                        <span className="text-danger text-small d-block mb-2">
                                        {
                                        errors.estado && errors.estado.type === "validate1" && (
                                        <div className="error">El estado debe ser activo o inactivo</div>
                                        )
                                        }
                                        </span>

                                </Col>



                        </Row>

                        <Row>

                                <Col ClassName='boton'>
                                    <br></br>
                                    <br></br>
                                    <Button type="submit" className="btn btn-primary">UPDATE</Button>&nbsp;&nbsp;
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

}

export default ActualizarUsuario;