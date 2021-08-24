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

const RegistrarArtManufacturado = () => {

   //Usamos el useForm para la validacion del formulario:

   const {register, formState: { errors }, handleSubmit} = useForm()

  //Creamos nuestro Hook inicializando como objeto del Form:  

  const [datos, setDatos] = useState({

        tiempoEstimado:'',
        denominacion:'',
        precioVenta:'',
        imagen:'',
        idRubro:'',
        


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

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet", {
        params: {

            action:'insertar',
            tiempoEstimado: datos.tiempoEstimado,
            denominacion: datos.denominacion,
            precioVenta: datos.precioVenta,
            imagen:datos.imagen,
            idRubro: datos.idRubro,
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

  //Validacion personalizada que valida que el idRubro Ingresado exista en la BD y si esta inactivo baja logica no existe:

  const validarRubro = async (idRubro) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/RubroGeneralServlet?action=listar");
      const resJson = await response.json();
      
      const listaRubro =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaRubro.length; i++){

            //Se verifica que el .Json idCliente era un numero y el input devuelve un String, si encuentra existencia devuelve true,
            //caso contrario false y lanza el error personalizado.

            if((listaRubro[i].idRubro).toString() === (idRubro).toString() && ((listaRubro[i].estado).toString() === "activo")){

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

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO ARTICULO_MANUFACTURADO</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Tiempo Estimado: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="number"
                        name="tiempoEstimado"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Tiempo Estimado"
                        className="form-control my-2"
                        min="1"
                        {...register("tiempoEstimado", { 

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
                        {errors.tiempoEstimado && errors.tiempoEstimado.message}
                        </span>

  

                </Col>



            </Row>

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Denominacion: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="text"
                        name="denominacion"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Denominacion"
                        className="form-control"
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

                        <br></br>
                        <span className="text-danger text-small d-block mb-2">
                        {errors.denominacion && errors.denominacion.message}
                        </span>

                </Col>



            </Row>

    
            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Precio Venta: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="number"
                        name="precioVenta"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Precio Venta"
                        className="form-control"
                        min="1"
                        step="0.01"
                        {...register("precioVenta", { 

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
                        {errors.precioVenta && errors.precioVenta.message}
                        </span>

                </Col>

            </Row>   

            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Imagen: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="text"
                        name="imagen"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Imagen"
                        className="form-control"
                        {...register("imagen", { 

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
                        {errors.imagen && errors.imagen.message}
                        </span>

                </Col>



            </Row> 

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Rubro: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idRubro"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idRubro"
                            className="form-control"
                            min="1"
                            {...register("idRubro", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },

                                validate:{

                                    validacion1:validarRubro,
                                    
                            

                                },    
                                

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idRubro && errors.idRubro.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idRubro && errors.idRubro.type === "validacion1" && (
                                    <div className="error">El idRubro no existe</div>
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
                    <Button type="button" href={`/adminArtManufacturado`} className="btn btn-danger">RETURN</Button>
                
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

export default RegistrarArtManufacturado;
