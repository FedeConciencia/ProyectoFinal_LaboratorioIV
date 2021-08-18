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

const RegistrarArtManDetalle = () => {

   //Usamos el useForm para la validacion del formulario:

   const {register, formState: { errors }, handleSubmit} = useForm()

  //Creamos nuestro Hook inicializando como objeto del Form:  

  const [datos, setDatos] = useState({

        cantidad:'',
        unidadMedida:'',
        idArtManufacturado:'',
        idArtInsumo:'',
        


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

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet", {
        params: {

            action:'insertar',
            cantidad: datos.cantidad,
            unidadMedida: datos.unidadMedida,
            idArticuloManufacturado: datos.idArtManufacturado,
            idArticuloInsumo: datos.idArtInsumo,
            //fechaAlta: moment().format('YYYY-MM-DD'), 
            //fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
            //estado: "activo"

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

  //Validacion personalizada que valida que el idPedido Ingresado exista en la BD y este Activo:

  const validarArtInsumo = async (idArtInsumo) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet?action=listar");
      const resJson = await response.json();
      
      const listaInsumo =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaInsumo.length; i++){

            //Se verifica que el idFactura ingresado exista en la BD y este activo(devuelve true) caso contrario false:

            if((listaInsumo[i].idArticulo).toString() === (idArtInsumo).toString() && ((listaInsumo[i].estado).toString() === "activo")){

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

   const validarArtManufacturado = async (idArtManufacturado) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet?action=listar");
      const resJson = await response.json();
      
      const listaArticulo =  resJson;
      let validar = false;

      //alert(JSON.stringify(listaArticulo))

      
      for(let i = 0; i < listaArticulo.length; i++){

            //Se verifica que el idArticuloManufacturado ingresado exista en la BD y este activo(devuelve true) caso contrario false:

            if((listaArticulo[i].idArticulo).toString() === (idArtManufacturado).toString() && ((listaArticulo[i].estado).toString() === "activo")){

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

        <Navigation></Navigation>
       

        <Container>

        <Alert variant="success" className="body">

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO ARTICULO_MANUFACTURADO_DETALLE</Alert.Heading>
            
           
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
                        step="0.01"
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
                    <label>Unidad Medida: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="text"
                        name="unidadMedida"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Unidad de Medida"
                        className="form-control"
                        {...register("unidadMedida", { 

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
                        {errors.unidadMedida && errors.unidadMedida.message}
                        </span>

                </Col>



            </Row>

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_ArtManufacturado: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idArtManufacturado"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idArtManufacturado"
                            className="form-control"
                            min="1"
                            {...register("idArtManufacturado", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:validarArtManufacturado

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idArtManufacturado && errors.idArtManufacturado.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idArtManufacturado && errors.idArtManufacturado.type === "validate" && (
                                    <div className="error">El idArtManufacturado no existe</div>
                                )
                            }
                            </span>

                    </Col>



            </Row>

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_ArtInsumo: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idArtInsumo"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idArtInsumo"
                            className="form-control"
                            min="1"
                            {...register("idArtInsumo", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:validarArtInsumo

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idArtInsumo && errors.idArtInsumo.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idArtInsumo && errors.idArtInsumo.type === "validate" && (
                                    <div className="error">El idArtInsumo no existe</div>
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
                    <Button type="button" href={`/adminArtManDetalle`} className="btn btn-danger">RETURN</Button>
                
                
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

export default RegistrarArtManDetalle;
