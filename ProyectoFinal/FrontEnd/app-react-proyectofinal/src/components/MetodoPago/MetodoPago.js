import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import Alert from "react-bootstrap/Alert";
import {useForm} from 'react-hook-form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const MetodoPago = (props) => {


    //Usamos el useForm para la validacion del formulario:

    const {register, formState: { errors }, handleSubmit} = useForm()


    const [datos, setDatos] = useState({

        codigo:'',
        horaEstimadaFin:'',
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

            

            //Limpio todos los input
            event.target.reset()

            
        }


    return (

        <Fragment>

            <div>

            <br></br>
            

            <Alert variant="success" className="bodyDetalle"> 

            <Form onSubmit={handleSubmit()}>

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">CONFIRMACION DE METODO PAGO</Alert.Heading>
            
           
            <br></br>
            <br></br>

            <Row>

                <Col>
                
                    <h3>Selecciona forma de Entrega:</h3>
                
                </Col>

                <Col>
                
                    <ButtonGroup>
                        <Button>Domicilio</Button>
                        <Button>Retiro en Local</Button>

                        <DropdownButton as={ButtonGroup} title="Metodo Pago" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1">Pago Efectivo</Dropdown.Item>
                            <Dropdown.Item eventKey="2">MercadoPago</Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
                
                </Col>


            </Row>

            <br></br>
            <br></br>
            <br></br>

            <Row>

               

                <Col>


                    <Button type="button" variant="warning" size="lg">Gestionar Pedido</Button>

                </Col>

            </Row>


            </Form>    

            </Alert>

            </div>

        </Fragment>

    )



}

export default MetodoPago;

