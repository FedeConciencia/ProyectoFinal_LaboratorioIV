import React, { useState, Fragment, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import  { Redirect } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';


const EliminarDetalleFactura = (props) => {


    let history = useHistory();

    useEffect(() => {


        eliminarDetalleFactura()
      

    },[])

    //Metodo que elimina el registro de la tabla union de forma fisica =>
    const eliminarDetalleFactura =  async () => {

        try{

            const id = props.match.params.id
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/DetalleFacturaServlet?action=eliminar&idDetalleFactura="+id);
            const res = await response.json();

            history.push('/adminDetalleFactura');
            
            
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
 
export default EliminarDetalleFactura;