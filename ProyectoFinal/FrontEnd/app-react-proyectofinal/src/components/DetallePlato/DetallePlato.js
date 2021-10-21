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

    const [modalFaltante, setModalFaltante] = useState();

    const [modalHorario, setModalHorario] = useState();

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

  
    let history = useHistory();


   useEffect(() => {


        getDatos();
        
        
    },[])


    //Metodo Obtener los datos al Cargar la Pagina:
    const getDatos = async () => {


        try{

            const id = props.match.params.id;  
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet?action=listar");
            const resJson = await response.json();
            

            const encontrado = await resJson.filter(plato => (plato.idArticulo).toString() === (id).toString());

            const plato = await encontrado[0];


            setDatos(plato);


            const responseIngre = await fetch("http://localhost:8080/ProyectoFinalLaboIV/AuxIngredientesServlet?action=listar&idArticulo="+id); 
            const resJsonIngre = await responseIngre.json();

            
            setIngredientes(resJsonIngre);



        }catch(error){

            console.log("Error: " + error);
  
        }

    }


    
     if(Object.keys(datos).length === 0 && Object.keys(ingredientes).length === 0){
         return ("");
     }


     
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
                break;

            }

        }

        console.log("VARIABLE VALIDAR VALOR => " + validar);
        return validar;

    }


    //Metodo que verifica que el horario Local y dia correspondan a los horarios del local:
    const verificarHorario = () => {

        
        //let diaActual = moment().format('dddd'); //Activar este para funcionamiento correcto del sistema:
        let diaActual = "monday"; //Desmarcar para Testeo Manual de dia  (Activado para Testeo):

        //Variable que valida, si la validacion es fuera de horario devuelve true para pasar al modal y activar const show:
        let validar = true;
        
        //Obtengo el horario actual a traves de moment() y lo paso a Date para comparar:
        let recibTime = new Date();
        //recibTime.setHours(moment().format('hh'),moment().format('mm'),0);  //Activar para funcionamiento correcto de Horario Comercio.
        recibTime.setHours(12,0,0); //Activar para Testo Manual de Horario  (Activado para Testeo).
         
        
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
        
        let validarStock = verificarStock();

        let validarHorario = verificarHorario();

        console.log("VARIABLE VALIDAR STOCK HANDLE => " + validarStock);
        console.log("VARIABLE VALIDAR HORARIO HANDLE => " + validarHorario);


        //Condicional si el usuario logueado, validarStock es false (sin faltante), validarHorario es false (dentro de Horario):
        if(usuario !== null && validarStock === false && validarHorario === false){

            
            let array = new Array();

            //Si el localStorage productos no existe o esta vacio:
            
            if(localStorage.getItem("productos") === null || localStorage.getItem("productos") === "[]"){
                console.log("Array nulo")
                let nuevoPlato = new PlatoAux(datos)
                console.log("nuevoPlato: ", nuevoPlato)
                array.push(nuevoPlato)
            }
            else{
                //Si el localStorage productos existe y tiene elementos:
                console.log("Array con contenido")
                console.log(JSON.parse(localStorage.getItem("productos")))
                array = JSON.parse(localStorage.getItem("productos"));

                //Variable bandera:
                let validar = true;

                for(let i=0; i<array.length; i++){
                    if(array[i].idArticulo === datos.idArticulo){
                        array[i].cantidad = array[i].cantidad + 1;
                        console.log("nuevoPlato: ", array[i])
                        validar = false;
                        break;
                    }
                }

                //Si validar es true el producto no estaba cargado en el localStorage:
                if(validar) {
                    let nuevoPlato = new PlatoAux(datos)
                    array.push(nuevoPlato)
                }
            }

           
            localStorage.setItem("productos", JSON.stringify(array));

            
            const modalCar = () => {
                return (
                  
                    
                  <ModalCarrito
                    compra={true}
                  ></ModalCarrito>

                );
              }


            setModalCarrito(modalCar);  

       
            //Condicional si el usuario logueado, validarStock es false (sin faltante), validarHorario es true (fuera de Horario):
            }else if(usuario !== null && validarHorario === true){


                const modalHor = () => {
                    return (
                    
                        
                    <ModalHorario
                        horario={validarHorario}
                    ></ModalHorario>
                    );
                }

                
                setModalHorario(modalHor);  

                console.log("VARIABLE VALIDAR MODAL_HORARIO => " + modalHorario);


            //Condicional si el usuario logueado y validar es true (con faltante):
            }else if(usuario !== null && validarStock === true){

                
                
                const modalFal = () => {
                    return (
                    
                    
                    <ModalFaltante
                        validar={validarStock}
                    ></ModalFaltante>
                    );
                }

                
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
