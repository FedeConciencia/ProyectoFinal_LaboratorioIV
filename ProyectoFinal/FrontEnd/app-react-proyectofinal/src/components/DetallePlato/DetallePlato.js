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

const DetallePlato = (props) => {

    const {usuario} = useContext(ContextoUsuario);

    const [modalPopUp, setModalPopUp] = useState(false);

    const [datos, setDatos] = useState([])

    const [ingredientes, setIngredientes] = useState([])

    useEffect(() => {
        console.log("modalPopUp: ", modalPopUp)
        setModalPopUp(usuario === null)
    }, [modalPopUp, usuario])

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

    const handleModalPopUp = () => {
        console.log(usuario === null)
        if(usuario !== null){
            alert("Producto agregado a carrito!!")
            window.location.href = "/productos"
        }
    }


    return (

        <Fragment>

            
            <ModalPopUp usuario={usuario === null} />
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
                        <Button type="button" onClick={handleModalPopUp} variant="success" size="lg">AGREGAR CARRITO</Button>&nbsp;&nbsp;
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
