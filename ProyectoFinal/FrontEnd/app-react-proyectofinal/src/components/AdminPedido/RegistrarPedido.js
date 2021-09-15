import React, { useState, Fragment } from "react";
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

const RegistrarPedido = () => {

   //Usamos el useForm para la validacion del formulario:

   const {register, formState: { errors }, handleSubmit} = useForm()

  //Creamos nuestro Hook inicializando como objeto del Form:  

  const [datos, setDatos] = useState({

        codigo:'',
        horaEstimadaFin:'',
        estadoPedido:'',
        tipoEnvio:'',
        total:'',
        idCliente:'',
        idDomicilio:'',

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

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
        params: {

            action:'insertar',
            codigo: datos.codigo,
            horaEstimadaFin: datos.horaEstimadaFin,
            estadoPedido: datos.estadoPedido,
            tipoEnvio: datos.tipoEnvio,
            total: datos.total,
            idCliente: datos.idCliente,
            idDomicilio: datos.idDomicilio,
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

  //Validacion personalizada que valida que el idCliente Ingresado exista en la BD y este Activo (No baja Logica):

  const validarCliente = async (idCliente) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=listar");
      const resJson = await response.json();
      
      const listaCliente =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaCliente.length; i++){

            //Si el idCliente existe y esta activo (retorna true) y valida, caso contrario false:

            if((listaCliente[i].idCliente).toString() === (idCliente).toString() && ((listaCliente[i].estado).toString() === "activo")){

                return validar = true;

            }
        

      }

      return validar;

    }catch(error){

      console.log("Error: " + error);

    }
      
  }


  //Validacion personalizada que valida que el idDomicilio Ingresado exista en la BD y este Activo (No baja Logica):

  const validarDomicilio = async (idDomicilio) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet?action=listar");
      const resJson = await response.json();
      
      const listaDomicilio =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaDomicilio.length; i++){

            //Si el idDomicilio existe y esta activo (retorna true) y valida, caso contrario false:

            if((listaDomicilio[i].idDomicilio).toString() === (idDomicilio).toString() && ((listaDomicilio[i].estado).toString() === "activo")){

                return validar = true;

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

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
      const resJson = await response.json();
      
      const listaPedido =   resJson;
      let validar = true;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaPedido.length; i++){

            //Si el codigo existe y esta activo (retorna false) y no valida ya que debe ser unico:

            if((listaPedido[i].codigo).toString() === (codigo).toString() && ((listaPedido[i].estado).toString() === "activo")){

                
                return validar = false;

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

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO PEDIDO</Alert.Heading>
            
           
            <br></br>
            <br></br>  

            <Form onSubmit={handleSubmit(enviarDatos)}>

            <Row>


                <Col className="col-md-3">
                    
                    <label className="my-2">Codigo: </label>

                
                </Col>

                <Col>
                    
                    <input 
                        type="number"
                        name="codigo"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Codigo"
                        className="form-control my-2"
                        min="1000"
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
                    <label>Hora Estimada Fin: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="text"
                        name="horaEstimadaFin"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Hora 10:10:10"
                        className="form-control"
                        {...register("horaEstimadaFin", { 

                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            },

                            pattern: {
                                value: /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/,
                                message: "Invalid format time"
                            }

                        })}      
                    >
                    </input>
                
                
                </Col>

                <Col className="col-md-3">

                        <br></br>
                        <span className="text-danger text-small d-block mb-2">
                        {errors.horaEstimadaFin && errors.horaEstimadaFin.message}
                        </span>

                </Col>



            </Row>

            <Row>
                <Col className="col-md-3">
                    <label className="my-2">Estado Pedido: </label>
                </Col>

                <Col>
                    <input 
                        type="number"
                        name="estadoPedido"
                        onChange={handleInputChange}
                        placeholder="Ingrese el estado del pedido"
                        className="form-control my-2"
                        min="0"
                        {...register("estadoPedido", {
                            required:{
                                value: true,
                                message: 'Campo Obligatorio' 
                            }
                        })}
                    >
                    </input>
                </Col>

                <Col className="col-md-3">
                        <span className="text-danger text-small d-block mb-2">
                        {errors.estadoPedido && errors.estadoPedido.message}
                        </span>
                </Col>
            </Row>

    
            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Tipo Envio: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="number"
                        name="tipoEnvio"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Tipo de Envio"
                        className="form-control"
                        min="1"
                        {...register("tipoEnvio", { 

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
                        {errors.tipoEnvio && errors.tipoEnvio.message}
                        </span>

                </Col>

            </Row>  

             <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Total: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="number"
                        name="total"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Total"
                        className="form-control"
                        min="1"
                        step="0.01"
                        {...register("total", { 

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
                        {errors.total && errors.total.message}
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


                                validate:validarCliente

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
                                errors.idCliente && errors.idCliente.type === "validate" && (
                                    <div className="error">El idCliente no existe</div>
                                )
                            }
                            </span>

                    </Col>



            </Row>

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Id_Domicilio: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="idDomicilio"
                            onChange={handleInputChange}
                            placeholder="Ingrese el idDomicilio"
                            className="form-control"
                            min="1"
                            {...register("idDomicilio", { 

                                required:{
                                    value: true,
                                    message: 'Campo Obligatorio' 
                                },


                                validate:validarDomicilio

                            })}      
                        >
                        </input>


                    </Col>

                    <Col className="col-md-3">

                            <br></br>
                            <span className="text-danger text-small d-block mb-2">
                            {errors.idDomicilio && errors.idDomicilio.message}
                            </span>

                            <span className="text-danger text-small d-block mb-2">
                            {
                                errors.idDomicilio && errors.idDomicilio.type === "validate" && (
                                    <div className="error">El idDomicilio no existe</div>
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
                    <Button type="button" href={`/adminPedido`} className="btn btn-danger">RETURN</Button>
                
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

export default RegistrarPedido;
