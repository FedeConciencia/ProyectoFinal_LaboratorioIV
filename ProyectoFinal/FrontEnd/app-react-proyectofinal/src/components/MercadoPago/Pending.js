import React, { useState, useEffect, Fragment } from 'react';
import Alert from "react-bootstrap/Alert";
import ModalPending from "./ModalPending.js";


const Pending = (props) => {

    const [modalPending, setModalPending] = useState(false);

    useEffect(() => {

        modalActive();
    
    },[modalPending]) 

    //Guardo en una constante el componente modalSucces y paso el props:
    const modalActive = async () => {

        let codigo = await JSON.parse(localStorage.getItem("codigoPedido"));

        
        const modal = () => {
            
            return (
              
            <ModalPending
                pending = { true }
                codigo = { codigo }
            ></ModalPending>

            );
        }    
        
        setModalPending(modal);  

    }

    return (

        <Fragment>

        
        <div>


        <br></br>


        <Alert variant="success" className="bodyDetalle"> 

        { modalPending }


        </Alert>

        </div>

        </Fragment>


    )


}

export default Pending;