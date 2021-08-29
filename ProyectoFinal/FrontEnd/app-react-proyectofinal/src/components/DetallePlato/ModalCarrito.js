import {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const ModalCarrito = (props) => {

    //Paso el valor recibido desde detallePlato, true(se muestra el modal, ya que el state ejecuta el modal):
    const [show, setShow] = useState(props.compra);
    
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
            <Modal.Title>Operacion Correcta.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Gracias por elegirnos, su producto fue agregado con exito al carrito de compras.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/productos`}>Volver</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  

export default ModalCarrito;