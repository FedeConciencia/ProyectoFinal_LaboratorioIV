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

const ModalFailure = (props) => {

    //Paso el valor recibido desde detallePlato, true(se muestra el modal, ya que el state ejecuta el modal):
    const [show, setShow] = useState(props.failure);
    
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
            <Modal.Title>El Pago no pudo ser Procesado:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             Error al procesar pago del pedido numero : { props.codigo }
            </Modal.Body>

            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/home`}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  

export default ModalFailure;