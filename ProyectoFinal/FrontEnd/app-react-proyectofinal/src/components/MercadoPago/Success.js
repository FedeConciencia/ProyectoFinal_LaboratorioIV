import React, { useState, useEffect, Fragment } from 'react';
import Alert from "react-bootstrap/Alert";
import ModalSucces from "./ModalSucces.js";


const Success = (props) => {

    const [modalSucces, setModalSucces] = useState(false);

    useEffect(() => {

        modalActive();
    
    },[modalSucces]) 

    //Guardo en una constante el componente modalSucces y paso el props:
    const modalActive = async () => {

        let precio = await JSON.parse(localStorage.getItem("totalCarritoFinal"));
        let tiempo = await JSON.parse(localStorage.getItem("tiempoEstimado"));
        let envio = await JSON.parse(localStorage.getItem("tipoEnvio"));
        let codigo = await JSON.parse(localStorage.getItem("codigoPedido"));

        if(envio === 1){

            envio = "Envio a Domicilio"
        }else{

            envio = "Retiro en Local"
        }

        
        const modal = () => {
            
            return (
              
            <ModalSucces
                succes = { true }
                codigoPedido = { codigo }
                tiempo  = { tiempo }
                tipoEnvio = { envio }
                total = { precio }
            ></ModalSucces>

            );
        }    
        
        setModalSucces(modal);  

    }

    return (

        <Fragment>

        
        <div>


        <br></br>


        <Alert variant="success" className="bodyDetalle"> 

        { modalSucces }


        </Alert>

        </div>

        </Fragment>


    )


}

export default Success;