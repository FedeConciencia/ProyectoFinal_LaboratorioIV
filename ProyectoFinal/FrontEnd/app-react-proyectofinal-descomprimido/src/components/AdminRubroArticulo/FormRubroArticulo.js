import React, { useState, useEffect, Fragment } from 'react';
import Navigation from '../Navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import '../../assets/css/formCliente.css';
import moment from 'moment';

const FormRubroArticulo = (props) => {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        getRubroArticulo()
    }, []);

    const getRubroArticulo = async () => {
        try {
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/RubroArticuloServlet?action=listar");
            const resJson = await response.json();
            alert(JSON.stringify(resJson));

            setDatos(resJson);

        } catch(error){
            console.log("Error:  (AdminRubroArticulo) " + error);
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
                                <th>Denominacion</th>
                                <th>fecha_Alta</th>
                                <th>fecha_Baja</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {datos.map((rubro, i) => (

                                <tr>
                                    <td>{rubro.idRubro}</td>
                                    <td>{rubro.denominacion}</td>
                                    <td>{moment(rubro.fechaAlta).subtract(1,'M').format('YYYY-MM-DD')}</td>
                                    <td>{moment(rubro.fechaBaja).subtract(1,'M').format('YYYY-MM-DD')}</td>
                                    <td>{rubro.estado}</td>

                                    <td>
                                        <Button href={`actualizarRubroArticulo/${rubro.idRubro}`} className="boton" variant="primary" size="sm">UPDATE</Button>
                                        <Button href={`eliminarLogicRubroArticulo/${rubro.idRubro}`} className="boton" variant="warning" size="sm">DELETE.LOGIC</Button>
                                        <Button href={`eliminarRubroArticulo/${rubro.idRubro}`} className="boton" variant="danger" size="sm">DELETE.PHYSICAL</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button href={`registrarRubroArticulo`} className="boton" variant="success" size="lg">INSERT</Button>

                </Form>
            </div>
        </Fragment>
    )
}

export default FormRubroArticulo;