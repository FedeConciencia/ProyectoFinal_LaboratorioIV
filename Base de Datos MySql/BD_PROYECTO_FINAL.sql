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
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_insumo`
--

LOCK TABLES `articulo_insumo` WRITE;
/*!40000 ALTER TABLE `articulo_insumo` DISABLE KEYS */;
INSERT INTO `articulo_insumo` VALUES (1,'lechuga',20,50,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(2,'tomate perita ',20,50,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(3,'tomate redondo',20,50,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(4,'papas',30,60,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(5,'zanahoria',50,80,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(6,'zapallo',30,60,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(7,'camote',30,60,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(8,'espinaca',40,80,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(9,'guisantes',30,60,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(10,'brocoli',30,50,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(11,'cebolla',40,80,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(12,'pimiento verde',30,50,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(13,'pimiento rojo',30,60,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(14,'ajo',30,60,10000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',1),(15,'queso mantecoso',80,120,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',2),(16,'queso cheddar',100,120,15000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',2),(17,'queso rayado',80,110,10000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',2),(18,'queso muzzarella',100,130,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',2),(19,'queso provolone',100,130,20000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',2),(20,'entrana',100,150,30000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',3),(21,'asado carnicero',180,210,30000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',3),(22,'lomo liso',180,210,30000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',3),(23,'carne molida',100,150,30000,5000,'gramo','esInsumo','2021-08-19','1900-01-01','activo',3),(24,'aceite girasol',100,130,15000,3000,'mililitro','esInsumo','2021-08-20','1900-01-01','activo',4),(25,'aceite oliva',150,180,15000,3000,'mililitro','esInsumo','2021-08-20','1900-01-01','activo',4),(26,'azucar rubia',100,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',5),(27,'azucar negra',100,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',5),(28,'azucar mascabo',130,170,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',5),(29,'pan frances',130,150,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',6),(30,'pan arabe',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',6),(31,'pan casero',140,160,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',6),(32,'facturas',180,200,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',6),(33,'tortitas',100,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',6),(34,'masitas',200,250,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',6),(35,'frijoles',100,130,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',7),(36,'garbanzos',100,130,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',7),(37,'arvejas',120,140,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',7),(38,'lentejas',150,180,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',7),(39,'tomates',150,180,15000,5000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',8),(40,'duraznos',120,160,15000,5000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',8),(41,'aceitunas',150,190,15000,5000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',8),(42,'berenjenas escabeche',150,190,15000,5000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',8),(43,'hongos',150,180,15000,5000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',8),(44,'hummus',150,180,15000,5000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',8),(45,'mayonesa',150,180,15000,3000.01,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(46,'oregano',130,150,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(47,'pimienta blanca',140,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(48,'pimienta negra',140,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(49,'azafran',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(50,'comino',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(51,'pimenton',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(52,'canela',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(53,'aji',130,150,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(54,'ketchup',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(55,'salsa golf',130,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(56,'mostaza',150,180,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',9),(57,'salmon',200,250,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',10),(58,'merluza',180,200,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',10),(59,'lenguado',180,210,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',10),(60,'gatuzzo',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',10),(61,'trucha',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',10),(62,'mejillones',200,230,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',11),(63,'camarones',200,240,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',11),(64,'langostinos',230,250,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',11),(65,'machas',230,260,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',11),(66,'tentaculos calamar',230,260,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',11),(67,'hielo molido',100,150,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',12),(68,'hielo cubo',130,150,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',12),(69,'naranjas',80,100,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',13),(70,'manzanas',70,100,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',13),(71,'duraznos',100,120,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',13),(72,'anana',130,150,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',13),(73,'peras',80,100,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',13),(74,'kiwi',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',13),(75,'cerezas',130,150,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',13),(76,'frutillas',150,180,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',13),(77,'chocolate',100,130,20000,5000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',14),(78,'vainilla',130,150,20000,5000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',14),(79,'frutilla',130,150,20000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',14),(80,'crema del cielo',130,150,20000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',14),(81,'bombon suizo',100,130,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',14),(82,'bombon escoces',100,130,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',14),(83,'dulce de leche colonial',150,180,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',15),(84,'dulce de leche tradicional',130,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',15),(85,'dulce de leche respostero',130,150,10000,2999.99,'gramo','esInsumo','2021-08-20','1900-01-01','activo',15),(86,'leche entera',100,130,15000,3000,'mililitro','esInsumo','2021-08-20','1900-01-01','activo',16),(87,'leche descremada',100,130,15000,5000,'mililitro','esInsumo','2021-08-20','1900-01-01','activo',16),(88,'manteca',120,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',16),(89,'margarina',130,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',16),(90,'crema de leche',150,180,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',16),(91,'queso barra',120,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',17),(92,'jamon cocido',100,130,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',17),(93,'jamon crudo',150,180,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',17),(94,'salame',130,150,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',17),(95,'mortadela',100,130,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',17),(96,'coca cola 2.25',200,250,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(97,'coca cola 1.5',120,150,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(98,'coca cola 500',60,80,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(99,'seven up 2.25',200,250,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(100,'seven up 1.5',130,150,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(101,'seven up 500',60,80,300,49.99,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(102,'pepsi 2.25',200,250,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(103,'pepsi 1.5',120,150,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(104,'pepsi 500',60,80,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(105,'fanta 2.25',200,250,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(106,'fanta 1.5',120,150,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(107,'fanta 500',60,80,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(108,'paso de los toros 2.5',200,250,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(109,'paso de los toros 1.5',120,150,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(110,'paso de los toros 500',60,80,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',18),(111,'cerveza negra 1.0',200,250,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',19),(112,'cerveza negra 500',100,130,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',19),(113,'cerveza rubia 1.0',200,250,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',19),(114,'cerveza rubia 500',100,130,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',19),(115,'vino malbec 750',250,300,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',20),(116,'vino malbec 185',150,200,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',20),(117,'agua mineral sin gas 1.0',100,150,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',21),(118,'agua mineral sin gas 500',50,80,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',21),(119,'agua mineral con gas 1.0',100,150,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',21),(120,'agua mineral con gas 500',50,80,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',21),(121,'prepizzas caseras',50,80,300,50,'unidad','esInsumo','2021-08-20','1900-01-01','activo',6),(122,'anchoas',100,150,5000,1000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',10),(123,'rabas',150,200,10000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',11),(124,'arroz',100,150,15000,3000,'gramo','esInsumo','2021-08-20','1900-01-01','activo',7);
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_manufacturado`
--

