import {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const ModalCarritoVacio = (props) => {

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
            <Modal.Title>Carrito Vacío.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Lo redirigiremos al Productos para que pueda adquirir alguno.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/productos`}>Volver</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  

export default ModalCarritoVacio;