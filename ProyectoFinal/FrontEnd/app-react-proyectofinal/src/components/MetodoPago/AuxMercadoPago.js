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


const AuxMercadoPago = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();


    useEffect(() => {

        metodoUseEffect();
    
    },[]) //Importante pasar los estados de hooks al useEffect

    //Creamos un metodo async-await que se ejecuta dentro del useEffect =>

    const metodoUseEffect = async () => {

        await enviarDatos();

    }


    

    //Metodo que se ejecuta en el evento onSubmit desde el formulario:
    const enviarDatos = async (event) => {

            let precio = JSON.parse(localStorage.getItem("totalCarritoFinal"));
            let codigo = JSON.parse(localStorage.getItem("codigoPedido"));
            let respuestaMercado = {"precio":precio, "codigo":codigo}
            const headers = {

                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Content-Type": "multipart/form-data",
            }
            

            console.log("PRECIO =>", precio)
            console.log("CODIGO =>", codigo)
            console.log("RESPUETA MERCADO =>", respuestaMercado)

            console.log("INGRESO A MERCADOPAGO")

  

            //const response = await axios.post("https://cors-anywhere.herokuapp.com/http://localhost:8080/ProyectoFinalLaboIV/AuxMercadoPagoServlet",
            //respuestaMercado, { headers })

                    
            try{

                const response = await fetch("localhost:8080/ProyectoFinalLaboIV/AuxMercadoPagoServlet",{
                    method:"POST",
                }).then(

                    result => console.log("funciono", result)

                )
                .catch(error => console.log("no  funciono", error)) 

                

            }catch(error){

                console.log(error)

            }    
    
                
            
    }

    
        
    return (

        <Fragment>

    
            <div>

            <br></br>
            

            <Alert variant="success" className="bodyDetalle"> 

            <form  onSubmit={enviarDatos}>

            


            </form>    

            </Alert>

            </div>

        </Fragment>

    )



}

export default AuxMercadoPago;

