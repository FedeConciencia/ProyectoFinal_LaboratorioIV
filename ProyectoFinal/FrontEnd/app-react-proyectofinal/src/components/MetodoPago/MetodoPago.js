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
import ModalPedido from "./ModalPedido.js";
import { useHistory } from 'react-router-dom';


var crypto = require("crypto");

const MetodoPago = (props) => {

   
    let history = useHistory();

   
    const {register, formState: { errors }, handleSubmit} = useForm();

    //Variables Globales =>
    let datoId  = "";
    let datoIdDomicilio = "";
    let cantidadCocinero = 0;
    let artManfCocinaTiempo = 0;
    let codigoPedido = "";


    const [datos, setDatos] = useState({

        boton1: false,
        boton2: false,
        selectPago: '',

    })


     const [modalPedido, setModalPedido] = useState();


    useEffect(() => {

        metodoUseEffect();
    
    },[datos, modalPedido]) 

    

    const metodoUseEffect = async () => {

        await getIdCliente();

        await getIdDomicilio();

        await artCocinaTiempo();

        await obtenerCocineros();

    }


    const handleInputChange = (event) => {

        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })

    }

  
    const enviarDatos = async (event) => {


        console.log("DATOS SELECT PAGO MERCADOPAGO =>", datos.selectPago)

        if(datos.selectPago === "2"){

           
            await getDatos();

            //Redireccion Proceso Mercado Pago =>
            await history.push('/auxMercadoPago');


        }else{
            
            //Pago es en Efectivo
            await getDatos();
                
            await modalPedidos();
           
        }    
            
    }

    //Metodo Axios Async-Await que obtiene el idDomicilio a traves del idCliente buscando en la entidad cliente:
    const getIdDomicilio = async () => {


        console.log("GETDOMICILIO IDCLIENTE =>", datoId);

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
                params: {
        
                    action:'idDomicilioXidCliente',
                    idCliente: datoId,
                    
        
                }
            })

            const resJson = await response.data;

            datoIdDomicilio = resJson;

            console.log("ID DOMICILIO =>", datoIdDomicilio)


        }catch(error){

            console.log(error)

        }        
    
    }    

    //Metodo Axios Async-Await que obtiene el idCliente a traves del mail buscando en la entidad cliente:
    const getIdCliente = async () => {

        //Obtenemos el email desde el usuario en localStorage, tener en cuenta el valor en localStorage:
        let email = await JSON.parse(localStorage.getItem("usuario")).usuario;

        console.log(email);
        
        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ClienteServlet", {
                params: {

                    action:'idxEmail',
                    email: email,
                    

                }
            })

            const resJson = await response.data;

            datoId = resJson;

            console.log("DATO IDCLIENTE =>", datoId)

        }catch(error){

            console.log(error)

        }    
        
    }    


    //Metodo que permite crear un Password Hexadecimal de 14 bytes Hexadecimal:
    const passwordCodigo = () => {

        
        var id = crypto.randomBytes(7).toString('hex');

        console.log("CODIGO PEDIDO => ", id)

        return id

    }

        

    //Metodo para ejecutar con el evento onSubmit:
    const getDatos = async () => {

        
        let time = await calculoFinalTiempoPedido();

        localStorage.setItem("tiempoEstimado", JSON.stringify(await time));

        let tipoEnvio = 1;

        codigoPedido = passwordCodigo();

        
        let total = await JSON.parse(localStorage.getItem("totalCarrito"));
        
        console.log("FORMA DE PAGO FINAL =>", datos.selectPago)

        //Si se selecciona el boton retiro en local 10% descuento:
        if(datos.boton2 === true){

            total = total * 0.90;
            tipoEnvio = 2;

        }

        localStorage.setItem("tipoEnvio", JSON.stringify(await tipoEnvio));

        localStorage.setItem("totalCarritoFinal", JSON.stringify(total));
        
        localStorage.setItem("codigoPedido", JSON.stringify(codigoPedido));

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {

        
                    action:'insertar',
                    codigo: codigoPedido, 
                    horaEstimadaFin: time,
                    estadoPedido:"0",
                    tipoEnvio: tipoEnvio,
                    total: total,
                    idCliente: datoId,
                    idDomicilio: datoIdDomicilio,
                    fechaAlta: moment().format('YYYY-MM-DD'), 
                    fechaBaja: moment("1900-01-01").format('YYYY-MM-DD'), 
                    estado: "activo"
        
        
                }
            })

            console.log(response.data)

        }catch(error){

            console.log(error)

        }    
        

        await guardarDetallePedido();

    }


    //Metodo para insertar detalle pedido:
    const insertarDetallePedido = async (articulo) => {

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetallePedidoServlet", {
                params: {

        
                    action:'insertar',
                    cantidad: articulo.cantidad, 
                    subTotal: articulo.subTotal,
                    idPedido: articulo.idPedido,
                    idArticuloManufacturado: articulo.idArticulo,
        
        
                }
            })

            console.log(response.data)     

        }catch(error){

            console.log(error)

        }        
            
    }


    const guardarDetallePedido = async () => {

        //Obtengo todos los articulos manufacturados del localStorage:
        let array = await JSON.parse(localStorage.getItem("productos"));

        let ultimoId = 0;

        try{

            //Obtengo el ultimo idPedido, que se cargo:
            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {

        
                    action:'buscarUltimoId',
        
        
                }
            })

            const resJson = response.data;

            ultimoId = resJson;

            console.log("VALOR ULTIMOID =>", ultimoId)

        }catch(error){

            console.log(error)
        }        
        

        //Obtengo los datos de cada articuloManufacturado y lo guardo en un objeto:
        for(let i = 0; i < array.length; i++){

            let articulo = {

                cantidad: array[i].cantidad,
                subTotal: array[i].cantidad * array[i].precioVenta,
                idPedido: ultimoId,
                idArticulo: array[i].idArticulo,

            }

            //Inserto el objeto en articuloDetallePedido:
            await insertarDetallePedido(articulo);

        }
             

    }


    //Metodo Calcular Sumatoria Articulos Carrito:
    const calcularTiempoArtCarrito = async () => {

        
        let array = await JSON.parse(localStorage.getItem("productos"));

        let tiempoTotalCarrito = 0;

        
        for(let i = 0; i < array.length; i++){

            
            tiempoTotalCarrito += array[i].tiempoEstimado * array[i].cantidad;


        }

        console.log("TIEMPO TOTAL CARRITO => ", tiempoTotalCarrito);

        return tiempoTotalCarrito;


    }


    //Obtener cantidad de cocineros:
    const obtenerCocineros = async () => {

        let cocineros = 0;

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/ConfiguracionServlet", {
                params: {

                    action:'buscar',
                    idConfiguracion:"1",


                }
            })

            const resJson = response.data;

            cocineros = resJson.cantidadCocineros;

            cantidadCocinero = cocineros;

            console.log("CANTIDAD COCINEROS => ", cantidadCocinero)

        }catch(error){

            console.log(error)

        }    
        

    }

    //Metodo para obtener la sumatoria del tiempo de articulos en la cocina:
    const artCocinaTiempo = async () => {

        let array = new Array();

        let sumatoriaTiempo = 0;

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxDatoPedidoServlet", {
                params: {

                    action:'listar',
                
        
                }
            })

            const resJson = response.data;

            array = resJson;

            //Obtengo la sumatoria total de tiempo productos carrito:
            for(let i = 0; i < array.length; i++){

            
                sumatoriaTiempo += array[i].tiempoEstimado * array[i].cantidad;


            }

            artManfCocinaTiempo = sumatoriaTiempo;

            console.log("SUMATORIA TIEMPO => ", sumatoriaTiempo)

        
        }catch(error){

            console.log(error)
        }    
        
    }

    //Metodo Final Para calcular tiempo de preparacion Pedido:
    const calculoFinalTiempoPedido = async () => {

        let totalCarrito = await localStorage.getItem("totalCarrito");

        let tipoEnvio = "Retiro en Local";

        let sumatoriaFinal = 0;

        let tiempoArt = await calcularTiempoArtCarrito();
            
        console.log("TIEMPO ART CARRITO => ", tiempoArt);

        console.log("TIEMPO ART COCINA => ", artManfCocinaTiempo);

        console.log("CANTIDAD DE COCINEROS => ", cantidadCocinero);

        sumatoriaFinal = tiempoArt + Math.round(artManfCocinaTiempo / cantidadCocinero);

        console.log("SUMATORIA FINAL SIN ENVIO DOMICILIO => ", sumatoriaFinal)

        //Si se selecciona el boton domicilio +10 minutos :
        if(datos.boton1 === true){

            sumatoriaFinal += 10;
            

        }

        console.log("TIEMPO FINAL CON ENVIO A DOMICILIO +10 M => ", sumatoriaFinal)

        let time = await convertMinutos(sumatoriaFinal);

        console.log("VARIABLE TIME => ", time)

        return time;
        
    }   

    
    //Guardo en una constante el componente modalPedido y paso el props:
    const modalPedidos = async () => {

        
        let totalFinal = await JSON.parse(localStorage.getItem("totalCarritoFinal"));

        let time = await JSON.parse(localStorage.getItem("tiempoEstimado"));

        let tipoEnvio = "Retiro en Local";

        let formaPago = ""

        //Si se selecciona el boton domicilio +10 minutos :
        if(datos.boton1 === true){

            tipoEnvio = "Delivery Domicilio";

        }

        if(datos.selectPago === "1"){

            formaPago = "Pago Efectivo";

        }else if(datos.selectPago === "2"){

            formaPago = "MercadoPago";
        }
        
        const modal = () => {
            
            return (
            
                //Al componente ModalPedido le asigamos propiedades que luego son accedidas por el componente para mostrar.
            <ModalPedido
                pedido = { true }
                tiempo = { time }
                idCliente = { datoId }
                codigoPedido = { codigoPedido }
                total = { totalFinal }
                tipoEnvio =  { tipoEnvio }
                formaPago = { formaPago }
            ></ModalPedido>

            );
        }    
        
        setModalPedido(modal);  

    }

        

    //Funcion para convertir minutos en horas y minutos:
    function convertMinutos(mins) {

        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h}:${m}:00`;

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

            { modalPedido }

            <div>

            <br></br>
            

            <Alert variant="success" className="bodyDetalle"> 

            <Form  onSubmit={handleSubmit(enviarDatos)}>

            <br></br>
            <br></br>

            <Alert.Heading className="titulo">CONFIRMACION DE METODO PAGO</Alert.Heading>
            
           
            <br></br>
            <br></br>

            <Row>

            <h4>Los retiros en local aplican un 10% de descuento sobre el total del pedido.</h4>

            </Row>    

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

