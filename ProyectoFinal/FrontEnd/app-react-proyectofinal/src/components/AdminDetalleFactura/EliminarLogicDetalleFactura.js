import React, { useState, Fragment, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import  { Redirect } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

//Paso el props por parametro a la funcion principal del componente para obtener los parametros const idDinosaurio = props.match.params.id
const EliminarLogicDetalleFactura = (props) => {

    //Redireccion de la Pagina:
    let history = useHistory();


 
    //Se obtiene los datos del parametro y posteriormente se pasa al metodo.
    //const {id} = useParams();
    

    //useEffect se comporta como en clase y componentes los metodos componentDidMount,  componentWillUnmount:
    //los corchetes permite que nuestro userEffect se ejecute una sola vez
    useEffect(() => {

        
        //Se ejecuta el metodo eliminar al cargar la pagina
        eliminarLogicDetalleFactura()
      
        

    }, [])

    


    //Metodo para actualizar datos:
    const eliminarLogicDetalleFactura = (datos) => {

        const id = props.match.params.id

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/DetalleFacturaServlet", {
            params: {
    
                action:'eliminarLogico',
                idDetalleFactura: id,
                //Se pasa la fecha actual:
                fechaBaja: moment().format('YYYY-MM-DD'),  

                   
                
            }
          })
        .then(response => {
    
            console.log(JSON.stringify(response))

             //Redireccionar a la pagina form cliente:
             history.push('/adminDetalleFactura');
        

        })
        .catch(error =>{
            console.log("Error");
            console.log(error);
        })
    
    
      }



    return (  

        <Fragment>

            <Container>

                

            </Container>


        </Fragment>


    );

}
 
export default EliminarLogicDetalleFactura;