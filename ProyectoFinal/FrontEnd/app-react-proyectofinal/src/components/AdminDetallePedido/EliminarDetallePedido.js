import React, { useState, Fragment, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import  { Redirect } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';


const EliminarDetallePedido = (props) => {

    
    let history = useHistory();



    useEffect(() => {

        
        eliminarDetallePedido()
      

    },[])

    
    //Metodo para eliminar registro fisico en tabla union=>
    const eliminarDetallePedido =  async () => {

        try{

            const id = props.match.params.id
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DetallePedidoServlet?action=eliminar&idDetallePedido="+id);
            const res = await response.json();

            history.push('/adminDetallePedido');
            
            

        }catch(error){

            console.log(error)

        }    

    }



    return (  

        <Fragment>

            <Container>

                

            </Container>


        </Fragment>


    );

}
 
export default EliminarDetallePedido;