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

const RegistrarMercadoPago = () => {

   

    const {register, formState: { errors }, handleSubmit} = useForm()

   

    const [datos, setDatos] = useState({

        codigo:'',
        fechaApro:'',
        metodoPago:'',
        numeroTarjeta:'',
        idPedido:'',

    })

    
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

    const getDatos = async (datos) => {

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/MercadoPagoServlet", {
                params: {

                    action:'insertar',
                    codigo: datos.codigo,
                    fechaAprobacion: datos.fechaAprobacion,
                    metodoPago: datos.metodoPago,
                    numeroTarjeta: datos.numeroTarjeta,
                    idPedido: datos.idPedido,
                    fechaAlta: moment().format('YYYY-MM-DD'), 
                    fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                    estado: "activo"


                }
            })

            const resJson = await response.data;
            console.log(resJson)

        }catch(error){

            console.log(error)
        }    
       
    }

    //Validacion personalizada que valida que el idPedido Ingresado exista en la BD:
    const validarPedido = async (idPedido) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
            const resJson = await response.json();
            
            const listaPedido =   resJson;
            let validar = false;


            
            for(let i = 0; i < listaPedido.length; i++){

                
                if((listaPedido[i].idPedido).toString() === (idPedido).toString() && (listaPedido[i].estado).toString() === "activo"){

                    return validar = true;
                    break;


                }
                

            }

            return validar;

        }catch(error){

            console.log("Error: " + error);

        }
        
    }


    //Validacion personalizada que valida que el codigo Ingresado no exista en la BD y este Inactivo (baja Logica):
    const validarCodigo = async (codigo) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/MercadoPagoServlet?action=listar");
            const resJson = await response.json();
            
            const listaMercadoPago =   resJson;
            let validar = true;

            
            for(let i = 0; i < listaMercadoPago.length; i++){

                    
                if((listaMercadoPago[i].codigo).toString() === (codigo).toString() && ((listaMercadoPago[i].estado).toString() === "activo")){

                    
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

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO MERCADO_PAGO</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Codigo: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="text"
                        name="codigo"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Codigo"
                        className="form-control my-2"
                        {...register("codigo", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            validate:{

                                validacion1:validarCodigo,

                            }

                        })}   

                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        
                        <span className="text-danger text-small d-block mb-2">
                        {errors.codigo && errors.codigo.message}
                        </span>

                        <span className="text-danger text-small d-block mb-2">
                            {
                                errors.codigo && errors.codigo.type === "validacion1" && (
                                    <div className="error">El codigo ingresado ya existe</div>
                                )
                            }
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Fecha Aprobacion: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="date"
                        name="fechaAprobacion"
                        onChange={handleInputChange}
                        placeholder="Ingrese la fecha Aprobacion"
                        className="form-control"
                        {...register("fechaAprobacion", { 

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
                        {errors.fechaAprobacion && errors.fechaAprobacion.message}
                        </span>

                </Col>



            </Row>

    
            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Metodo Pago: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="text"
                        name="metodoPago"
                        onChange={handleInputChange}
                        placeholder="Ingrese el metodo de Pago"
                        className="form-control"
                        {...register("metodoPago", { 

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
                        {errors.metodoPago && errors.metodoPago.message}
                        </span>

                </Col>

            </Row>  

             <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Numero Tarjeta: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="number"
                        name="numeroTarjeta"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Numero de Tarjeta"
                        className="form-control"
                        {...register("numeroTarjeta", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            pattern: {
                                value: /^\d{16}(?:[-\s]\d{4})?$/,
                                message: "Invalid format Credit Card 16 digits"
                            },

                        })}      
                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        <br></br>
                        <span className="text-danger text-small d-block mb-2">
                        {errors.numeroTarjeta && errors.numeroTarjeta.message}
                        </span>

                </Col>

            </Row>  


            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Pedido: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idPedido"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idPedido"
                            className="form-control"
                            min="1"
                            {...register("idPedido", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:validarPedido

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idPedido && errors.idPedido.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idPedido && errors.idPedido.type === "validate" && (
                                    <div className="error">El idPedido no existe</div>
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
                    <Button type="button" href={`/adminMercadoPago`} className="btn btn-danger">RETURN</Button>
                
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

export default RegistrarMercadoPago;
