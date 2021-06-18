import React, {useState, useEffect, Fragment} from 'react';
import {useForm} from 'react-hook-form';
import Navigation from "../Navigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/actualizarCliente.css';
import moment from 'moment';

const ActualizarArtManDetalle = (props) => {

    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    })

    const [datos, setDatos] = useState({

        cantidad:'',
        idArticuloManufacturado:'',
        idArticuloInsumo:''
    })

    useEffect(() => {
        getArtManDetalle();
    }, [])

    // METODOS
    /*###########################################*/
    
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (datos, event) => {
        getDatos(datos);
        event.target.reset();
    }

    const getDatos = (datos) => {

        const id = props.match.params.id;

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet", {

            params: {

                action:'actualizar',
                idArticuloDetalle: id,
                cantidad: datos.cantidad,
                idArticuloManufacturado: datos.idArticuloManufacturado,
                idArticuloInsumo: datos.idArticuloInsumo
            }
        })
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.log("Error (ActualizarArtManDetalle)");
            console.log(error);
        })
    }

    const getArtManDetalle = async () => {
        try {

            const id = props.match.params.id;
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet?action=buscar&idArticuloDetalle="+id);
            const resJson = await response.json();

            console.log(JSON.stringify(resJson));

            setDatos(resJson);

            setValue('cantidad', resJson.cantidad);
            setValue('idArticuloManufacturado', resJson.idArticuloManufacturado);
            setValue('idArticuloInsumo', resJson.idArticuloInsumo);

        } catch(error){
            console.log("Error: (ActualizarArtManDetalle) " + error)
        }
    }

    return (
        
        <Fragment>
            <Navigation></Navigation>

            <Container>
                <Alert variant="success" className="body">
                    <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION ARTICULO MANUFACTURADO DETALLE</Alert.Heading>

                    <Form onSubmit={handleSubmit(enviarDatos)}>

                    <Row>
                            <Col className="col-md-3">                    
                                <label className="my-2">Cantidad: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="number"
                                    name="cantidad"
                                    min="0"
                                    step="0.01"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Cantidad"
                                    className="form-control my-2"
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
                                <label className="my-2">Id Artículo Manufacturado: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="number"
                                    name="idArticuloManufacturado"
                                    min="0"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Id Articulo Manufacturado"
                                    className="form-control my-2"
                                    {...register("idArticuloManufacturado", { 

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
                                    {errors.idArticuloManufacturado && errors.idArticuloManufacturado.message}
                                    </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-3">                    
                                <label className="my-2">Id Articulo Insumo: </label>
                            </Col>

                            <Col>
                                <input 
                                    type="number"
                                    name="idArticuloInsumo"
                                    min="0"
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Id Articulo Insumo"
                                    className="form-control my-2"
                                    {...register("idArticuloInsumo", { 

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
                                    {errors.idArticuloInsumo && errors.idArticuloInsumo.message}
                                    </span>
                            </Col>
                        </Row>

                        <Row>
                            <Col ClassName='boton'>
                                <Button type="submit" className="btn btn-primary">UPDATE</Button>
                            </Col>
                        </Row>
                    </Form>
                </Alert>
            </Container>
        </Fragment>
    )
}

export default ActualizarArtManDetalle;