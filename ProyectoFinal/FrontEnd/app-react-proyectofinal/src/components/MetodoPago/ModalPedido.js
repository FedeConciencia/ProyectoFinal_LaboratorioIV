import React, { useState, useEffect, Fragment } from "react";
import Navigation from "../Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/registrar.css';
import moment from 'moment';
import { Modal, Button } from "react-bootstrap";

const ModalPedido = (props) => {

    //Paso el valor recibido desde detallePlato, true(se muestra el modal, ya que el state ejecuta el modal):
    const [show, setShow] = useState(props.pedido);
    
    //Dejo predefinido los valores:
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
            <Modal.Title>Datos Pedido Gestionado:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             El codigo de su pedido es : { props.codigoPedido }  
            <br></br> 
             Le informamos el tiempo de su pedido es : { props.tiempo } 
             <br></br>
             Selecciono tipo de envio: { props.tipoEnvio}
             <br></br>
             Total de su Pedido: $ { props.total }
            </Modal.Body>

            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/home`}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  

export default ModalPedido;