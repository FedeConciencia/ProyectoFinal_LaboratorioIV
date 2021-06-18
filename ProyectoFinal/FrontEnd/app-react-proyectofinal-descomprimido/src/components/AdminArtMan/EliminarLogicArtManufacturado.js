import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const EliminarLogicArtManufacturado = (props) => {

    let history = useHistory();

    useEffect(() => {
        eliminarLogicArtManufacturado()
    }, [])

    const eliminarLogicArtManufacturado = (datos) => {

        const id = props.match.params.id;

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtManServlet", {
            params: {

                action:'eliminarLogico',
                idArticulo: id,
                fechaBaja: moment().format('YYYY-MM-DD')
            }
        })
        .then(response => {
            console.log(JSON.stringify(response));

            history.push('/adminArtManufacturado');
        })
        .catch(error => {
            console.log("Error");
            console.log(error);
        })
    }

    return (
        <Fragment>
            <Container></Container>
        </Fragment>
    );
}

export default EliminarLogicArtManufacturado;