LOCK TABLES `articulo_manufacturado` WRITE;
/*!40000 ALTER TABLE `articulo_manufacturado` DISABLE KEYS */;
INSERT INTO `articulo_manufacturado` VALUES (1,30,'hamburguesa',300,'hamburguesa.jpg','2021-08-19','1900-01-01','activo',1),(2,40,'lomo',350,'lomo.jpg','2021-08-19','1900-01-01','activo',1),(3,35,'pizza muzzarella',500,'pizzaMuzza.jpg','2021-08-19','1900-01-01','activo',1),(4,35,'pizza fugazza',550,'pizzaFugazza.jpg','2021-08-19','1900-01-01','activo',1),(5,35,'pizza especial',600,'pizzaEspecial.jpg','2021-08-19','1900-01-01','activo',1),(6,35,'pizza anchoas',650,'pizzaAnchoas.jpg','2021-08-19','1900-01-01','activo',1),(7,20,'papas fritas',200,'papasFritas.jpg','2021-08-19','1900-01-01','activo',1),(8,30,'rabas',300,'rabas.jpg','2021-08-19','1900-01-01','activo',1),(9,30,'milanesa con pure',400,'milanesaPure.jpg','2021-08-19','1900-01-01','activo',1),(10,30,'milanesa con papas fritas',400,'milanesaFritas.jpg','2021-08-19','1900-01-01','activo',1),(11,40,'merluza con pure',500,'merluzaPure.jpg','2021-08-19','1900-01-01','activo',1),(12,40,'arroz con mariscos',500,'arrozMariscos.jpg','2021-08-19','1900-01-01','activo',1),(13,20,'sandwich',300,'sandwich.jpg','2021-08-19','1900-01-01','activo',1),(14,10,'coca cola 2.25',250,'cocaGrande.jpg','2021-08-19','1900-01-01','activo',2),(15,10,'coca cola 1.5',150,'cocaMediana.jpg','2021-08-19','1900-01-01','activo',2),(16,10,'coca cola 500',80,'cocaLata.jpg','2021-08-19','1900-01-01','activo',2),(17,10,'seven up 2.25',250,'sevenGrande.jpg','2021-08-19','1900-01-01','activo',2),(18,10,'seven up 1.5',150,'sevenMediana.jpg','2021-08-19','1900-01-01','activo',2),(19,10,'seven up 500',80,'sevenLata.jpg','2021-08-19','1900-01-01','activo',2),(20,10,'pepsi 2.25',250,'pepsiGrande.jpg','2021-08-19','1900-01-01','activo',2),(21,10,'pepsi 1.5',150,'pepsiMediana.jpg','2021-08-19','1900-01-01','activo',2),(22,10,'pepsi 500',80,'pepsiLata.jpg','2021-08-19','1900-01-01','activo',2),(23,10,'fanta 2.25',250,'fantaGrande.jpg','2021-08-19','1900-01-01','activo',2),(24,10,'fanta 1.5',150,'fantaMediana.jpg','2021-08-19','1900-01-01','activo',2),(25,10,'fanta 500',80,'fantaLata.jpg','2021-08-19','1900-01-01','activo',2),(26,10,'paso de los toros 2.25',250,'pasoGrande.jpg','2021-08-19','1900-01-01','activo',2),(27,10,'paso de los toros 1.5',150,'pasoMediana.jpg','2021-08-19','1900-01-01','activo',2),(28,10,'paso de los toros 500',80,'pasoLata.jpg','2021-08-19','1900-01-01','activo',2),(29,10,'agua mineral sin gas 1.0',150,'aguaMediana.jpg','2021-08-19','1900-01-01','activo',2),(30,10,'agua mineral sin gas 500',80,'aguaChica.jpg','2021-08-19','1900-01-01','activo',2),(31,10,'agua mineral con gas 1.0',150,'aguaGasMediana.jpg','2021-08-19','1900-01-01','activo',2),(32,10,'agua mineral con gas 500',80,'aguaGasChica.jpg','2021-08-19','1900-01-01','activo',2),(33,10,'vino malbec 750',300,'vinoGrande.jpg','2021-08-19','1900-01-01','activo',2),(34,10,'vino malbec 185',200,'vinoChico.jpg','2021-08-19','1900-01-01','activo',2),(35,10,'cerveza negra 1.0',250,'cervezaNegraGrande.jpg','2021-08-19','1900-01-01','activo',2),(36,10,'cerveza negra 500',130,'cervezaNegraLata.jpg','2021-08-19','1900-01-01','activo',2),(37,10,'cerveza rubia 1.0',250,'cervezaRubiaGrande.jpg','2021-08-19','1900-01-01','activo',2),(38,10,'cerveza rubia 500',130,'cervezaRubiaLata.jpg','2021-08-19','1900-01-01','activo',2),(39,20,'helado bombon suizo',150,'heladoSuizo.jpg','2021-08-19','1900-01-01','activo',3),(40,20,'helado bombon escoces',150,'heladoEscoces.jpg','2021-08-19','1900-01-01','activo',3),(41,20,'ensalada de fruta',150,'ensaladaFruta.jpg','2021-08-19','1900-01-01','activo',3),(42,20,'durazno con crema',150,'duraznoCrema.jpg','2021-08-19','1900-01-01','activo',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_manufacturado_detalle`
--

LOCK TABLES `articulo_manufacturado_detalle` WRITE;
/*!40000 ALTER TABLE `articulo_manufacturado_detalle` DISABLE KEYS */;
INSERT INTO `articulo_manufacturado_detalle` VALUES (1,200,'gramo',1,23),(2,200,'gramo',1,30),(3,100,'gramo',1,3),(4,100,'gramo',1,1),(5,25,'gramo',1,45),(6,25,'gramo',1,56),(7,100,'gramo',2,1),(8,100,'gramo',2,3),(9,100,'gramo',2,16),(10,200,'gramo',2,22),(11,200,'gramo',2,29),(12,25,'gramo',2,45),(13,25,'gramo',2,56),(14,1,'unidad',3,121),(15,100,'gramo',3,39),(16,200,'gramo',3,18),(17,1,'unidad',4,121),(18,100,'gramo',4,39),(19,200,'gramo',4,18),(20,200,'gramo',4,11),(21,1,'unidad',5,121),(22,100,'gramo',5,39),(23,200,'gramo',5,18),(24,100,'gramo',5,92),(25,1,'unidad',6,121),(26,100,'gramo',6,39),(27,200,'gramo',6,18),(28,100,'gramo',6,122),(29,400,'gramo',7,4),(30,400,'gramo',8,123),(31,400,'gramo',9,22),(32,300,'gramo',9,4),(33,400,'gramo',10,22),(34,300,'gramo',10,4),(35,400,'gramo',11,58),(36,300,'gramo',11,4),(37,400,'gramo',12,124),(38,100,'gramo',12,62),(39,100,'gramo',12,65),(40,300,'gramo',13,31),(41,150,'gramo',13,91),(42,150,'gramo',13,92),(43,1,'unidad',14,96),(44,1,'unidad',15,97),(45,1,'unidad',16,98),(46,1,'unidad',17,99),(47,1,'unidad',18,100),(48,1,'unidad',19,101),(49,1,'unidad',20,102),(50,1,'unidad',21,103),(51,1,'unidad',22,104),(52,1,'unidad',23,105),(53,1,'unidad',24,106),(54,1,'unidad',25,107),(55,1,'unidad',26,108),(56,1,'unidad',27,109),(57,1,'unidad',28,110),(58,1,'unidad',29,117),(59,1,'unidad',30,118),(60,1,'unidad',31,119),(61,1,'unidad',32,120),(62,1,'unidad',33,115),(63,1,'unidad',34,116),(64,1,'unidad',35,111),(65,1,'unidad',36,112),(66,1,'unidad',37,113),(67,1,'unidad',38,114),(68,1,'unidad',39,81),(69,1,'unidad',40,82),(70,150,'gramo',41,69),(71,150,'gramo',41,70),(72,150,'gramo',41,71),(73,150,'gramo',41,72),(74,150,'gramo',41,73),(75,150,'gramo',41,74),(76,150,'gramo',41,75),(77,150,'gramo',41,76),(78,300,'gramo',42,40),(79,300,'gramo',42,90);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro_articulo`
--

LOCK TABLES `rubro_articulo` WRITE;
/*!40000 ALTER TABLE `rubro_articulo` DISABLE KEYS */;
INSERT INTO `rubro_articulo` VALUES (1,'verduras','2021-08-19','1900-01-01','activo'),(2,'quesos','2021-08-19','1900-01-01','activo'),(3,'carnes','2021-08-19','1900-01-01','activo'),(4,'aceites','2021-08-19','1900-01-01','activo'),(5,'azucar','2021-08-19','1900-01-01','activo'),(6,'panificacion','2021-08-19','1900-01-01','activo'),(7,'legumbres','2021-08-19','1900-01-01','activo'),(8,'conservas','2021-08-19','1900-01-01','activo'),(9,'condimentos','2021-08-19','1900-01-01','activo'),(10,'pescados','2021-08-19','1900-01-01','activo'),(11,'mariscos','2021-08-19','1900-01-01','activo'),(12,'hielo','2021-08-19','1900-01-01','activo'),(13,'frutas','2021-08-19','1900-01-01','activo'),(14,'helados','2021-08-19','1900-01-01','activo'),(15,'dulce de leches','2021-08-19','1900-01-01','activo'),(16,'lacteos','2021-08-19','1900-01-01','activo'),(17,'fiambres','2021-08-19','1900-01-01','activo'),(18,'gaseosas','2021-08-19','1900-01-01','activo'),(19,'cerveza','2021-08-19','1900-01-01','activo'),(20,'vinos','2021-08-19','1900-01-01','activo'),(21,'aguas','2021-08-19','1900-01-01','activo');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro_general`
--

LOCK TABLES `rubro_general` WRITE;
/*!40000 ALTER TABLE `rubro_general` DISABLE KEYS */;
INSERT INTO `rubro_general` VALUES (1,'comidas','2021-08-19','1900-01-01','activo'),(2,'bebidas','2021-08-19','1900-01-01','activo'),(3,'postres','2021-08-19','1900-01-01','activo');
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
INSERT INTO `usuario` VALUES (2,'lauraMzaSoc','laura1234','cliente','2021-06-17','2021-06-17','inactivo',2),(3,'alumnosutn424@gmail.com','admin123','cliente','2021-05-14','1900-01-01','activo',12),(6,'MzaDiana','diana12345','administrativo','2021-07-06','1900-01-01','activo',21),(16,'casale@hotmail.com','hoLftR+QR0r3+kxmmfaMKg==','administrador','2021-08-16','1900-01-01','activo',34),(17,'brunetti@hotmail.com','az1AoxRoH4M/R+iba3Fz5w==','cliente','2021-08-16','1900-01-01','activo',2),(18,'ortiz@gmail.com','8A8InA9EDmek6oaSR3rrig==','cliente','2021-08-18','1900-01-01','activo',35);
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

-- Dump completed on 2021-08-20 18:31:10
