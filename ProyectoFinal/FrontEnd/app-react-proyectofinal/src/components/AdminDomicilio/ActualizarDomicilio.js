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


const ActualizarDomicilio = (props) => {

    

    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    

    })


    const [datos, setDatos] = useState({

            
            calle:'',
            numero:'',
            localidad:'',
            idCliente:'',
            fechaAlta:'',
            fechaBaja:'',
            estado:''

            
    })


   
    useEffect(() => {

    
        
        getDomicilio();
       

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

    //Metodo para actualizar datos domicilio =>
    const getDatos = async (datos) => {

        const id = props.match.params.id

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet", {
                params: {
        
                    action:'actualizar',
                    idDomicilio: id,
                    calle: datos.calle,
                    numero: datos.numero,
                    localidad: datos.localidad,
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
    const getDomicilio = async () => {

    try{
        
        const id = props.match.params.id;  
        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet?action=buscar&idDomicilio="+id);
        const resJson = await response.json();
        
    
        setDatos(resJson);

        
        setValue('calle', resJson.calle);
        setValue('numero', resJson.numero);
        setValue('localidad', resJson.localidad);
        setValue('idCliente', (resJson.idCliente).toString()); 
        setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
        setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
        setValue('estado', resJson.estado);
        
    }catch(error){

        console.log("Error: " + error);

    }
        
    }

    //Validacion personalizada que valida que el idCliente Ingresado exista en la BD y si esta inactivo baja logica no existe:
    const validarCliente = async (id) => {

        try{

        const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
        const resJson = await response.json();
        
        const listaCliente =   resJson;
        let validar = false;


        for(let i = 0; i < listaCliente.length; i++){

                
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

            //Obtenemos el id pasado por parametro:
            const idDomicilio = props.match.params.id;


            for(let i = 0; i < listaDomicilio.length; i++){
                
                if((listaDomicilio[i].idDomicilio).toString() !== (idDomicilio).toString()){

                
                    if(((listaDomicilio[i].idCliente).toString() === (id).toString()) && ((listaDomicilio[i].estado).toString() === "activo")  ){

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

    return (  

        <Fragment>

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION DOMICILIO</Alert.Heading>
            
           
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
                                    {errors.idCliente && errors.idCliente.message}
                                    </span>

                                    <span className="text-danger text-small d-block mb-2">
                                    {
                                    errors.idCliente && errors.idCliente.type === "validate1" && (
                                    <div className="error">El idCliente no existe</div>
                                    )
                                    }
                                    </span>

                                    <span className="text-danger text-small d-block mb-2">
                                    {
                                        errors.idCliente && errors.idCliente.type === "validate2" && (
                                            <div className="error">El idCliente ya esta asociado a un Domicilio activo</div>
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

}

export default ActualizarDomicilio;