import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const EliminarLogicRubroArticulo = (props) => {

    let history = useHistory();

    useEffect(() => {
        eliminarLogicRubroArticulo()
    }, [])

    const eliminarLogicRubroArticulo = (datos) => {

        const id = props.match.params.id;

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/RubroArticuloServlet", {
            params: {

                action:'eliminarLogico',
                idRubro: id,
                fechaBaja: moment().format('YYYY-MM-DD')
            }
        })
        .then(response => {
            console.log(JSON.stringify(response));

            history.push('/adminRubroArticulo');
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

export default EliminarLogicRubroArticulo;