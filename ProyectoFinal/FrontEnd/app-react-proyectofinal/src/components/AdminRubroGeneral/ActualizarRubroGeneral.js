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


const ActualizarRubroGeneral = (props) => {

    

    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    

    })
 
    
    const [datos, setDatos] = useState({

            
        denominacion:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:'',

            
    })


    useEffect(() => {

   
        getRubro();
       
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

    //Metodo para actualizar datos:
    const getDatos = async (datos) => {

        const id = props.match.params.id

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/RubroGeneralServlet?", {
                params: {
        
                    action:'actualizar',
                    idRubro: id,
                    denominacion:datos.denominacion,
                    fechaAlta: datos.fechaAlta,
                    fechaBaja: datos.fechaBaja,
                    estado: datos.estado
        
                    
                }
            })

            const resJson = await response.data

            console.log(resJson)

        }catch(error){

            console.log(error)

        }    


    }


    //Metodo Obtener los datos al Cargar la Pagina:
    const getRubro = async () => {

        try{
            
            const id = props.match.params.id;  
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/RubroGeneralServlet?action=buscar&idRubro="+id);
            const resJson = await response.json();
            
            setDatos(resJson);

            setValue('denominacion', resJson.denominacion);
            setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('estado', resJson.estado);
            
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

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION RUBRO_GENERAL</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            
            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Denominacion: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="text"
                        name="denominacion"
                        onChange={handleInputChange}
                        placeholder="Ingrese la denominacion"
                        className="form-control my-2"
                        minLength="3"
                        maxLength="20"
                        {...register("denominacion", { 

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
                        {errors.denominacion && errors.denominacion.message}
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
                            placeholder="Ingrese el estado"
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
                        <Button type="button" href={`/adminRubroGeneral`} className="btn btn-danger">RETURN</Button>
                    
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

export default ActualizarRubroGeneral;