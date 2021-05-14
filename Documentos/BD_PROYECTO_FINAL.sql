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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_insumo`
--

LOCK TABLES `articulo_insumo` WRITE;
/*!40000 ALTER TABLE `articulo_insumo` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_manufacturado`
--

LOCK TABLES `articulo_manufacturado` WRITE;
/*!40000 ALTER TABLE `articulo_manufacturado` DISABLE KEYS */;
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
  `idArticuloManufacturado` int NOT NULL,
  `idArticuloInsumo` int NOT NULL,
  PRIMARY KEY (`idArticuloDetalle`),
  KEY `idArticuloManuf_fk1_idx` (`idArticuloManufacturado`),
  KEY `idArticuloInsumo_fk1_idx` (`idArticuloInsumo`),
  CONSTRAINT `idArticuloInsumo_fk1` FOREIGN KEY (`idArticuloInsumo`) REFERENCES `articulo_insumo` (`idArticulo`),
  CONSTRAINT `idArticuloManuf_fk1` FOREIGN KEY (`idArticuloManufacturado`) REFERENCES `articulo_manufacturado` (`idArticulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_manufacturado_detalle`
--

LOCK TABLES `articulo_manufacturado_detalle` WRITE;
/*!40000 ALTER TABLE `articulo_manufacturado_detalle` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilio`
--

LOCK TABLES `domicilio` WRITE;
/*!40000 ALTER TABLE `domicilio` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mercadopago`
--

LOCK TABLES `mercadopago` WRITE;
/*!40000 ALTER TABLE `mercadopago` DISABLE KEYS */;
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
  `horaEstimadaFin` date NOT NULL,
  `tipoEnvio` int NOT NULL,
  `total` double NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date DEFAULT '0000-00-00',
  `estado` varchar(45) DEFAULT NULL,
  `idCliente` int NOT NULL,
  `idDomicilio` int NOT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `idCliente_fk3_idx` (`idCliente`),
  KEY `idDomicilio_fk1_idx` (`idDomicilio`),
  CONSTRAINT `idCliente_fk3` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `idDomicilio_fk1` FOREIGN KEY (`idDomicilio`) REFERENCES `domicilio` (`idDomicilio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro_articulo`
--

LOCK TABLES `rubro_articulo` WRITE;
/*!40000 ALTER TABLE `rubro_articulo` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro_general`
--

LOCK TABLES `rubro_general` WRITE;
/*!40000 ALTER TABLE `rubro_general` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
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

-- Dump completed on 2021-05-11 10:05:18
