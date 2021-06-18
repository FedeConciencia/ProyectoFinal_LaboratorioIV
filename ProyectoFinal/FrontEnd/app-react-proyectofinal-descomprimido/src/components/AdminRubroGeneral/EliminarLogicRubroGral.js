import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const EliminarLogicRubroGral = (props) => {

    let history = useHistory();

    useEffect(() => {
        eliminarLogicRubroGral()
    }, [])

    const eliminarLogicRubroGral = (datos) => {

        const id = props.match.params.id;

        axios.get("http://localhost:8080/ProyectoFinalLaboIV/RubroGralServlet", {
            params: {

                action:'eliminarLogico',
                idRubro: id,
                fechaBaja: moment().format('YYYY-MM-DD')
            }
        })
        .then(response => {
            console.log(JSON.stringify(response));

            history.push('/adminRubroGeneral');
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

export default EliminarLogicRubroGral;