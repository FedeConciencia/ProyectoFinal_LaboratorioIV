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
import qs from 'qs';



var crypto = require("crypto");


const AuxMercadoPago = (props) => {


    let preferences = ""

    let history = useHistory();

    useEffect(() => {

        metodoUseEffect();
    
    },[]) 

    
    const metodoUseEffect = async () => {

        await ejecutarScript();
        await enviarDatos();

    
    }


    
    const ejecutarScript = () => {

    
        const script = document.createElement("script")

        script.src = "https://sdk.mercadopago.com/js/v2"

        script.async = true

        document.body.appendChild(script)

    
        
    }    


    
    const enviarDatos = async (event) => {

            let precio = JSON.parse(localStorage.getItem("totalCarritoFinal"));
            let codigo = JSON.parse(localStorage.getItem("codigoPedido"));
            let succes = "http://localhost:3000/mercadopago/success";
            let failure = "http://localhost:3000/mercadopago/failure";
            let pending = "http://localhost:3000/mercadopago/pending";

            console.log("PRECIO =>", precio)
            console.log("CODIGO =>", codigo)
        

            //PASAR PARAMETROS AL SERVIDOR X AXIOS.POST (FUNCIONANDO OK) =>

            const url = "http://localhost:8080/ProyectoFinalLaboIV/AuxMercadoPagoServlet"

            const data = { 'codigo': codigo, 'precio':precio, 'succes':succes, 'failure':failure, 'pending':pending };
            
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
            };
                    
            try{

                
                const response = await axios(options)

                const resJson = await response.data;

                preferences = resJson

                console.log(preferences)

                const mp = new window.MercadoPago('TEST-fae83f23-cc7a-49bc-bc3e-5b9f681c2a71', {
                    locale: 'es-AR'
                });


                const checkout = mp.checkout({
                    preference: {
                        id: preferences.id
                    },
                    autoOpen: true, // Habilita la apertura automática del Checkout Pro
                });

            
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

