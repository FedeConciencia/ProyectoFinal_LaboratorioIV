import React, { useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';
import moment from 'moment';


const ReturnTablaIngreso = (props) => {

   
    let history = useHistory();


    useEffect(() => {

        
       history.push("/tablaIngreso");
        

    }, [])

    

    return (  

        <>
            <Container />
        </>


    );

}
 
export default ReturnTablaIngreso;