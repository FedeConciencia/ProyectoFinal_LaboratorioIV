import React, { useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';


const ReturnTablaEgreso = (props) => {

    
    let history = useHistory();


    useEffect(() => {

        
       history.push("/tablaEgreso");
        

    }, [])

    
    return (  

        <>
            <Container />
        </>


    );

}
 
export default ReturnTablaEgreso;