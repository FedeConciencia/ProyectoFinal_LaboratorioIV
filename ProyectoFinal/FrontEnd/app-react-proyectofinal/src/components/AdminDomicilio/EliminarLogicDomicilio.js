import React, { useState, Fragment, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import  { Redirect } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';
import moment from 'moment';


const EliminarLogicDomicilio = (props) => {

    
    let history = useHistory();

   
    useEffect(() => {

        eliminarLogicDomicilio()
      

    },[])

    

    //Metodo para actualizar datos (deleteLogic):
    const eliminarLogicDomicilio = async (datos) => {

        const id = props.match.params.id

        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/DomicilioServlet", {
                params: {
        
                    action:'eliminarLogico',
                    idDomicilio: id,
                    fechaBaja: moment().format('YYYY-MM-DD'),  

                    
                    
                }
            })

            const resJson = await response.data;

            console.log(resJson);

            history.push('/adminDomicilio');

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
 
export default EliminarLogicDomicilio;