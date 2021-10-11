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
import '../../assets/css/productos.css';
import Tarjeta from '../Tarjeta/Tarjeta';
import moment from 'moment';


const Productos = (props) => {


    const [comida, setComida] = useState([])

    const [bebida, setBebida] = useState([])

    const [postre, setPostre] = useState([])


    useEffect(() => {

        
        getDatos();
    

    }, [])


    //Metodo Obtener los datos al Cargar la Pagina:
    const getDatos = async () => {


        try{

            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet?action=listar");
            const resJson = await response.json();


            const comida = resJson.filter(comida => (comida.idRubro).toString() === "1");
            const bebida = resJson.filter(bebida => (bebida.idRubro).toString() === "2");
            const postre = resJson.filter(postre => (postre.idRubro).toString() === "3");
      
    
            setComida(comida);
            setBebida(bebida);
            setPostre(postre);



        }catch(error){

            console.log("Error: " + error);
  
        }

    }



    //Guardamos en la variable comidas los datos almacenados en el estado (state) comida:
    const comidas = comida.map((plato, i) => {
        return (

        <Tarjeta
            key={plato.idArticulo}
            idArticulo={plato.idArticulo}
            denominacion={plato.denominacion}
            precioVenta={plato.precioVenta}
            imagen={plato.imagen}
        ></Tarjeta>

        );
    });


    //Guardamos en la variable bebidas los datos almacenados en el estado (state) bebida:
    const bebidas = bebida.map((plato, i) => {
        return (
        
        <Tarjeta
            key={plato.idArticulo}
            idArticulo={plato.idArticulo}
            denominacion={plato.denominacion}
            precioVenta={plato.precioVenta}
            imagen={plato.imagen}
        ></Tarjeta>

        );
    });

    //Guardamos en la variable postres los datos almacenados en el estado (state) postre:
    const postres = postre.map((plato, i) => {
        return (
        
        <Tarjeta
            key={plato.idArticulo}
            idArticulo={plato.idArticulo}
            denominacion={plato.denominacion}
            precioVenta={plato.precioVenta}
            imagen={plato.imagen}
        ></Tarjeta>
        
        );
    });



        return (

            <Fragment>

            <Container fluid="md" className="content">
            <br></br>
            <Alert variant="success" className="bodyProductos"> 

            <br></br>
            <br></br>

            <h2 className="titulo1">NUESTROS PRODUCTOS</h2>

            <br></br>
            <br></br>


            <h3 className="titulo1">COMIDAS</h3>

        
           
            <br></br>
            <br></br>   

            <Row className="target">
                {comidas}
            </Row>

            <br></br>
            <br></br>   
              

            <h3 className="titulo1">BEBIDAS</h3>

        
           
            <br></br>
            <br></br>     
            <Row className="target">
                {bebidas}
            </Row>

            <br></br>
            <br></br>   
              

            <h3 className="titulo1">POSTRES</h3>

        
           
            <br></br>
            <br></br>     
            <Row className="target">
                {postres}
            </Row>

            <br></br>
            <br></br>   
              


            </Alert>
            </Container>
            </Fragment>



        );

        
    

};

export default Productos;