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

const ActualizarRubroArticulo = (props) => {

    const {register, formState: { errors }, handleSubmit, setValue} = useForm({

    })

    const [datos, setDatos] = useState({

        denominacion:'',
        fechaAlta:'',
        fechaBaja:'',
        estado:''
    })

    useEffect(() => {
        getRubroArticulo();
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

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/RubroArticuloServlet", {

            params: {

                action:'actualizar',
                idRubro: id,
                denominacion: datos.denominacion,
                fechaAlta: datos.fechaAlta,
                fechaBaja: datos.fechaBaja,
                estado: datos.estado
            }
        })
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.log("Error (ActualizarRubroArticulo)");
            console.log(error);
        })
    }

    const getRubroArticulo = async () => {
        try {

            const id = props.match.params.id;
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/RubroArticuloServlet?action=buscar&idRubro="+id);
            const resJson = await response.json();

            console.log(JSON.stringify(resJson));

            setDatos(resJson);

            setValue('denominacion', resJson.denominacion);
            setValue('fechaAlta', moment(resJson.fechaAlta).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('fechaBaja', moment(resJson.fechaBaja).subtract(1, 'M').format('YYYY-MM-DD'));
            setValue('estado', resJson.estado);

        } catch(error){
            console.log("Error: (ActualizarRubroArticulo) " + error)
        }
    }

    return (
        
        <Fragment>
            <Navigation></Navigation>

            <Container>
                <Alert variant="success" className="body">
                    <Alert.Heading className="titulo">FORMULARIO ADMIN ACTUALIZACION RUBRO ARTICULO</Alert.Heading>

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
                                    placeholder="Ingrese denominación"
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
                                <Button type="submit" className="btn btn-primary">UPDATE</Button>
                            </Col>
                        </Row>
                    </Form>
                </Alert>
            </Container>
        </Fragment>
    )
}

export default ActualizarRubroArticulo;