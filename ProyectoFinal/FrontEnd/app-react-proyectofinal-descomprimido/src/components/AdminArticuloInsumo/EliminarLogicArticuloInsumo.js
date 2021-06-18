import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const EliminarLogicArticuloInsumo = (props) => {

    let history = useHistory();

    useEffect(() => {
        eliminarLogicArticuloInsumo()
    }, [])

    const eliminarLogicArticuloInsumo = (datos) => {

        const id = props.match.params.id;

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet", {
            params: {

                action:'eliminarLogico',
                idArticulo: id,
                fechaBaja: moment().format('YYYY-MM-DD')
            }
        })
        .then(response => {
            console.log(JSON.stringify(response));

            history.push('/adminArtInsumo');
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

export default EliminarLogicArticuloInsumo;