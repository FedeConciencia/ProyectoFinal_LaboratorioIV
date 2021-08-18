-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: proyectofinal
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articulo_insumo`
--

DROP TABLE IF EXISTS `articulo_insumo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo_insumo` (
  `idArticulo` int NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(45) NOT NULL,
  `precioCompra` double NOT NULL,
  `precioVenta` double NOT NULL,
  `stockActual` double NOT NULL,
  `stockMinimo` double NOT NULL,
  `unidadMedida` varchar(45) NOT NULL,
  `esInsumo` varchar(45) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT 'activo',
  `idRubro` int NOT NULL,
  PRIMARY KEY (`idArticulo`),
  KEY `idRubro_fk2_idx` (`idRubro`),
  CONSTRAINT `idRubro_fk2` FOREIGN KEY (`idRubro`) REFERENCES `rubro_articulo` (`idRubro`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_insumo`
--

LOCK TABLES `articulo_insumo` WRITE;
/*!40000 ALTER TABLE `articulo_insumo` DISABLE KEYS */;
INSERT INTO `articulo_insumo` VALUES (1,'lenguado',15.5,33.5,35,5,'Kilos','Es insumo','2021-10-10','2021-07-17','inactivo',1),(2,'merluza',100.5,200.5,10.5,2.5,'gramos','esInsumo','2021-07-19','1900-01-01','activo',1);
/*!40000 ALTER TABLE `articulo_insumo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulo_manufacturado`
--

DROP TABLE IF EXISTS `articulo_manufacturado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo_manufacturado` (
  `idArticulo` int NOT NULL AUTO_INCREMENT,
  `tiempoEstimado` int NOT NULL,
  `denominacion` varchar(45) NOT NULL,
  `precioVenta` double NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT 'activo',
  `idRubro` int NOT NULL,
  PRIMARY KEY (`idArticulo`),
  KEY `idRubro_fk1_idx` (`idRubro`),
  CONSTRAINT `idRubro_fk1` FOREIGN KEY (`idRubro`) REFERENCES `rubro_general` (`idRubro`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_manufacturado`
--

LOCK TABLES `articulo_manufacturado` WRITE;
/*!40000 ALTER TABLE `articulo_manufacturado` DISABLE KEYS */;
INSERT INTO `articulo_manufacturado` VALUES (2,50,'Hamburguesa',600,'imagen.jpg','2020-10-05','1990-01-01','activo',1),(5,29,'yogurt',300.5,'yogurt.jpg','2021-07-15','1900-01-01','activo',4);
/*!40000 ALTER TABLE `articulo_manufacturado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulo_manufacturado_detalle`
--

DROP TABLE IF EXISTS `articulo_manufacturado_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo_manufacturado_detalle` (
  `idArticuloDetalle` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `unidadMedida` varchar(45) NOT NULL,
  `idArticuloManufacturado` int NOT NULL,
  `idArticuloInsumo` int NOT NULL,
  PRIMARY KEY (`idArticuloDetalle`),
  KEY `idArticuloManuf_fk1_idx` (`idArticuloManufacturado`),
  KEY `idArticuloInsumo_fk1_idx` (`idArticuloInsumo`),
  CONSTRAINT `idArticuloInsumo_fk1` FOREIGN KEY (`idArticuloInsumo`) REFERENCES `articulo_insumo` (`idArticulo`),
  CONSTRAINT `idArticuloManuf_fk1` FOREIGN KEY (`idArticuloManufacturado`) REFERENCES `articulo_manufacturado` (`idArticulo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_manufacturado_detalle`
--

LOCK TABLES `articulo_manufacturado_detalle` WRITE;
/*!40000 ALTER TABLE `articulo_manufacturado_detalle` DISABLE KEYS */;
INSERT INTO `articulo_manufacturado_detalle` VALUES (1,7,'kilo',2,1),(2,10,'gramo',5,2);
/*!40000 ALTER TABLE `articulo_manufacturado_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `dni` varchar(45) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT 'activo',
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (2,'Laura','Raumundi','63353535','2020-10-11','2612622522','laura@yahoo.com','2021-05-14','1900-01-01','activo'),(11,'Marta','Argumedo','4113047','2010-02-01','48484848','alumnosutn424@gmail.com','1900-02-01','2021-05-16','inactivo'),(12,'Federico','Sabatini','31029200','2011-01-01','564646464','alumnosutn424@gmail.com','2011-01-01','1900-01-01','activo'),(13,'Lucas','Argumedo','4323344','2010-01-01','533455445','alumnosutn424@gmail.com','2010-01-01','2021-06-18','inactivo'),(14,'Simon','Sabatini','31029020','2014-01-01','64646464','alumnosutn424@gmail.com','2021-05-16','2021-05-16','inactivo'),(20,'Marcela','Gutierrez','32123123','2011-01-01','4252525','alumnosutn424@gmail.com','2021-06-17','2021-07-05','inactivo'),(21,'Diana','Gutierrez','34423422','1984-05-03','35355333','natalia@gmail.com','2021-06-18','1900-01-01','activo'),(23,'Marta','Argumedo','31029221','2010-01-01','4454545453','alumnosutn424@gmail.com','2021-06-18','1900-01-01','activo'),(24,'Mariana','Marietti','63353533','1984-02-01','425252521','alumnos782@gmail.com','2021-07-05','1900-01-01','activo'),(30,'Josefa','Diutti','30928321','1990-02-01','425252521','alumnos782@gmail.com','2021-08-16','1900-01-01','activo'),(34,'Maria','Casale','30671932','1991-02-08','2615627819','casale@hotmail.com','2021-08-16','1900-01-01','activo'),(35,'Juan ','Ortiz','39209207','1990-01-01','2618282826','ortiz@gmail.com','2021-08-18','1900-01-01','activo');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracion` (
  `idConfiguracion` int NOT NULL AUTO_INCREMENT,
  `cantidadCocineros` int NOT NULL,
  `emailEmpresa` varchar(45) NOT NULL,
  `tokenMercadoPago` varchar(45) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT 'activo',
  PRIMARY KEY (`idConfiguracion`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion`
--

LOCK TABLES `configuracion` WRITE;
/*!40000 ALTER TABLE `configuracion` DISABLE KEYS */;
INSERT INTO `configuracion` VALUES (1,4,'sabrosura@gmail.com','tokenMercadoPago','2021-05-14','2021-07-05','inactivo'),(2,3,'email@gmail.com','43332','2021-07-05','1900-01-01','inactivo');
/*!40000 ALTER TABLE `configuracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `idDetalle` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `subTotal` double NOT NULL,
  `idFactura` int NOT NULL,
  `idArticulo` int NOT NULL,
  PRIMARY KEY (`idDetalle`),
  KEY `idFactura_fk1_idx` (`idFactura`),
  KEY `idArticuloManf_fk2_idx` (`idArticulo`),
  CONSTRAINT `idArticuloManf_fk2` FOREIGN KEY (`idArticulo`) REFERENCES `articulo_manufacturado` (`idArticulo`),
  CONSTRAINT `idFactura_fk1` FOREIGN KEY (`idFactura`) REFERENCES `factura` (`idFactura`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
INSERT INTO `detalle_factura` VALUES (4,1,500,1,2),(6,4,400.5,6,2);
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `idDetalle` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `subTotal` double NOT NULL,
  `idPedido` int NOT NULL,
  `idArtManufacturado` int NOT NULL,
  PRIMARY KEY (`idDetalle`),
  KEY `idPedido_fk5_idx` (`idPedido`),
  KEY `idArticulo_fk5_idx` (`idArtManufacturado`),
  CONSTRAINT `idArticulo_fk5` FOREIGN KEY (`idArtManufacturado`) REFERENCES `articulo_manufacturado` (`idArticulo`),
  CONSTRAINT `idPedido_fk5` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
INSERT INTO `detalle_pedido` VALUES (5,3,600.45,1,2);
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilio`
--

DROP TABLE IF EXISTS `domicilio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domicilio` (
  `idDomicilio` int NOT NULL AUTO_INCREMENT,
  `calle` varchar(45) NOT NULL,
  `numero` varchar(45) NOT NULL,
  `localidad` varchar(45) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT 'activo',
  `idCliente` int NOT NULL,
  PRIMARY KEY (`idDomicilio`),
  KEY `idCliente_fk2_idx` (`idCliente`),
  CONSTRAINT `idCliente_fk2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilio`
--

LOCK TABLES `domicilio` WRITE;
/*!40000 ALTER TABLE `domicilio` DISABLE KEYS */;
INSERT INTO `domicilio` VALUES (1,'27 de Mayo','621','Guaymallen','2021-05-14','2021-06-16','inactivo',2),(25,'Martinez','32','Godoy Cruz','2021-06-16','2021-06-18','inactivo',11),(26,'Zapallar','222','Guaymallen','2021-06-21','2021-06-17','inactivo',14),(27,'Mitre','24','Capital','2021-06-18','1900-01-01','activo',2),(28,'Jorge A Calle','21','Godoy Cruz','2021-07-05','1900-01-01','activo',2),(29,'Martinez','2473','Capital','2021-07-05','1900-01-01','inactivo',12),(34,'Martin Rodriguez','2321','Guaymallen','2021-08-16','1900-01-01','activo',34),(35,'Salamanca','1423','Guaymallen','2021-08-18','1900-01-01','activo',35);
/*!40000 ALTER TABLE `domicilio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `idFactura` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) NOT NULL,
  `montoDescuento` double NOT NULL,
  `formaPago` varchar(45) NOT NULL,
  `totalVenta` double NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT 'activo',
  `idPedido` int NOT NULL,
  PRIMARY KEY (`idFactura`),
  KEY `idPedido_fk3_idx` (`idPedido`),
  CONSTRAINT `idPedido_fk3` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,'221',25,'contado',320,'2021-05-14','2021-05-26','inactivo',1),(5,'3452',25,'contado',500.5,'2021-01-01','1900-01-01','activo',1),(6,'3453',25,'contado',300.4,'2021-07-07','1900-01-01','activo',1);
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mercadopago`
--

DROP TABLE IF EXISTS `mercadopago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mercadopago` (
  `idMercadoPago` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaAprobacion` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `metodoPago` varchar(45) NOT NULL,
  `numeroTarjeta` varchar(45) NOT NULL,
  `estado` varchar(45) DEFAULT 'activo',
  `idPedido` int NOT NULL,
  PRIMARY KEY (`idMercadoPago`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `idPedido_fk2_idx` (`idPedido`),
  CONSTRAINT `idPedido_fk2` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mercadopago`
--

LOCK TABLES `mercadopago` WRITE;
/*!40000 ALTER TABLE `mercadopago` DISABLE KEYS */;
INSERT INTO `mercadopago` VALUES (1,'2341','2021-05-14','2021-05-14','2021-07-07','tajeta','5463636372839940','inactivo',1),(4,'2367','2021-07-07','2021-07-07','1900-01-01','tajeta','5434233213212432','activo',1);
/*!40000 ALTER TABLE `mercadopago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idPedido` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) NOT NULL,
  `horaEstimadaFin` time NOT NULL,
  `tipoEnvio` int NOT NULL,
  `total` double NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT NULL,
  `idCliente` int NOT NULL,
  `idDomicilio` int NOT NULL,
  PRIMARY KEY (`idPedido`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `idCliente_fk3_idx` (`idCliente`),
  KEY `idDomicilio_fk1_idx` (`idDomicilio`),
  CONSTRAINT `idCliente_fk3` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `idDomicilio_fk1` FOREIGN KEY (`idDomicilio`) REFERENCES `domicilio` (`idDomicilio`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'28222','10:12:00',3,222,'2021-05-14','1900-01-01','activo',2,1),(2,'23332','11:11:11',2,3000,'2021-06-17','2021-06-17','inactivo',14,25),(4,'45322','23:21:29',2,5000,'2021-06-17','2021-06-17','inactivo',2,25),(5,'1212','12:12:00',2,333.23,'2021-06-18','2021-07-06','inactivo',12,27);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubro_articulo`
--

DROP TABLE IF EXISTS `rubro_articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubro_articulo` (
  `idRubro` int NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(100) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT 'activo',
  PRIMARY KEY (`idRubro`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro_articulo`
--

LOCK TABLES `rubro_articulo` WRITE;
/*!40000 ALTER TABLE `rubro_articulo` DISABLE KEYS */;
INSERT INTO `rubro_articulo` VALUES (1,'pescados','2021-07-13','1900-01-01','activo');
/*!40000 ALTER TABLE `rubro_articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubro_general`
--

DROP TABLE IF EXISTS `rubro_general`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubro_general` (
  `idRubro` int NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(100) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) NOT NULL DEFAULT 'activo',
  PRIMARY KEY (`idRubro`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro_general`
--

LOCK TABLES `rubro_general` WRITE;
/*!40000 ALTER TABLE `rubro_general` DISABLE KEYS */;
INSERT INTO `rubro_general` VALUES (1,'bebidas','2020-02-13','2021-07-09','inactivo'),(4,'postres','2021-07-09','1900-01-01','activo');
/*!40000 ALTER TABLE `rubro_general` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `contraseña` varchar(45) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT 'activo',
  `idCliente` int NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  KEY `idCliente_fk1_idx` (`idCliente`),
  CONSTRAINT `idCliente_fk1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'lauraMzaSoc','laura1234','cliente','2021-06-17','2021-06-17','inactivo',2),(3,'alumnosutn424@gmail.com','admin123','cliente','2021-05-14','1900-01-01','activo',12),(6,'MzaDiana','diana12345','administrativo','2021-07-06','1900-01-01','activo',21),(16,'casale@hotmail.com','hoLftR+QR0r3+kxmmfaMKg==','cliente','2021-08-16','1900-01-01','activo',34),(17,'brunetti@hotmail.com','az1AoxRoH4M/R+iba3Fz5w==','cliente','2021-08-16','1900-01-01','activo',2),(18,'ortiz@gmail.com','8A8InA9EDmek6oaSR3rrig==','cliente','2021-08-18','1900-01-01','activo',35);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-18 10:30:38
