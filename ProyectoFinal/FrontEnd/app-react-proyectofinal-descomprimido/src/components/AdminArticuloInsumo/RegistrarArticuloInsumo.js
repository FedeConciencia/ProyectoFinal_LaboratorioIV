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
import '../../assets/css/registrarMercadoPago.css';
import moment from 'moment';

const RegistrarArticuloInsumo = () => {

    const { register, formState: { errors }, handleSubmit } = useForm()

    const [datos, setDatos] = useState({

        denominacion:'',
        precioCompra:'',
        precioVenta:'',
        stockActual:'',
        stockMinimo:'',
        unidadMedida:'',
        esInsumo:'',
        idRubroArticulo:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:''
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (datos, event) => {
        alert(JSON.stringify(datos));
        getDatos(datos);
        event.target.reset();
    }

    const getDatos = (datos) => {

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet", {
            params: {

                action:'insertar',
                denominacion: datos.denominacion,
                precioCompra: datos.precioCompra,
                precioVenta: datos.precioVenta,
                stockActual: datos.stockActual,
                stockMinimo: datos.stockMinimo,
                unidadMedida: datos.unidadMedida,
                esInsumo: datos.esInsumo,
                idRubroArticulo: datos.idRubroArticulo,
                fechaAlta: moment().format('YYYY-MM-DD'), 
                fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                estado: "activo"
            }
        })
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.log("Error");
            console.log(error);
        })
    }

    return (

        <Fragment>
            <Navigation></Navigation>
            <Container>
                <Alert variant="success" className="body">
                    <Alert.Heading className="titulo">FORMULARIO ADMIN REGISTRO ARTICULO INSUMO</Alert.Heading>
                    <Form onSubmit={handleSubmit(enviarDatos)}>
                        <Row>
                            <Col className="col-md-3">
                                <label className="my-2">Denominación: </label>
                            </Col>
                            <Col>
                                <input 
                                    type="text"
                                    name="denominacion"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Denominación"
                                    className="form-control my-2"
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
                                <label className="my-2">Precio Compra: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="number"
                                    name="precioCompra"
                                    min="0"
                                    step="0.01"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Precio Venta"
                                    className="form-control my-2"
                                    {...register("precioCompra", { 

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
                                    {errors.precioCompra && errors.precioCompra.message}
                                    </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-3">                    
                                <label className="my-2">Precio Venta: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="number"
                                    name="precioVenta"
                                    min="0"
                                    step="0.01"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Precio Venta"
                                    className="form-control my-2"
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
                                    <span className="text-danger text-small d-block mb-2">
                                    {errors.precioVenta && errors.precioVenta.message}
                                    </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-3">                    
                                <label className="my-2">Stock Actual: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="number"
                                    name="stockActual"
                                    min="0"
                                    step="0.01"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Stock Actual"
                                    className="form-control my-2"
                                    {...register("stockActual", { 

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
                                    {errors.stockActual && errors.stockActual.message}
                                    </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-3">                    
                                <label className="my-2">Stock Minimo: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="number"
                                    name="stockMinimo"
                                    min="0"
                                    step="0.01"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Stock Minimo"
                                    className="form-control my-2"
                                    {...register("stockMinimo", { 

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
                                    {errors.stockMinimo && errors.stockMinimo.message}
                                    </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-3">                    
                                <label className="my-2">Unidad Medida: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="text"
                                    name="unidadMedida"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Unidad Medida"
                                    className="form-control my-2"
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
                                    <span className="text-danger text-small d-block mb-2">
                                    {errors.unidadMedida && errors.unidadMedida.message}
                                    </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-3">                    
                                <label className="my-2">Es Insumo: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="text"
                                    name="esInsumo"
                                    onChange={handleInputChange}
                                    placeholder="¿Es Insumo?"
                                    className="form-control my-2"
                                    {...register("esInsumo", { 

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
                                    {errors.esInsumo && errors.esInsumo.message}
                                    </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-3">                    
                                <label className="my-2">Id Rubro Artículo: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="number"
                                    name="idRubroArticulo"
                                    min="0"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Id Rubro Artículo"
                                    className="form-control my-2"
                                    {...register("idRubroArticulo", { 

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
                                    {errors.idRubroArticulo && errors.idRubroArticulo.message}
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

                                    })}      
                                >
                                </input>
                            </Col>

                            <Col className="col-md-3">
                                    <br></br>
                                    <span className="text-danger text-small d-block mb-2">
                                    {errors.estado && errors.estado.message}
                                    </span>
                            </Col>
                        </Row>

                        <Row>
                            <Col ClassName='boton'>
                                <Button type="submit" className="btn btn-primary">REGISTER</Button>
                            </Col>
                        </Row>
                        
                    </Form>
                </Alert>
            </Container>
        </Fragment>
    )
}

export default RegistrarArticuloInsumo;