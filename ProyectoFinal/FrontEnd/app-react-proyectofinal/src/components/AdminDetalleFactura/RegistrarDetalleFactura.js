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

const RegistrarDetalleFactura = () => {

  

    const {register, formState: { errors }, handleSubmit} = useForm()

  
    const [datos, setDatos] = useState({

            cantidad:'',
            subTotal:'',
            idFactura:'',
            idArticulo:'',
            


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

    //Metodo que inserta los datos =>
    const getDatos = async (datos) => {

        try{

        
            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetalleFacturaServlet", {
                params: {

                    action:'insertar',
                    cantidad: datos.cantidad,
                    subTotal: datos.subTotal,
                    idFactura: datos.idFactura,
                    idArticuloManufacturado: datos.idArticulo,
                    //fechaAlta: moment().format('YYYY-MM-DD'), 
                    //fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                    //estado: "activo"


                }
            })

            const resJson = await response.data;
            console.log(resJson)
        
        }catch(error){

            console.log(error)

        }    


    }

    //Validacion personalizada que valida que el idFactura Ingresado exista en la BD y este Activo:
    const validarFactura = async (idFactura) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet?action=listar");
            const resJson = await response.json();
            
            const listaFactura =   resJson;
            let validar = false;

    
            for(let i = 0; i < listaFactura.length; i++){

                    
                    if((listaFactura[i].idFactura).toString() === (idFactura).toString() && ((listaFactura[i].estado).toString() === "activo")){

                        return validar = true;
                        break;


                    }
                

            }

            return validar;

        }catch(error){

            console.log("Error: " + error);

        }
        
    }


    //Validacion personalizada que valida que el idArticuloManufacturado Ingresado exista en la BD y este Activo:
    const validarArticulo = async (idArticulo) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet?action=listar");
            const resJson = await response.json();
            
            const listaArticulo =  resJson;
            let validar = false;

            //alert(JSON.stringify(listaArticulo))

            
            for(let i = 0; i < listaArticulo.length; i++){

                    //Se verifica que el idArticuloManufacturado ingresado exista en la BD y este activo(devuelve true) caso contrario false:

                    if((listaArticulo[i].idArticulo).toString() === (idArticulo).toString() && ((listaArticulo[i].estado).toString() === "activo")){

                        return validar = true;
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

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO DETALLE_FACTURA</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Cantidad: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="number"
                        name="cantidad"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Cantidad"
                        className="form-control my-2"
                        min="1"
                        {...register("cantidad", { 

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
                        {errors.cantidad && errors.cantidad.message}
                        </span>

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>SubTotal: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="number"
                        name="subTotal"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Subtotal"
                        className="form-control"
                        min="1"
                        step="0.01"
                        {...register("subTotal", { 

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
                        {errors.subTotal && errors.subTotal.message}
                        </span>

                </Col>



            </Row>

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Factura: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idFactura"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idFactura"
                            className="form-control"
                            min="1"
                            {...register("idFactura", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:validarFactura

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idFactura && errors.idFactura.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idFactura && errors.idFactura.type === "validate" && (
                                    <div className="error">El idFactura no existe</div>
                                )
                            }
                            </span>

                    </Col>



            </Row>

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Articulo: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idArticulo"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idArticulo"
                            className="form-control"
                            min="1"
                            {...register("idArticulo", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:validarArticulo

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idArticulo && errors.idArticulo.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idArticulo && errors.idArticulo.type === "validate" && (
                                    <div className="error">El idArticulo no existe</div>
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
                    <Button type="button" href={`/adminDetalleFactura`} className="btn btn-danger">RETURN</Button>
                
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

export default RegistrarDetalleFactura;
