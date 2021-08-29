import {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const ModalHorario = (props) => {

    //Paso el valor recibido desde detallePlato, true(se muestra el modal, ya que el state ejecuta el modal):
    const [show, setShow] = useState(props.horario);
    
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
            Lo sentimos. El Horario de atencion es de Lunes a Viernes de 12:00 Hs a 20:00 Hs y Sabados y Domingos de 11:00 Hs a 15:00 Hs.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/productos`}>Volver</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  

export default ModalHorario;