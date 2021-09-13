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
import axios from "axios";
import moment from 'moment';


const MetodoPago = (props) => {


    //Usamos el useForm para la validacion del formulario:

    const {register, formState: { errors }, handleSubmit} = useForm()


    const [datos, setDatos] = useState({

        boton1: false,
        boton2: false,
        selectPago: '',

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

                
            alert(JSON.stringify(datos));

            getDatos();

            //Limpio todos los input
            event.target.reset();

            
        }

        //Metodo para ejecutar con el evento onSubmit:

        const getDatos = (datos) => {

            let array = new Array();
            array = JSON.parse(localStorage.getItem("productos"));

            axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {
        
                    action:'insertar',
                    codigo: datos.codigo,
                    horaEstimadaFin: datos.horaEstimadaFin,
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

        //Metodo para ejecutar el evento onclik boton1:

        const eventoUno = (datos) => {

            const set = {

                boton1:true,
                boton2:false,

            }

            setDatos(set)
            console.log("boton1 =>", datos.boton1)
            console.log("boton2 =>", datos.boton2)

        }

        //Metodo para ejecutar el evento onclik boton2:

        const eventoDos = (datos) => {

            const set = {

                boton1:false,
                boton2:true,

            }

            setDatos(set)
            console.log("boton1 =>", datos.boton1)
            console.log("boton2 =>", datos.boton2)

        }


    return (

        <Fragment>

            <div>

            <br></br>
            

            <Alert variant="success" className="bodyDetalle"> 

            <Form onSubmit={handleSubmit(enviarDatos)}>

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
                        <Button name="boton1" onClick={eventoUno} onChange={handleInputChange}>Domicilio</Button>
                        <Button name="boton2" onClick={eventoDos} onChange={handleInputChange}>Retiro en Local</Button>

                        {datos.boton2 === true &&  datos.boton1 === false ?

                        <DropdownButton as={ButtonGroup} title="Metodo Pago" id="bg-nested-dropdown" name="selectPago" onChange={handleInputChange}>
                            <Dropdown.Item eventKey="1" value="PagoEfectivo">Pago Efectivo</Dropdown.Item>
                            <Dropdown.Item eventKey="2" value="MercadoPago">MercadoPago</Dropdown.Item>
                        </DropdownButton>

                        : 

                        <DropdownButton as={ButtonGroup} title="Metodo Pago" id="bg-nested-dropdown" name="selectPago" onChange={handleInputChange}>
                        <Dropdown.Item eventKey="2" value="MercadoPago">MercadoPago</Dropdown.Item>
                        </DropdownButton>
                        
                        
                        }

                    </ButtonGroup>
                
                </Col>


            </Row>

            <br></br>
            <br></br>
            <br></br>

            <Row>

               

                <Col>


                    <Button type="submit" variant="warning" size="lg">Gestionar Pedido</Button>

                </Col>

            </Row>


            </Form>    

            </Alert>

            </div>

        </Fragment>

    )



}

export default MetodoPago;

