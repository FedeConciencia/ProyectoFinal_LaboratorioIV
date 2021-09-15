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

//Permite crear un random de numero hex, dec, etc
var crypto = require("crypto");


const MetodoPago = (props) => {


    //Usamos el useForm para la validacion del formulario:

    const {register, formState: { errors }, handleSubmit} = useForm()

    //Estado Hook para almacenar el idCliente:
    const [datoId, setDatoId] = useState("")

    //Estado Hook para almacenar el idDomicilio:
    const [datoIdDomicilio, setDatoIdDomicilio] = useState("")

    const [datos, setDatos] = useState({

        boton1: false,
        boton2: false,
        selectPago: '',

    })


    useEffect(() => {

        getIdCliente();

        
        const timerDom = setTimeout(() => {

            //La espera permite que guarde los datos ya insertado:
            getIdDomicilio();
            
        }, 5000);

        
    
    
    },[datoId, datoIdDomicilio, datos])



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


            //La espera permite que guarde los datos ya insertado:
            getDatos();
            
            
        
            
        }

        //Metodo que obtiene el idDomicilio a traves del idCliente buscando en la entidad cliente:
        const getIdDomicilio = async () => {


            console.log("DOMICILIO VALOR DATOID =>", datoId);

            axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
                params: {
        
                    action:'idDomicilioXidCliente',
                    idCliente: datoId,
                   
        
                }
              })
            .then(response => {
        
                console.log(JSON.stringify(response))

                console.log(response.data)

                setDatoIdDomicilio(response.data);

                console.log("DATOIDDOMICILIO =>", datoIdDomicilio)
                
        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })


            /*

            try{

                console.log("EN DOMICILIO VALOR idCliente =>",  datoId);

                let idCliente = "72";
                let id = "";
                
                const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=idDomicilioXidCliente&idCliente="+idCliente);
                const resJson = await response.json();

                console.log("RESPONSE => ", response);

                alert(JSON.stringify(resJson));

                id = JSON.stringify(resJson);

                await setDatoIdDomicilio(id);

                console.log("ID OBTENIDO DOMICILIO =>", datoIdDomicilio)

            }catch(error){

                console.log("Error => ", error);
            }    

            */


        }    

        //Metodo que obtiene el idCliente a traves del mail buscando en la entidad cliente:
        const getIdCliente = () => {

            let email = JSON.parse(localStorage.getItem("usuario")).email;
            

            axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
                params: {
        
                    action:'idxEmail',
                    email: email,
                   
        
                }
              })
            .then(response => {
        
                console.log(JSON.stringify(response))

                console.log(response.data)

                setDatoId(response.data);

                console.log("DATOID =>", datoId)
                
        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })


            

            /*

            try{

                let email = JSON.parse(localStorage.getItem("usuario")).email;
                let id = "";
                

                const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet?action=idxEmail&email="+email);
                const resJson = await response.json();

                console.log("RESPONSE => ", response);

                alert(JSON.stringify(resJson));

                id = JSON.stringify(resJson);

                console.log("VALOR ID  => ", id);

                await setDatoId(id);

                console.log("ID OBTENIDO EN CLIENTE=>", datoId)

            }catch(error){

                console.log("Error => ", error);
            }  
            
            */


        }    


        //Metodo que permite crear un Password Hexadecimal de 14 bytes Hexadecimal:
        const passwordCodigo = () => {

            
            var id = crypto.randomBytes(7).toString('hex');

            console.log("CODIGO PEDIDO => ", id)

            return id

        }

        

        //Metodo para ejecutar con el evento onSubmit:

        const getDatos = () => {

            let codigo = passwordCodigo();

            let total = JSON.parse(localStorage.getItem("totalCarrito"));
         
            console.log("FORMA DE PAGO FINAL =>", datos.selectPago)

            if(datos.boton2 === true){

                total = total * 0.90;

            }



            axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {

        
                    action:'insertar',
                    codigo: codigo, 
                    horaEstimadaFin: "00:00:00",
                    tipoEnvio: datos.selectPago,
                    total: JSON.stringify(total),
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

