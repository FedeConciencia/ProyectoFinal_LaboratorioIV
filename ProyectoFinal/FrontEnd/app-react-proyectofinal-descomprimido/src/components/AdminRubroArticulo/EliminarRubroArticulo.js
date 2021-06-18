import React, { useState, Fragment, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';

const EliminarRubroArticulo = (props) => {

    let history = useHistory();

    useEffect(() => {
        eliminarRubroArticulo();
    }, [])

    const eliminarRubroArticulo = async() => {

        try{

            const id = props.match.params.id;
            const response = await fetch("http://localhost:8080/ProyectoFinalLaboIV/RubroArticuloServlet?action=eliminar&idRubro="+id)
            const res = await response.json();

            history.push('/adminRubroArticulo');

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

export default EliminarRubroArticulo;