import React, { useState, Fragment, useContext, useEffect } from "react";
import {useHistory} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from 'react-hook-form';
import Alert from "react-bootstrap/Alert";
import '../../assets/css/tarjeta.css';
import Card from 'react-bootstrap/Card';
import moment from 'moment';

const Tarjeta = (props) => {


    return (

        <Fragment variant="flush" className="center">


                        <br></br>  
                        <Card border="primary" style={{ width: '23rem', heigth: "15rem" }} className="container"> 
                        <div className="imagen">
                        <br></br>  
                        <br></br>  
                        <Card.Img variant="top"  className="imagen" src={require(`../../assets/images/${props.imagen}`).default}/>
                        <br></br>  
                        <br></br>  
                        </div>
                        <div className="texto">
                        <br></br>  
                        <br></br>    
                        <br></br>   
                        <Card.Body>
                            <Card.Title className="titulo">{ (props.denominacion).toUpperCase() }</Card.Title>
                            <br></br>  
                            <br></br>
                            <Card.Title className="titulo">$ { (props.precioVenta) }</Card.Title>
                            <br></br>  
                            <br></br> 
                            <Button href={`detallePlato/${props.idArticulo}`} variant="primary">DETALLE</Button>
                            <br></br> 
                        </Card.Body>
                        </div>
                        </Card>


        </Fragment>


    );


};

export default Tarjeta;

