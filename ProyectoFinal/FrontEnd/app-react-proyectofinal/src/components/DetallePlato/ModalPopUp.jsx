import {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalPopUp(props) {
    const [show, setShow] = useState(true);
    const [needToShow, setNeedToShow] = useState(props.usuario);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true && needToShow);

    useEffect(() => {
        setNeedToShow(props.usuario)
        handleShow()
    }, [needToShow])
    
    return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
            <Modal.Title>Esta acción requiere Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Por favor, para poder usar el carrito ingrese a su cuenta o regístrese con Google o a traves de la App.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/loguin`}>
                Login
            </Button>
            <Button variant="secondary" onClick={handleClose} href={`/productos`}>Volver</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  