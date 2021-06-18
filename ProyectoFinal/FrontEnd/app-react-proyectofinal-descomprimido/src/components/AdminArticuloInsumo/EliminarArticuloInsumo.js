import React, { useState, Fragment, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';

const EliminarArticuloInsumo = (props) => {

    let history = useHistory();

    useEffect(() => {
        eliminarArticuloInsumo();
    }, [])

    const eliminarArticuloInsumo = async() => {

        try{

            const id = props.match.params.id;
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/ArtInsumoServlet?action=eliminar&idArticuloInsumo="+id)
            const res = await response.json();

            history.push('/adminArtInsumo');

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

export default EliminarArticuloInsumo;