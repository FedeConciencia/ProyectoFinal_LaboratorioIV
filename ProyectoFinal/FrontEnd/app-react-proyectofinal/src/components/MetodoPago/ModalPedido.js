import {useState, useEffect} from "react";
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
             Le informamos el tiempo de su pedido es : {props.tiempo} minutos
             <br></br>
             Selecciono tipo de envio: { props.tipoEnvio}
             <br></br>
             Total de su Pedido: $ {props.total}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/metodoPago`}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  

export default ModalPedido;