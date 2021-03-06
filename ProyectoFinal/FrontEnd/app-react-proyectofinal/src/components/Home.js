import React, {Component, useContext} from 'react';
import '../assets/css/home.css';
import Navigation from './Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import img from '../assets/images/logo.png'
import Button from 'react-bootstrap/Button';
import { ContextoUsuario } from './ContextoUsuario';
import Image from 'react-bootstrap/Image'


const Home = () => {    

    return (

        <div className="body">
            
                <Container>

                <br></br>

                    <Row>

                        <Col className="body">
                        
                            <Alert variant="success">

                                

                                <Alert.Heading className="titulo">COCINA DE AUTOR</Alert.Heading>

                                <br></br>

                                <Image src={ img } rounded />

                                <br></br>
                                <br></br>

                                
                                <p>
                                En "El Buen Sabor" le espera un ambiente tranquilo y agradable, 
                                tanto en nuestra cafetería con terraza como en nuestro restaurante, 
                                ofreciéndole menú diario especial y nuestra selecta carta, 
                                con excelentes productos para su deleite. 
                                Todo bajo un estricto y riguroso control de calidad específica y denominación de origen,
                                seleccionando lo mejor y más típico de cada autonomía.
                                </p>

                                <hr />
                                <p className="mb-0">
                                    Lo invitamos a que acceda a ver nuestros <Button href={`/productos`} variant="link">PRODUCTOS</Button>
                                </p>
                            </Alert>

    
                        
                        
                        </Col>

                    </Row>


                </Container>

            
        </div>
    );

    
}

export default Home;

