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

const RegistrarFactura = () => {

   //Usamos el useForm para la validacion del formulario:

   const {register, formState: { errors }, handleSubmit} = useForm()

  //Creamos nuestro Hook inicializando como objeto del Form:  

  const [datos, setDatos] = useState({

        codigo:'',
        montoDescuento:'',
        formaPago:'',
        totalVenta:'',
        idPedido:'',
        

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

    axios.get("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet", {
        params: {

            action:'insertar',
            codigo: datos.codigo,
            montoDescuento: datos.montoDescuento,
            formaPago: datos.formaPago,
            totalVenta: datos.totalVenta,
            fechaAlta: moment().format('YYYY-MM-DD'), 
            fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
            estado: "activo",
            idPedido: datos.idPedido,

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

   //Validacion personalizada que valida que el idPedido Ingresado exista en la BD y este activo (Baja Logica):

   const validarPedido = async (idPedido) => {

    try{

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
      const resJson = await response.json();
      
      const listaPedido =   resJson;
      let validar = false;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaPedido.length; i++){

            //Se verifica que el idPedido exista en el BD y este activo (Baja Logica):

            if((listaPedido[i].idPedido).toString() === (idPedido).toString() && ((listaPedido[i].estado).toString() === "activo")){

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

      const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet?action=listar");
      const resJson = await response.json();
      
      const listaFactura =   resJson;
      let validar = true;

      //alert(JSON.stringify(listaCliente))

      
      for(let i = 0; i < listaFactura.length; i++){

            //Si el codigo existe y esta activo (retorna false) y no valida ya que debe ser unico:

            if((listaFactura[i].codigo).toString() === (codigo).toString() && ((listaFactura[i].estado).toString() === "activo")){

                
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

            <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO FACTURA</Alert.Heading>
            
           
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
                    <label>Monto Descuento: </label>

                
                </Col>

                <Col>
                    <br></br>
                    <input 
                        type="number"
                        name="montoDescuento"
                        onChange={handleInputChange}
                        placeholder="Ingrese el Monto Descuento"
                        className="form-control"
                        min="1"
                        {...register("montoDescuento", { 

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
                        {errors.montoDescuento && errors.montoDescuento.message}
                        </span>

                </Col>



            </Row>

    
            <Row>


                <Col className="col-md-3">
                    <br></br>
                    <label>Forma de Pago: </label>

                
                </Col>

                <Col>
                    <br></br>
                     <input 
                        type="text"
                        name="formaPago"
                        onChange={handleInputChange}
                        placeholder="Ingrese la Forma de Pago"
                        className="form-control"
                        {...register("formaPago", { 

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
                        {errors.formaPago && errors.formaPago.message}
                        </span>

                </Col>

            </Row>    

            <Row>


                    <Col className="col-md-3">
                        <br></br>
                        <label>Total Venta: </label>


                    </Col>

                    <Col>
                        <br></br>
                        <input 
                            type="number"
                            name="totalVenta"
                            onChange={handleInputChange}
                            placeholder="Ingrese el Total Venta"
                            className="form-control"
                            min="1"
                            step="0.01"
                            {...register("totalVenta", { 

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
                            {errors.totalVenta && errors.totalVenta.message}
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
                    <Button type="button" href={`/adminFactura`} className="btn btn-danger">RETURN</Button>
                
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

export default RegistrarFactura;
