import React, { useState, Fragment, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import  { Redirect } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';

//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const EliminarMercadoPago = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();


 
    //Se obtiene los datos del parametro y posteriormente se pasa al metodo.
    //const {id} = useParams();
    

    //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        //Se ejecuta el metodo eliminar al cargar la pagina
        eliminarMercadoPago()
      
        

    }, [])

    


    const eliminarMercadoPago =  async () => {

        try{

            const id = props.match.params.id
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/MercadoPagoServlet?action=eliminar&idMercadoPago="+id);
            const res = await response.json();

            //Redireccionar a la pagina form cliente:
            history.push('/adminMercadoPago');
            
            

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
 
export default EliminarMercadoPago;