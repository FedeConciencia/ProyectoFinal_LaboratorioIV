import React, { useState, Fragment, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';

const EliminarArtManDetalle = (props) => {

    let history = useHistory();

    useEffect(() => {
        eliminarArtManDetalle();
    }, [])

    const eliminarArtManDetalle = async() => {

        try{

            const id = props.match.params.id;
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet?action=eliminar&idArticuloDetalle="+id)
            const res = await response.json();

            history.push('/adminArtManDetalle');

        } catch(error){
            console.log(error)
        }
    }

    return (
        <Fragment>
            <Container></Container>
        </Fragment>
    );
}

export default EliminarArtManDetalle;