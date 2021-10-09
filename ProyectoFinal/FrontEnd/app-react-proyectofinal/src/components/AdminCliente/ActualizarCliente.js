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



const ActualizarCliente = (props) => {

    

   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

   })

    
 
   const [datos, setDatos] = useState({

        
        nombre:'',
        apellido:'',
        dni:'',
        fechaNacimiento:'',
        telefono:'',
        email:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:''

        
   })


   
    useEffect(() => {

        
        getCliente();
       

    }, [])


    
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

    //Metodo para actualizar cliente =>
    const getDatos = async (datos) => {

        const id = props.match.params.id

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
                params: {
        
                    action:'actualizar',
                    idCliente: id,
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    dni: datos.dni,
                    fechaNacimiento: datos.fechaNacimiento,
                    telefono: datos.telefono,
                    email: datos.email,
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


      //Metodo Obtener los datos del cliente al cargar la pagina=>
      const getCliente = async () => {

        try{
            
          const id = props.match.params.id;  
          const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=buscar&idCliente="+id);
          const resJson = await response.json();
          
    
          setDatos(resJson);

        
          setValue('nombre', resJson.nombre);
          setValue('apellido', resJson.apellido);
          setValue('dni', resJson.dni);
          setValue('fechaNacimiento', moment(resJson.fechaNacimiento).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('telefono', resJson.telefono);
          setValue('email', resJson.email);
          setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
          setValue('estado', resJson.estado);
          
        }catch(error){
    
          console.log("Error: " + error);
    
        }
          
    }

    //Validacion personalizada que valida que el DNI Ingresado no exista en la BD si es de otro cliente:
    const validarDni = async (dni) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
            const resJson = await response.json();
            
            const listaCliente =   resJson;
            let validar = true;
            
            const id = props.match.params.id;

            for(let i = 0; i < listaCliente.length; i++){

                    //Si el idCliente es distinto al id pasado por parametro:
                    if((listaCliente[i].idCliente).toString() !== (id).toString()){

                        //Verifica si ya existe en la BD:
                        if((listaCliente[i].dni).toString() === (dni).toString()){ 

                            return validar = false;

                            break;

                        }
                    }    


            }


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


     
    return (  

        
        <Fragment>

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION CLIENTE</Alert.Heading>
            
           
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
                        placeholder="Ingrese la Fecha Nacimiento Formato 2020-11-05"
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

}

export default ActualizarCliente;