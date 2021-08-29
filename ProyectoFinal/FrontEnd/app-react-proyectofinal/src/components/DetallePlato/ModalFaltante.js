import {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const ModalFaltante = (props) => {

    //Paso el valor recibido desde detallePlato, true(se muestra el modal, ya que el state ejecuta el modal):
    const [show, setShow] = useState(props.validar);
    
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
            <Modal.Title>La Operacion no puede ser Completada.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Lo sentimos. Estamos teniendo faltante de insumos para completar el pedido solicitado. Se gestionara 
            reposicion a la Brevedad. Muchas Gracias !
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/productos`}>Volver</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  

export default ModalFaltante;