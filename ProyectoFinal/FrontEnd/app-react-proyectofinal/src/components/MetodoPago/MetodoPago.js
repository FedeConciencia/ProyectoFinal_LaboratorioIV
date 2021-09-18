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

//Permite crear un random de numero hex, dec, etc
var crypto = require("crypto");


const MetodoPago = (props) => {


    //Usamos el useForm para la validacion del formulario:

    const {register, formState: { errors }, handleSubmit} = useForm();

    //Estado Hook para almacenar el idCliente:
    const [datoId, setDatoId] = useState("");

    //Estado Hook para almacenar el idDomicilio:
    const [datoIdDomicilio, setDatoIdDomicilio] = useState("");

    //Estado Hook para almacenar la cantidad cocinero:
    const [cantidadCocinero, setCantidadCocinero] = useState(0);

    //Estado Hook para almacenar artManuf en la Cocina:
    const [artManfCocinaTiempo, setArtManfCocinaTiempo] = useState(0);

    //Estado Hook para almacena el calculo final del tiempo del pedido:
    const [tiempo, setTiempo] = useState(0);

    //Creo el estado de la variable modalCarrito:
    const [modalPedido, setModalPedido] = useState();

    //Estado Hook para los componentes botones y select:
    const [datos, setDatos] = useState({

        boton1: false,
        boton2: false,
        selectPago: '',

    })


    useEffect(() => {

        //Se ejecuta el metodo obtener idCliente al cargar la pagina:
        getIdCliente();

        //Se ejecuta una esperda de 5 segundos:
        const timerDom = setTimeout(() => {

            //La espera permite que guarde los datos ya insertado:
            getIdDomicilio();
            
        }, 5000);

        //Se llama metodo que obtiene la cantidad de cocineros consulta servidor:
        artCocinaTiempo();

        //Se llama metodo que obtiene la sumatoria de tiempo de art en cocina:
        obtenerCocineros();
    
    },[datoId, tiempo, datoIdDomicilio, datos, cantidadCocinero, artManfCocinaTiempo, modalPedido]) //Importante pasar los estados de hooks al useEffect



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

            //Se llama metodo que gestiona el calculo final tiempo del pedido:
            calculoFinalTiempoPedido();

            const timerDom = setTimeout(() => {

                 //Se ejecuta Metodo para guardar el pedido
                 getDatos();
                
            }, 3000);

            

           
            
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

                //Guardo la respuesta en el hooks:
                setDatoIdDomicilio(response.data);

                console.log("DATOIDDOMICILIO =>", datoIdDomicilio)
                
        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })


        }    

        //Metodo que obtiene el idCliente a traves del mail buscando en la entidad cliente:
        const getIdCliente = () => {

            //Obtenemos el email desde el usuario en localStorage:
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

                //Guardo la respuesta en el hooks:
                setDatoId(response.data);

                console.log("DATOID =>", datoId)
                
        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })


        }    


        //Metodo que permite crear un Password Hexadecimal de 14 bytes Hexadecimal:
        const passwordCodigo = () => {

            
            var id = crypto.randomBytes(7).toString('hex');

            console.log("CODIGO PEDIDO => ", id)

            return id

        }

        

        //Metodo para ejecutar con el evento onSubmit:

        const getDatos = () => {


            //Guardo el codigo generado Random:
            let codigo = passwordCodigo();

            //Guardo el total del carrito guardado en el localStorage:
            let total = JSON.parse(localStorage.getItem("totalCarrito"));
         
            console.log("FORMA DE PAGO FINAL =>", datos.selectPago)

            //Si se selecciona el boton retiro en local 10% descuento:
            if(datos.boton2 === true){

                total = total * 0.90;

            }



            axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {

        
                    action:'insertar',
                    codigo: codigo, 
                    horaEstimadaFin: "00:00:00",
                    estadoPedido:"0",
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

            
            const timerDom = setTimeout(() => {

                guardarDetallePedido();
                //Ejecuto el modal de aviso Pedido;
                modalPedidos(); 
                
            }, 7000);
        
        
        }

        //Metodo para insertar detalle pedido:
        const insertarDetallePedido = (articulo) => {


            axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetallePedidoServlet", {
                params: {

        
                    action:'insertar',
                    cantidad: articulo.cantidad, 
                    subTotal: articulo.subTotal,
                    idPedido: articulo.idPedido,
                    idArticuloManufacturado: articulo.idArticulo,
        
        
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


        const guardarDetallePedido = () => {

            //Obtengo todos los articulos manufacturados del localStorage:
            let array = JSON.parse(localStorage.getItem("productos"));

            let ultimoId = 0;

            //Obtengo el ultimo idPedido, que se cargo:

            axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {

        
                    action:'buscarUltimoId',
        
        
                }
              })
            .then(response => {
        
                console.log(JSON.stringify(response))

                console.log("VALOR ID DATA =>", response.data)
                
                //Guardo el ultimo idPedido:
                ultimoId = response.data;

                console.log("VALOR ULTIMOID =>", ultimoId)

                //Obtengo los datos de cada articuloManufacturado y lo guardo en un objeto:
                for(let i = 0; i < array.length; i++){

                    let articulo = {
    
                        cantidad: array[i].cantidad,
                        subTotal: array[i].cantidad * array[i].precioVenta,
                        idPedido: ultimoId,
                        idArticulo: array[i].idArticulo,
    
                    }
    
                    //Inserto el objeto en articuloDetallePedido:
                    insertarDetallePedido(articulo);
    
                }
                
        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })

            console.log("VALOR ULTIMOID GUARDAR =>", ultimoId)
            

            

        }

        //Metodo Calcular Sumatoria Articulos Carrito:

        const calcularTiempoArtCarrito = () => {

            //Obtengo todos los articulos manufacturados del localStorage:
            let array = JSON.parse(localStorage.getItem("productos"));

            let tiempoTotalCarrito = 0;

            //Obtengo la sumatoria total de tiempo productos carrito:
            for(let i = 0; i < array.length; i++){

                
                tiempoTotalCarrito += array[i].tiempoEstimado * array[i].cantidad;


            }

            console.log("TIEMPO TOTAL CARRITO => ", tiempoTotalCarrito);

            return tiempoTotalCarrito;


        }


        //Obtener cantidad de cocineros:

        const obtenerCocineros = () => {

            let cocineros = 0;

            axios.get("http://localhost:8080/ProyectoFinalLaboIV/ConfiguracionServlet", {
                params: {

                    action:'buscar',
                    idConfiguracion:"1",
        
        
                }
              })
            .then(response => {
        
                console.log(JSON.stringify(response))

                //Guardo la cantidad de cocineros:
                let config = response.data;
                cocineros = config.cantidadCocineros;

                console.log("CANTIDAD COCINEROS => ", cocineros)

                //Seteo el estado de hook:
                setCantidadCocinero(cocineros);
                
        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })

            


        }

        //Metodo para obtener la sumatoria del tiempo de articulos en la cocina:

        const artCocinaTiempo = () => {

            let array = new Array();
            let sumatoriaTiempo = 0;


            axios.get("http://localhost:8080/ProyectoFinalLaboIV/AuxDatoPedidoServlet", {
                params: {

                    action:'listar',
                
        
                }
              })
            .then(response => {
        
                console.log(JSON.stringify(response))

                //Guardo el array de datos:
                array = response.data;
                
                //Obtengo la sumatoria total de tiempo productos carrito:
                 for(let i = 0; i < array.length; i++){

                
                    sumatoriaTiempo += array[i].tiempoEstimado * array[i].cantidad;


                }

                console.log("SUMATORIA TIEMPO => ", sumatoriaTiempo)

                //Seteo el Hooks:
                setArtManfCocinaTiempo(sumatoriaTiempo);
                
        
            })
            .catch(error =>{
                console.log("Error");
                console.log(error);
            })

        }

        //Metodo Final Para calcular tiempo de preparacion Pedido:
        const calculoFinalTiempoPedido = () => {

            let totalCarrito = localStorage.getItem("totalCarrito");

            let tipoEnvio = "Retiro en Local";

            let sumatoriaFinal = 0;

            let tiempoArt = calcularTiempoArtCarrito();
                
            console.log("TIEMPO ART CARRITO => ", tiempoArt);

            console.log("TIEMPO ART COCINA => ", artManfCocinaTiempo);

            console.log("CANTIDAD DE COCINEROS => ", cantidadCocinero);

            sumatoriaFinal = tiempoArt + (artManfCocinaTiempo / cantidadCocinero);

            console.log("SUMATORIA FINAL SIN ENVIO DOMICILIO => ", sumatoriaFinal)

            //Si se selecciona el boton domicilio +10 minutos :
            if(datos.boton1 === true){

                sumatoriaFinal += 10;
                

            }

            //Guardo la respuesta en el hooks:
            setTiempo(sumatoriaFinal);

            
            console.log("TIEMPO FINAL CON ENVIO A DOMICILIO +10 M => ", sumatoriaFinal)


            
         
        }   

    
        //Guardo en una constante el componente modalPedido y paso el props:
        const modalPedidos = () => {

                let totalCarrito = localStorage.getItem("totalCarrito");

                let tipoEnvio = "Retiro en Local";

                //Si se selecciona el boton domicilio +10 minutos :
                if(datos.boton1 === true){

                    tipoEnvio = "Delivery Domicilio";

                }
                
                const modal = () => {
                    
                    return (
                    
                        //Al componente ModalPedido le asigamos propiedades que luego son accedidas por el componente para mostrar.
                    <ModalPedido
                        pedido = { true }
                        tiempo = { tiempo }
                        total = {totalCarrito }
                        tipoEnvio =  { tipoEnvio }
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
            return `${h}:${m}:"00"`;
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

            <Form onSubmit={handleSubmit(enviarDatos)}>

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

