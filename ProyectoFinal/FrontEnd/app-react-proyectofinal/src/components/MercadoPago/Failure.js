import React, { useState, useEffect, Fragment } from 'react';
import Alert from "react-bootstrap/Alert";
import ModalFailure from "./ModalFailure.js";
import axios from "axios";
import moment from 'moment';


const Failure = (props) => {

    const [modalFailure, setModalFailure] = useState(false);

    useEffect(() => {

        modalActive();
    
    },[modalFailure]) 

    //Guardo en una constante el componente modalSucces y paso el props:
    const modalActive = async () => {

        let codigo = await JSON.parse(localStorage.getItem("codigoPedido"));

        let fechaBaja = moment().format('YYYY-MM-DD');

         try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {

                 action:"rechazar",
                 fechaBaja: fechaBaja,
                 codigo: codigo,


                }
            })

        }catch(error){

            console.log(error)

        }    

        
        const modal = () => {
            
            return (
              
            <ModalFailure
                failure = { true }
                codigo = { codigo }
            ></ModalFailure>

            );
        }    
        
        setModalFailure(modal);  

    }

    return (

        <Fragment>

        
        <div>


        <br></br>


        <Alert variant="success" className="bodyDetalle"> 

        { modalFailure }


        </Alert>

        </div>

        </Fragment>


    )


}

export default Failure;