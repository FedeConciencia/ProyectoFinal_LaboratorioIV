import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/formCliente.css';
import moment from 'moment';

const FormArtMan = (props) => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        getArtManufacturado()
    }, []);

    const getArtManufacturado = async () => {
        try {
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManServlet?action=listar");
            const resJson = await response.json();
            alert(JSON.stringify(resJson));

            setDatos(resJson);

        } catch(error){
            console.log("Error: (AdminArtMan) " + error);
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
                                <th>Tiempo estimado</th>
                                <th>Denominacion</th>
                                <th>Precio Venta</th>
                                <th>Imagen</th>
                                <th>Id Rubro Gral</th>
                                <th>fecha_Alta</th>
                                <th>fecha_Baja</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {datos.map((articulo, i) => (

                                <tr>
                                    <td>{articulo.idArticulo}</td>
                                    <td>{articulo.tiempoEstimado}</td>
                                    <td>{articulo.denominacion}</td>
                                    <td>{articulo.precioVenta}</td>
                                    <td>{articulo.imagen}</td>
                                    <td>{articulo.idRubroGeneral}</td>
                                    <td>{moment(articulo.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                                    <td>{moment(articulo.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                                    <td>{articulo.estado}</td>

                                    <td>
                                        <Button href={`actualizarArtMan/${articulo.idArticulo}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                                        <Button href={`eliminarLogicArtMan/${articulo.idArticulo}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                                        <Button href={`eliminarArtMan/${articulo.idArticulo}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button href={`registrarArtManufacturado`} className="boton" variant="success" size="lg">INSERT</Button>

                </Form>
            </div>
        </Fragment>
    )
}

export default FormArtMan;