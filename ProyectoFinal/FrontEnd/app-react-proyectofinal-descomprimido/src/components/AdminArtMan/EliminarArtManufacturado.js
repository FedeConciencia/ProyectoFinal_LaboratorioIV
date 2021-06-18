import React, { useState, Fragment, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';

const EliminarArtManufacturado = (props) => {

    let history = useHistory();

    useEffect(() => {
        eliminarArtManufacturado();
    }, [])

    const eliminarArtManufacturado = async() => {

        try{

            const id = props.match.params.id;
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtManServlet?action=eliminar&idArticulo="+id)
            const res = await response.json();

            history.push('/adminArtManufacturado');

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

export default EliminarArtManufacturado;