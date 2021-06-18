import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/formCliente.css';
import moment from 'moment';

const FormArtInsumo = (props) => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        getArtInsumo()
    }, []);

    const getArtInsumo = async () => {
        try {
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet?action=listar");
            const resJson = await response.json();
            alert(JSON.stringify(resJson));

            setDatos(resJson);

        } catch(error){
            console.log("Error:  (AdminArtInsumo)" + error);
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
                                <th>Denominación</th>
                                <th>Precio Compra</th>
                                <th>Precio Venta</th>
                                <th>Stock Actual</th>
                                <th>Stock Minimo</th>
                                <th>Unidad Medida</th>
                                <th>Es Insumo</th>
                                <th>Id Rubro Articulo</th>
                                <th>Fecha Alta</th>
                                <th>Fecha Baja</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {datos.map((articulo, i) => (

                                <tr>
                                    <td>{articulo.idArticuloInsumo}</td>
                                    <td>{articulo.denominacion}</td>
                                    <td>{articulo.precioCompra}</td>
                                    <td>{articulo.precioVenta}</td>
                                    <td>{articulo.stockActual}</td>
                                    <td>{articulo.stockMinimo}</td>
                                    <td>{articulo.unidadMedida}</td>
                                    <td>{articulo.esInsumo}</td>
                                    <td>{articulo.idRubroArticulo}</td>
                                    <td>{moment(articulo.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                                    <td>{moment(articulo.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                                    <td>{articulo.estado}</td>

                                    <td>
                                        <Button href={`actualizarArtInsumo/${articulo.idArticuloInsumo}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                                        <Button href={`eliminarLogicArtInsumo/${articulo.idArticuloInsumo}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                                        <Button href={`eliminarArtInsumo/${articulo.idArticuloInsumo}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button href={`registrarArtInsumo`} className="boton" variant="success" size="lg">INSERT</Button>

                </Form>
            </div>
        </Fragment>
    )
}

export default FormArtInsumo;