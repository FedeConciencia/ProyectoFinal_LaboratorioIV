import React, { useState, Fragment, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import  { Redirect } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';
import moment from 'moment';


const EliminarLogicPedido = (props) => {

    let history = useHistory();

    useEffect(() => {

        
        eliminarLogicPedido()
      

    },[])

    
    //Metodo para eliminar logico UPDATE =>
    const eliminarLogicPedido = async (datos) => {

        const id = props.match.params.id

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {
        
                    action:'eliminarLogico',
                    idPedido: id,
                    fechaBaja: moment().format('YYYY-MM-DD'),  

                    
                    
                }
            })

            const resJson = await response;

            console.log(resJson)

            history.push('/adminPedido');
        
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
 
export default EliminarLogicPedido;