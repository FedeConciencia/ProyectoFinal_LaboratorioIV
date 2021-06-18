import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/formCliente.css';
import moment from 'moment';

const FormArtManDetalle = (props) => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        getArtManDetalle()
    }, []);

    const getArtManDetalle = async () => {
        try {
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet?action=listar");
            const resJson = await response.json();
            alert(JSON.stringify(resJson));

            setDatos(resJson);

        } catch(error){
            console.log("Error:  (AdminArtManDetalle) " + error);
        }
    }

    return (

        <Fragment>
            <Navigation></Navigation>

            <div className="center">
                <Form>
                    <Table className="tabla" striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Cantidad</th>
                                <th>Id Articulo Manufacturado</th>
                                <th>Id Articulo Insumo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {datos.map((articulo, i) => (

                                <tr>
                                    <td>{articulo.idArticuloDetalle}</td>
                                    <td>{articulo.cantidad}</td>
                                    <td>{articulo.idArticuloManufacturado}</td>
                                    <td>{articulo.idArticuloInsumo}</td>

                                    <td>
                                        <Button href={`actualizarArtManDetalle/${articulo.idArticuloDetalle}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                                        <Button href={`eliminarLogicArtManDetalle/${articulo.idArticuloDetalle}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                                        <Button href={`eliminarArtManDetalle/${articulo.idArticuloDetalle}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button href={`registrarArtManDetalle`} className="boton" variant="success" size="lg">INSERT</Button>

                </Form>
            </div>
        </Fragment>
    )
}

export default FormArtManDetalle;