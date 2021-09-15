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

var crypto = require("crypto");


const MetodoPago = (props) => {


    //Usamos el useForm para la validacion del formulario:

    const {register, formState: { errors }, handleSubmit} = useForm()

    const [datoId, setDatoId] = useState()

    const [datoIdDomicilio, setDatoIdDomicilio] = useState()

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

            getIdCliente();

            getIdDomicilio();

            const timerDom = setTimeout(() => {

                //La espera permite que guarde los datos ya insertado:
                getIdDomicilio();
            
            }, 5000);


            const timerDatos = setTimeout(() => {

                //La espera permite que guarde los datos ya insertado:
                getDatos();
            
            }, 5000);

            //Limpio todos los input
            event.target.reset();

            
        }

        const getIdDomicilio = async () => {

            try{

                let id = 72;
                
                const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=idDomicilioXidCliente&idCliente="+id);
                const resJson = await response.json();

                alert(JSON.stringify(resJson));

                setDatoIdDomicilio(JSON.stringify(resJson));

                console.log("ID OBTENIDO =>", datoIdDomicilio)

            }catch(error){

                console.log("Error => ", error);
            }    


        }    

        const getIdCliente = async () => {

            try{

                let email = JSON.parse(localStorage.getItem("usuario")).email;
                

                const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=idxEmail&email="+email);
                const resJson = await response.json();

                alert(JSON.stringify(resJson));

                setDatoId(JSON.stringify(resJson));

                console.log("ID OBTENIDO =>", datoId)

            }catch(error){

                console.log("Error => ", error);
            }    


        }    


        //Metodo que permite crear un Password Hexadecimal de 14 bytes Hexadecimal:
        const passwordGmail = () => {

            
            var id = crypto.randomBytes(7).toString('hex');

            console.log("CODIGO PEDIDO => ", id)

            return id

        }

        

        //Metodo para ejecutar con el evento onSubmit:

        const getDatos = () => {

            let codigo = passwordGmail();
         
            console.log("FORMA DE PAGO FINAL =>", datos.selectPago)

            axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {
        
                    action:'insertar',
                    codigo: codigo, 
                    horaEstimadaFin: "00:00:00",
                    tipoEnvio: datos.selectPago,
                    total: localStorage.getItem("totalCarrito"),
                    idCliente: datoId,
                    idDomicilio: datoIdDomicilio,
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

        const eventoUno = () => {

            
            setDatos({...datos, boton1:true, boton2:false })
            console.log("boton1 =>", datos.boton1)
            console.log("boton2 =>", datos.boton2)
            console.log("selectPago Domicilio =>", datos.selectPago)

        }

        //Metodo para ejecutar el evento onclik boton2:

        const eventoDos = () => {

            setDatos({...datos, boton1:false, boton2:true })
            console.log("boton1 =>", datos.boton1)
            console.log("boton2 =>", datos.boton2)
            console.log("selectPago Local =>", datos.selectPago)

        }

        const obtenerSelectPago = (e) => {

            console.log("Evento  =>", e)
            setDatos({...datos, selectPago: e })
            console.log("selectPago => ", datos.selectPago)

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
                        <Button name="boton1" onClick={eventoUno} >Domicilio</Button>
                        <Button name="boton2" onClick={eventoDos} >Retiro en Local</Button>

                        { datos.boton2 === true &&  datos.boton1 === false ?

                        <DropdownButton  as={ButtonGroup} title="Metodo Pago" id="bg-nested-dropdown" name="selectPago"  onSelect={obtenerSelectPago}>
                            
                            <Dropdown.Item eventKey="1" >Pago Efectivo</Dropdown.Item>
                            <Dropdown.Item eventKey="2" >MercadoPago</Dropdown.Item>

                        </DropdownButton>

                        : 

                        <DropdownButton as={ButtonGroup} title="Metodo Pago" id="bg-nested-dropdown" name="selectPago" onSelect={obtenerSelectPago}>
                        <Dropdown.Item eventKey="2">MercadoPago</Dropdown.Item>
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
