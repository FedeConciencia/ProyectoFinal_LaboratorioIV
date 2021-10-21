import React, { useState, useEffect, Fragment } from 'react';
import Alert from "react-bootstrap/Alert";
import ModalSucces from "./ModalSucces.js";
import axios from "axios";
import moment from 'moment';


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
        let idPedido = 0;



        if(envio === 1){

            envio = "Envio a Domicilio"
        }else{

            envio = "Retiro en Local"
        }


        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/PedidoServlet", {
                params: {

                 action:"buscarIdXCodigo",
                 codigo: codigo,
                 
                }
            })

            const resJson = await response.data;

            idPedido = resJson;

        }catch(error){

            console.log(error)

        }    


        try{

            const response = await axios.get("http://localhost:8080/ProyectoFinalLaboIV/MercadoPagoServlet", {
                params: {

                 action:"insertar",
                 codigo: codigo,
                 fechaAprobacion: moment().format('YYYY-MM-DD'),
                 metodoPago: "tarjeta",
                 numeroTarjeta: "5031 7557 3453 0604",
                 idPedido: idPedido,
                 fechaAlta: moment().format('YYYY-MM-DD'),
                 fechaBaja: "1900-01-01",
                 estado: "activo",
                

                }
            })

            const resJson = await response.data;

            console.log(resJson)

        }catch(error){

            console.log(error)

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