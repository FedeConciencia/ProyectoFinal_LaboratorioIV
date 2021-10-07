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


//Permite crear un random de numero hex, dec, etc
var crypto = require("crypto");


const MetodoPago = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();

    //Usamos el useForm para la validacion del formulario:

    const {register, formState: { errors }, handleSubmit} = useForm();

    //Variables Globales =>

    let datoId  = "";
    let datoIdDomicilio = "";
    let cantidadCocinero = 0;
    let artManfCocinaTiempo = 0;
    let codigoPedido = "";



    //Estado Hook para los componentes botones y select:
    const [datos, setDatos] = useState({

        boton1: false,
        boton2: false,
        selectPago: '',

    })

     //Creo el estado de la variable modalCarrito:
     const [modalPedido, setModalPedido] = useState();


    useEffect(() => {

        metodoUseEffect();
    
    },[datos, modalPedido]) //Importante pasar los estados de hooks al useEffect

    //Creamos un metodo async-await que se ejecuta dentro del useEffect =>

    const metodoUseEffect = async () => {

        await getIdCliente();

        await getIdDomicilio();

        await artCocinaTiempo();

        await obtenerCocineros();

    }


     //Metodo que se ejecuta en los input onChange, permite detectar el ingreso de datos:
    const handleInputChange = (event) => {

        setDatos({

            ...datos,
            [event.target.name] : event.target.value

        })

    }

    //Metodo que se ejecuta en el evento onSubmit desde el formulario:
    const enviarDatos = async (event) => {


        console.log("DATOS SELECT PAGO MERCADOPAGO =>", datos.selectPago)

        if(datos.selectPago === "2"){

            //Cargar Pedido =>
            await getDatos();

            //Redireccionar a la pagina form cliente:
            await history.push('/auxMercadoPago');

            /*

            //Cargar Pedido =>
            await getDatos();

            let precio = JSON.parse(localStorage.getItem("totalCarritoFinal"));
            let codigo = JSON.parse(localStorage.getItem("codigoPedido"));
            let respuestaMercado = {"precio":precio, "codigo":codigo}

            console.log("INGRESO A MERCADOPAGO")

            try{

                const response = await axios.post("http://localhost:8080/ProyectoFinalLaboIV/AuxMercadoPagoServlet", respuestaMercado) 
    
                const resJson = await response.data;

                console.log("RESPUESTA MERCADO PAGO =>", resJson)
    
    
            }catch(error){
    
                console.log(error)
    
            }        

            */

        }else{
            
            alert(JSON.stringify(datos));

            //Se ejecuta Metodo para guardar el pedido
            await getDatos();
                
           
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

        //Llamo al metodo que obtiene el tiempoFinal:
        let time = await calculoFinalTiempoPedido();

        let tipoEnvio = 1;

        //Guardo el codigo generado Random:
        codigoPedido = passwordCodigo();

        //Guardo el total del carrito guardado en el localStorage:
        let total = await JSON.parse(localStorage.getItem("totalCarrito"));
        
        console.log("FORMA DE PAGO FINAL =>", datos.selectPago)

        //Si se selecciona el boton retiro en local 10% descuento:
        if(datos.boton2 === true){

            total = total * 0.90;
            tipoEnvio = 2;

        }

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
        
                    //fechaAlta, fechaBaja, estado se crean x defecto:
        
                }
            })

            console.log(response.data)

        }catch(error){

            console.log(error)

        }    
        

        await guardarDetallePedido();

        //Ejecuto el modal de aviso Pedido;
        await modalPedidos(time); 
    
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

            //Guardo el ultimo idPedido:
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

        //Obtengo todos los articulos manufacturados del localStorage:
        let array = await JSON.parse(localStorage.getItem("productos"));

        let tiempoTotalCarrito = 0;

        //Obtengo la sumatoria total de tiempo productos carrito:
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

            //Guardo el array de datos:
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
    const modalPedidos = async (time) => {

        //Guardo el total del carrito guardado en el localStorage:
        let totalFinal = await JSON.parse(localStorage.getItem("totalCarritoFinal"));

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
        

        //Guardo la constante en el estado:  
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

