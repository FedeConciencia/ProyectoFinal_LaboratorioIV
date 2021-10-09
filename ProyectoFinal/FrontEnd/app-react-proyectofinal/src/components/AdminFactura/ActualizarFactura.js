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


const ActualizarFactura = (props) => {

    
   const {register, formState: { errors }, handleSubmit, setValue} = useForm({

   

   })

    
 
   const [datos, setDatos] = useState({

        
        codigo:'',
        montoDescuento:'',
        formaPago:'',
        totalVenta:'',
        idPedido:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:'',

        
   })



    useEffect(() => {

    
        getFactura();
       
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

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet?", {
                params: {
        
                    action:'actualizar',
                    idFactura: id,
                    codigo: datos.codigo,
                    montoDescuento: datos.montoDescuento,
                    formaPago: datos.formaPago,
                    totalVenta: datos.totalVenta,
                    idPedido: datos.idPedido,
                    fechaAlta: datos.fechaAlta,
                    fechaBaja: datos.fechaBaja,
                    estado: datos.estado
        
                    
                }
            })

            const resJson = await response;

            console.log(resJson)

        }catch(error){

            console.log(error)
        }    
    
    }


    //Metodo Obtener los datos al Cargar la Pagina:
    const getFactura = async () => {

        try{
            
            const id = props.match.params.id;  
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet?action=buscar&idFactura="+id);
            const resJson = await response.json();
            
            
            setDatos(resJson);

            
            setValue('codigo', resJson.codigo);
            setValue('montoDescuento', resJson.montoDescuento );
            setValue('formaPago', resJson.formaPago);
            setValue('totalVenta', resJson.totalVenta);
            setValue('idPedido', (resJson.idPedido).toString()); //parseo a String
            setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('estado', resJson.estado);
            
        }catch(error){

            console.log("Error: " + error);

        }
        
    }

    //Validacion personalizada que valida que el idPedido Ingresado exista en la BD y este Activo:
    const validarPedido = async (idPedido) => {

        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet?action=listar");
            const resJson = await response.json();
            
            const listaPedido =   resJson;
            let validar = false;

            
            for(let i = 0; i < listaPedido.length; i++){


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

            const id = props.match.params.id;


            for(let i = 0; i < listaFactura.length; i++){

                if((listaFactura[i].idFactura).toString() !== (id).toString()){


                    if((listaFactura[i].codigo).toString() === (codigo).toString() && (listaFactura[i].estado).toString() === "activo"){

                        
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

            <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION FACTURA</Alert.Heading>
            
           
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

}

export default ActualizarFactura;