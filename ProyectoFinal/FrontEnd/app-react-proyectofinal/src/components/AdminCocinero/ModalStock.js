import {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const ModalStock = (props) => {

    //Paso el valor recibido desde detallePlato, true(se muestra el modal, ya que el state ejecuta el modal):
    const [show, setShow] = useState(props.stock);
    
    //Dejo predefinido los valores:
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
    const lista = props.productos.map((producto, i)=>{return (
        <li key={i}>{ producto }</li>
    )})

   
    return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
            <Modal.Title>ALERTA STOCK MINIMO EN PRODUCTOS.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             Los siguientes productos se encuentra con stock minimo, se recomienda verificar:
             <br></br>
             { lista }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose} href={`/adminArtInsumo`}>Volver</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}  

export default ModalStock;