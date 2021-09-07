import React, { useState, Fragment, useContext, useEffect } from "react";
import {useHistory} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/detallePlato.css';
import moment from 'moment';
import { ContextoUsuario } from "../ContextoUsuario";
import ModalPopUp from "./ModalPopUp";
import ModalFaltante from "./ModalFaltante.js";
import ModalHorario from "./ModalHorario.js"
import ModalCarrito from "./ModalCarrito.js";
import PlatoAux from "../Carrito/PlatoAux";



const DetallePlato = (props) => {

    const {usuario} = useContext(ContextoUsuario);

    const [modalPopUp, setModalPopUp] = useState(false);

    //Creo el estado de la variable modalFaltante:
    const [modalFaltante, setModalFaltante] = useState();

    //Creo el estado de la variable modalHorario:
    const [modalHorario, setModalHorario] = useState();

    //Creo el estado de la variable modalCarrito:
    const [modalCarrito, setModalCarrito] = useState();

    const [datos, setDatos] = useState([])

    const [ingredientes, setIngredientes] = useState([])

    useEffect(() => {
        console.log("modalPopUp: ", modalPopUp)
        console.log("modalFaltante: ", modalFaltante)
        console.log("modalHorario: ", modalHorario)
        console.log("modalCarrito: ", modalCarrito)
        setModalPopUp(usuario === null)
    }, [modalCarrito, modalHorario, modalFaltante, modalPopUp, usuario])

    //Redireccion de la Pagina:
    let history = useHistory();


   //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
   //los corchetes permite que nuestro userEffect se ejecute una sola vez
   useEffect(() => {

        //Se ejecuta el metodo obtener One al cargar la pagina
        getDatos();
        
        
    }, [])


    //Metodo Obtener los datos al Cargar la Pagina:

    const getDatos = async () => {


        try{

            const id = props.match.params.id;  
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet?action=listar");
            const resJson = await response.json();
            

            //Function Filter() obtenemos el objeto del .Json, devuelve array de un elemento:
            //Se pudo tambien haber pasado el id obtendido a link del servletArtManufacturado buscarOne:
            const encontrado = await resJson.filter(plato => (plato.idArticulo).toString() === (id).toString());

            const plato = await encontrado[0];

            //Guardamos el dato encontrado array un solo elemento, en la variable de estado:
            setDatos(plato);

            let array = new Array();
            if(localStorage.getItem("productos") === null || localStorage.getItem("productos") === "[]"){
                console.log("Array nulo")
                let nuevoPlato = new PlatoAux(plato)
                console.log("nuevoPlato: ", nuevoPlato)
                array.push(nuevoPlato)
            }
            else{
                console.log("Array con contenido")
                console.log(JSON.parse(localStorage.getItem("productos")))
                array = JSON.parse(localStorage.getItem("productos"));

                let validar = true;
                for(let i=0; i<array.length; i++){
                    if(array[i].idArticulo === plato.idArticulo){
                        array[i].cantidad = array[i].cantidad + 1;
                        console.log("nuevoPlato: ", array[i])
                        validar = false;
                        break;
                    }
                }
                if(validar) {
                    let nuevoPlato = new PlatoAux(plato)
                    array.push(nuevoPlato)
                }
            }

            // Guardamos en memoria local
            localStorage.setItem("productos", JSON.stringify(array));

            alert(JSON.stringify(datos));

            
            const responseIngre = await fetch("http://localhost:8080/ProyectoFinalLaboIV/AuxIngredientesServlet?action=listar&idArticulo="+id); 
            const resJsonIngre = await responseIngre.json();

            //Paso los datos obtenidos de la consulta INNER JOIN a la BD:
            setIngredientes(resJsonIngre);

            


        }catch(error){

            console.log("Error: " + error);
  
        }

    }


    
     //Verificamos la Existencia de los datos obtenidos en la variable de estado:
     if(Object.keys(datos).length === 0 && Object.keys(ingredientes).length === 0){
         return ("");
     }


     

     //Obtengo los ingredientes almacenados en la variable de estado:
    const ingred = ingredientes.map((ingrediente, i)=>{return (
    <li key={i}>{ ingrediente.denominacionArtInsumo } / {ingrediente.cantidad} / {ingrediente.unidadMedida}</li>
    )})


    //Metodo que verifica el estock de los insumos que componen el artManufacturado:
    const verificarStock = () => {

        let validar = false;

        for(let i = 0; i < ingredientes.length; i++){


            if(ingredientes[i].stockActual < ingredientes[i].cantidad){

                console.log("INGRESO=> ");

                //Variable que valida, si la validacion es faltante de stock devuelve true para pasar al modal y activar const show:
                validar = true;

            }

        }

        console.log("VARIABLE VALIDAR VALOR => " + validar);
        return validar;

    }


    //Metodo que verifica que el horario Local y dia correspondan a los horarios del local:
    const verificarHorario = () => {

        //Recibimos el dia Actual por moment():
        // let diaActual = moment().format('dddd');
        //let horarioActual = moment().format('hh:mm');

        //Variable que valida, si la validacion es fuera de horario devuelve true para pasar al modal y activar const show:
        let validar = true;

        //Ingresos de Testeo Manual de dia y horario:
        let diaActual = "monday";
        
        
        //Obtengo el horario actual a traves de moment() y lo paso a Date para comparar:
        let recibTime = new Date();
        // recibTime.setHours(moment().format('hh'),moment().format('mm'),0);
        recibTime.setHours(12,0,0);
        
        //Obtenemos los horarios correctos de la semana Lunes a Viernes:
        let starTimeWeek = new Date();
        starTimeWeek.setHours(12,0,0); 
        let endTimeWeek = new Date();
        endTimeWeek.setHours(20,0,0); 

        //Obtenemos los horarios correctos de la semana Sabados a Domingos:
        let starTimeWeekend = new Date();
        starTimeWeekend.setHours(11,0,0); 
        let endTimeWeekend = new Date();
        endTimeWeekend.setHours(15,0,0); 
        
        console.log(diaActual);
        //console.log(horarioActual);
        console.log(recibTime);
        
        if(diaActual === "monday" || diaActual === "tuesday" || diaActual === "wednesday" || diaActual === "thursday" || diaActual === "Friday"){

            console.log("INGRESO VALIDAR DIA WEEK");

            if((starTimeWeek <= recibTime) && (recibTime <= endTimeWeek)){

                console.log("INGRESO VALIDAR HORA WEEK");

                validar = false;

                console.log(validar);


            }


        }else if(diaActual === "saturday" || diaActual === "sunday"){

            console.log("INGRESO VALIDAR DIA WEEKEND");

            if((starTimeWeek <= recibTime) && (recibTime <= endTimeWeek)){

                console.log("INGRESO VALIDAR HORA WEEKEND");

                validar = false;

                console.log(validar);

            }



        }

        
        return validar;

    }


    //Metodo que se ejecuta con el evento OnClick Boton carrito:
    const handleEvents = () => {

        console.log(usuario === null)

        //Guardo en la variable el valor devuelto true/false por el metodo:
        let validarStock = verificarStock();

        //Guardo en la variable el valor devuelto true/false por el metodo:
        let validarHorario = verificarHorario();

        console.log("VARIABLE VALIDAR STOCK HANDLE => " + validarStock);
        console.log("VARIABLE VALIDAR HORARIO HANDLE => " + validarHorario);


        //Condicional si el usuario logueado, validarStock es false (sin faltante), validarHorario es false (dentro de Horario):
        if(usuario !== null && validarStock === false && validarHorario === false){

            //Guardo en una constante el componente modalCarrito y paso el props:
            const modalCar = () => {
                return (
                  
                    //Al componente ModalFaltante le asigamos propiedades que luego son accedidas por el componente para mostrar.
                  <ModalCarrito
                    compra={true}
                  ></ModalCarrito>

                );
              }

            //Guardo la constante en el estado:  
            setModalCarrito(modalCar);  
            
       
        //Condicional si el usuario logueado, validarStock es false (sin faltante), validarHorario es true (fuera de Horario):
        }else if(usuario !== null && validarHorario === true){


            //Guardo en una constante el componente modalHorario y paso el props:
            const modalHor = () => {
                return (
                  
                    //Al componente ModalFaltante le asigamos propiedades que luego son accedidas por el componente para mostrar.
                  <ModalHorario
                    horario={validarHorario}
                  ></ModalHorario>
                );
              }

            //Guardo la constante en el estado:  
            setModalHorario(modalHor);  

            console.log("VARIABLE VALIDAR MODAL_HORARIO => " + modalHorario);


        //Condicional si el usuario logueado y validar es true (con faltante):
        }else if(usuario !== null && validarStock === true){

            
            //Guardo en una constante el componente modalFaltante y paso el props:
            const modalFal = () => {
                return (
                  
                  //Al componente ModalFaltante le asigamos propiedades que luego son accedidas por el componente para mostrar.
                  <ModalFaltante
                    validar={validarStock}
                  ></ModalFaltante>
                );
              }

            //Guardo la constante en el estado:  
            setModalFaltante(modalFal);  

            console.log("VARIABLE VALIDAR MODAL_FALTANTE => " + modalFaltante);
    
        }
    }


    return (

        <Fragment>

            
            <ModalPopUp usuario={usuario === null} />
            
            { modalFaltante }

            { modalHorario }

            { modalCarrito }
            
            <br></br>

            <span>{ console.log(JSON.stringify(ingredientes)) }</span>

            <Container fluid="sm">

            <Alert variant="success" className="bodyDetalle"> 

            
                <Row>

                    <Col className="columna">
                    
                        <h2 className="titulo">{ (datos.denominacion).toUpperCase() }</h2>
                    
                    
                    </Col>

                    <Col>
                    
                    </Col>

                    <Col>
                    
                    </Col>

                </Row>    

                <Row>

                    <Col className="columna">

                            <br></br>

                                <img className="imagen" src={require(`../../assets/images/${datos.imagen}`).default}></img>

                            <br></br>
                            
                    
                    </Col>

                    <Col className="textoDos">

                        
                             <br></br>

                                <h5>PRODUCTO:</h5>
                                <br></br>
                                <h5>PRECIO:</h5>
                                <br></br>
                                <h5>TIEMPO ESTIMADO:</h5>
                                <br></br>
                                <h5>INGREDIENTES:</h5>
                                
                             <br></br>
                        
                       
                    
                    </Col>


                    <Col className="textoDos" >


                            <br></br>

                            <h5>{ datos.denominacion }</h5>
                            <br></br>
                            <h5>$ { datos.precioVenta }</h5>
                            <br></br>
                            <h5>{ datos.tiempoEstimado } m</h5>
                            <br></br>
                            <h5>{ ingred }</h5>
                            
                            <br></br>



                    </Col>


                </Row>

                <Row>

                    <Col>

                        
                        <br></br>
                        <br></br>
                        <Button type="button" onClick={handleEvents} variant="success" size="lg">AGREGAR CARRITO</Button>&nbsp;&nbsp;
                        <Button type="button" href={`/productos`} variant="danger" size="lg">RETURN</Button>
                        <br></br>
                        <br></br>
                        

                    </Col>

                </Row>

           

            </Alert>

            </Container>
           
        </Fragment>

    );

};

export default DetallePlato;
