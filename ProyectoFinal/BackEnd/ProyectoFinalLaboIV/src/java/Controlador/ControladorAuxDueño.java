package Controlador;

import Conexion.Conexion;
import Modelo.AuxDueño;
import SedEmail.SendEmail;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.io.OutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xssf.usermodel.XSSFCellStyle; 
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


public class ControladorAuxDueño {
    
    
    //OBTENER RANKING DE COMIDAS POR FECHAS:
    public List<AuxDueño> buscarRankingComidas(String date1, String date2) {

        Connection conexion = null;
        Conexion con = new Conexion();
        AuxDueño auxDueño = null;
        List<AuxDueño> listaAuxDueño = new ArrayList<AuxDueño>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT a.denominacion AS Comida, sum(d.cantidad) AS Cantidad FROM detalle_pedido AS d INNER JOIN\n" +
                                            "articulo_manufacturado AS a ON d.idArtManufacturado = a.idArticulo INNER JOIN pedido AS p ON\n" +
                                            "d.idPedido = p.idPedido WHERE p.fechaAlta BETWEEN ? AND ? \n" +
                                            "GROUP BY a.denominacion ORDER BY Cantidad desc;");
            
            
            ps.setString(1, date1); 
            ps.setString(2, date2); 

            rs = ps.executeQuery();

            while (rs.next()) {

                String denominacionComida = rs.getString(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                int cantidadComida = rs.getInt(2);
                

                auxDueño = new AuxDueño(denominacionComida, cantidadComida);

                listaAuxDueño.add(auxDueño);

            }

            conexion.close();

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {

                ps.close();
                rs.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

        return listaAuxDueño; //devolvemos la lista de alumnos encontrado

    }
    
    
    //OBTENER RECAUDACION INGRESOS X PERIODO DE TIEMPO :
    public double obtenerRecaudacion(String date1, String date2) {

        Connection conexion = null;
        Conexion con = new Conexion();
        double recaudacionTotal = 0;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT sum(f.totalVenta) AS Recaudacion FROM factura AS f WHERE f.fechaAlta BETWEEN ? AND ?;");
            
            
            ps.setString(1, date1); 
            ps.setString(2, date2); 

            rs = ps.executeQuery();

            if (rs.next()) {

                recaudacionTotal = rs.getDouble(1); 
                
               
            }

            conexion.close();

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {

                ps.close();
                rs.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

        return recaudacionTotal; 

    }
    
    //OBTENER GANANCIA X PERIODO DE TIEMPO :
    public double obtenerGanancia(String date1, String date2) {

        Connection conexion = null;
        Conexion con = new Conexion();
        double ganancia = 0;
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT (sum(detalleArt.cantidad * insumo.precioVenta) - sum(detalleArt.cantidad * insumo.precioCompra)) AS Ganancia\n" +
                                            "FROM factura AS factura INNER JOIN detalle_factura AS detalleFactura ON factura.idFactura = detalleFactura.idFactura\n" +
                                            "INNER JOIN articulo_manufacturado AS artManf ON detalleFactura.idArticulo = artManf.idArticulo INNER JOIN\n" +
                                            "articulo_manufacturado_detalle AS detalleArt ON detalleArt.idArticuloManufacturado = artManf.idArticulo\n" +
                                            "INNER JOIN articulo_insumo AS insumo ON detalleArt.idArticuloInsumo = insumo.idArticulo\n" +
                                            "WHERE factura.fechaAlta BETWEEN ? AND ?;");
            
            
            ps.setString(1, date1); 
            ps.setString(2, date2); 

            rs = ps.executeQuery();

            if (rs.next()) {

                ganancia = rs.getDouble(1); 
                
               
            }

            conexion.close();

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {

                ps.close();
                rs.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

        return ganancia; 

    }
    
    //OBTENER PEDIDOS X CLIENTE X PERIODO DE TIEMPO :
    public List<AuxDueño> obtenerPedidosXCliente(String date1, String date2) {

        Connection conexion = null;
        Conexion con = new Conexion();
        AuxDueño auxDueño = null;
        List<AuxDueño> listaAuxDueño = new ArrayList<AuxDueño>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT count(p.idPedido) as CantidadPedido, p.idCliente AS IdCliente, c.nombre AS nombre,\n" +
                                        "c.apellido AS Apellido from pedido AS p INNER JOIN cliente AS c ON p.idCliente = c.idCliente\n" +
                                        "WHERE p.fechaAlta BETWEEN ? AND ? GROUP BY p.idCliente ORDER BY CantidadPedido desc;");
            
            
            ps.setString(1, date1); 
            ps.setString(2, date2); 

            rs = ps.executeQuery();

            while (rs.next()) {

                int cantidadPedidos = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                long idCliente = rs.getLong(2);
                String nombre = rs.getString(3);
                String apellido = rs.getString(4);
                

                auxDueño = new AuxDueño(cantidadPedidos, nombre, apellido, idCliente);

                listaAuxDueño.add(auxDueño);

            }

            conexion.close();

        } catch (Exception ex) {

            System.err.println("Error. " + ex);

        } finally {

            try {

                ps.close();
                rs.close();

            } catch (SQLException ex) {
                System.err.println("Error. " + ex);
            }

        }

        return listaAuxDueño; 

    }
    
    //Metodo para enviar mail con documento excel Ranking Comidas: 
    public String sendMailandExcelRankingComidas(List<AuxDueño> listaAuxDueño, String email, String fechaInicio, String fechaFin){
        
        try{
            
            ////convertimos la coleccion de tipo AuxFacturaPedido a un array =>

            AuxDueño[] lista = new AuxDueño[listaAuxDueño.size()];

            lista = listaAuxDueño.toArray(lista);

            String ruta = "RanKingComidas.xlsx";
            
             //Crear el DOCUMENTO EXCEL con Libreria POI de JAVA:
            
            //creo el libro excel
            //El parametro especifica que cada 50 filas se escribe en el disco rigido y libera la memoria, asi sucesivamente:
            XSSFWorkbook libro = new XSSFWorkbook();

            //estilos, son los colores del documento (Stylos).
            XSSFFont font = (XSSFFont) libro.createFont();
            font.setBold(true);
            XSSFCellStyle style = (XSSFCellStyle) libro.createCellStyle();
            style.setFont(font);
            XSSFCellStyle styleGris = (XSSFCellStyle) libro.createCellStyle();
            styleGris.setFont(font);
            styleGris.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
            styleGris.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleGreen = (XSSFCellStyle) libro.createCellStyle();
            styleGreen.setFont(font);
            styleGreen.setFillForegroundColor(IndexedColors.SEA_GREEN.index);
            styleGreen.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleRed = (XSSFCellStyle) libro.createCellStyle();
            styleRed.setFont(font);
            styleRed.setFillForegroundColor(IndexedColors.RED.index);
            styleRed.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleNaranja = (XSSFCellStyle) libro.createCellStyle();
            styleNaranja.setFont(font);
            styleNaranja.setFillForegroundColor(IndexedColors.TAN.index);
            styleNaranja.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleTurquesa = (XSSFCellStyle) libro.createCellStyle();
            styleTurquesa.setFont(font);
            styleTurquesa.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.index);
            styleTurquesa.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleRosa = (XSSFCellStyle) libro.createCellStyle();
            styleRosa.setFont(font);
            styleRosa.setFillForegroundColor(IndexedColors.ROSE.index);
            styleRosa.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleAmarillo = (XSSFCellStyle) libro.createCellStyle();
            styleAmarillo.setFont(font);
            styleAmarillo.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.index);
            styleAmarillo.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleOro = (XSSFCellStyle) libro.createCellStyle();
            styleOro.setFont(font);
            styleOro.setFillForegroundColor(IndexedColors.GOLD.index);
            styleOro.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleOroObservado = (XSSFCellStyle) libro.createCellStyle();
            styleOroObservado.setFont(font);
            styleOroObservado.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleOroObservado.setBottomBorderColor(IndexedColors.RED.index);
            styleOroObservado.setFillForegroundColor(IndexedColors.YELLOW.index);
            XSSFCellStyle styleVerdeClaro = (XSSFCellStyle) libro.createCellStyle();
            styleVerdeClaro.setFont(font);
            styleVerdeClaro.setFillForegroundColor(IndexedColors.LIGHT_GREEN.index);
            styleVerdeClaro.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleVerdeObservacion = (XSSFCellStyle) libro.createCellStyle();
            styleVerdeObservacion.setFont(font);
            styleVerdeObservacion.setFillForegroundColor(IndexedColors.BRIGHT_GREEN.index);
            styleVerdeObservacion.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleVerdeObservacion.setBottomBorderColor(IndexedColors.RED.index);
            XSSFCellStyle styleAzul = (XSSFCellStyle) libro.createCellStyle();
            styleAzul.setFont(font);
            styleAzul.setFillForegroundColor(IndexedColors.PALE_BLUE.index);
            styleAzul.setFillPattern(FillPatternType.SOLID_FOREGROUND);


            // Se crea una hoja dentro del libro
            XSSFSheet hoja = libro.createSheet();

            //A continuacion creamos el encabezado de la hoja excel:

            int nroColumna = 0; // se inicializa el nro columnas en 0

            //Encabezado Documento (primera FIla):

            // Se crea una fila dentro de la hoja
            XSSFRow row = hoja.createRow(0); //Se pasa en el parametro que corresponde a la fila 0

            // Se crea una celda dentro de la fila
            XSSFCell cell = row.createCell(nroColumna);
            cell.setCellValue("RANKING POSICION"); //Se le da un valor a la celda
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna); //se incrementa el nro
            cell.setCellValue("PRODUCTO");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("CANTIDAD DE VENTAS");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("FECHA INICIO");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("FECHA FIN");
            cell.setCellStyle(styleGris);
            

            //Creamos las siguientes filas y asignamos valores a las celdas:

            int nroFila = 1;  //Se reinicia el valor de filas pero en 1, ya que el 0 (Encabezado del Documento)
            nroColumna = 0;   //Se reinicia el valor de columnas en 0

            
            for(int i=0; i < lista.length; i++) {

                nroColumna = 0; //Siguiente vuelta columnas se resetea a 0
                row = hoja.createRow(nroFila);
                ++nroFila; //Se incrementa el numero de Fila
                cell = row.createCell(nroColumna);  
                cell.setCellValue(i + 1);
                cell.setCellStyle(styleAmarillo);
                cell = row.createCell(++nroColumna); //Incrementamos el numero de columnas
                cell.setCellValue(lista[i].getDenominacionComidad());
                cell.setCellStyle(styleAzul);
                cell = row.createCell(++nroColumna);
                cell.setCellValue(lista[i].getCantidadComida());
                cell.setCellStyle(styleNaranja);
                cell = row.createCell(++nroColumna);
                cell.setCellValue(fechaInicio);
                cell.setCellStyle(styleAzul);
                cell = row.createCell(++nroColumna);
                cell.setCellValue(fechaFin);
                cell.setCellStyle(styleAmarillo);
                
            }
            
            
           // Se crea el archivo =>
           OutputStream fileOut = new FileOutputStream(ruta);
           libro.write(fileOut);
           
           //Se envia Excel creado se pasa ruta y mail =>
            SendEmail send = new SendEmail();
            
            boolean verificar = send.sendMailEstadisticasDueño(ruta, email);
            
            if(verificar){
                
                //Se borra Documento =>
                borrarDocument(ruta);
                
            }else{
                
                borrarDocument(ruta);
                
            }
         
 
           return "Documento Excel creado con exito";
            
        }catch(Exception error){
            
             System.out.println("Error => " + error.getMessage());
            
             return "Error en la creacion del documento Excel";
            
            
        }
        
        
      
    }
    
    //Metodo para enviar mail con documento excel Cantidad de Pedidos x Cliente: 
    public String sendMailandExcelPedidosXCliente(List<AuxDueño> listaAuxDueño, String email, String fechaInicio, String fechaFin){
        
        try{
            
            ////convertimos la coleccion de tipo AuxFacturaPedido a un array =>

            AuxDueño[] lista = new AuxDueño[listaAuxDueño.size()];

            lista = listaAuxDueño.toArray(lista);

            String ruta = "PedidosXCliente.xlsx";
            
             //Crear el DOCUMENTO EXCEL con Libreria POI de JAVA:
            
            //creo el libro excel
            //El parametro especifica que cada 50 filas se escribe en el disco rigido y libera la memoria, asi sucesivamente:
            XSSFWorkbook libro = new XSSFWorkbook();

            //estilos, son los colores del documento (Stylos).
            XSSFFont font = (XSSFFont) libro.createFont();
            font.setBold(true);
            XSSFCellStyle style = (XSSFCellStyle) libro.createCellStyle();
            style.setFont(font);
            XSSFCellStyle styleGris = (XSSFCellStyle) libro.createCellStyle();
            styleGris.setFont(font);
            styleGris.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
            styleGris.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleGreen = (XSSFCellStyle) libro.createCellStyle();
            styleGreen.setFont(font);
            styleGreen.setFillForegroundColor(IndexedColors.SEA_GREEN.index);
            styleGreen.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleRed = (XSSFCellStyle) libro.createCellStyle();
            styleRed.setFont(font);
            styleRed.setFillForegroundColor(IndexedColors.RED.index);
            styleRed.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleNaranja = (XSSFCellStyle) libro.createCellStyle();
            styleNaranja.setFont(font);
            styleNaranja.setFillForegroundColor(IndexedColors.TAN.index);
            styleNaranja.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleTurquesa = (XSSFCellStyle) libro.createCellStyle();
            styleTurquesa.setFont(font);
            styleTurquesa.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.index);
            styleTurquesa.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleRosa = (XSSFCellStyle) libro.createCellStyle();
            styleRosa.setFont(font);
            styleRosa.setFillForegroundColor(IndexedColors.ROSE.index);
            styleRosa.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleAmarillo = (XSSFCellStyle) libro.createCellStyle();
            styleAmarillo.setFont(font);
            styleAmarillo.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.index);
            styleAmarillo.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleOro = (XSSFCellStyle) libro.createCellStyle();
            styleOro.setFont(font);
            styleOro.setFillForegroundColor(IndexedColors.GOLD.index);
            styleOro.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleOroObservado = (XSSFCellStyle) libro.createCellStyle();
            styleOroObservado.setFont(font);
            styleOroObservado.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleOroObservado.setBottomBorderColor(IndexedColors.RED.index);
            styleOroObservado.setFillForegroundColor(IndexedColors.YELLOW.index);
            XSSFCellStyle styleVerdeClaro = (XSSFCellStyle) libro.createCellStyle();
            styleVerdeClaro.setFont(font);
            styleVerdeClaro.setFillForegroundColor(IndexedColors.LIGHT_GREEN.index);
            styleVerdeClaro.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleVerdeObservacion = (XSSFCellStyle) libro.createCellStyle();
            styleVerdeObservacion.setFont(font);
            styleVerdeObservacion.setFillForegroundColor(IndexedColors.BRIGHT_GREEN.index);
            styleVerdeObservacion.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleVerdeObservacion.setBottomBorderColor(IndexedColors.RED.index);
            XSSFCellStyle styleAzul = (XSSFCellStyle) libro.createCellStyle();
            styleAzul.setFont(font);
            styleAzul.setFillForegroundColor(IndexedColors.PALE_BLUE.index);
            styleAzul.setFillPattern(FillPatternType.SOLID_FOREGROUND);


            // Se crea una hoja dentro del libro
            XSSFSheet hoja = libro.createSheet();

            //A continuacion creamos el encabezado de la hoja excel:

            int nroColumna = 0; // se inicializa el nro columnas en 0

            //Encabezado Documento (primera FIla):

            // Se crea una fila dentro de la hoja
            XSSFRow row = hoja.createRow(0); //Se pasa en el parametro que corresponde a la fila 0

            // Se crea una celda dentro de la fila
            XSSFCell cell = row.createCell(nroColumna);
            cell.setCellValue("CANTIDAD PEDIDOS"); //Se le da un valor a la celda
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna); //se incrementa el nro
            cell.setCellValue("ID_CLIENTE");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("NOMBRE");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("APELLIDO");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("FECHA INICIO");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("FECHA FIN");
            cell.setCellStyle(styleGris);
            

            //Creamos las siguientes filas y asignamos valores a las celdas:

            int nroFila = 1;  //Se reinicia el valor de filas pero en 1, ya que el 0 (Encabezado del Documento)
            nroColumna = 0;   //Se reinicia el valor de columnas en 0

            
            for(int i=0; i < lista.length; i++) {

                nroColumna = 0; //Siguiente vuelta columnas se resetea a 0
                row = hoja.createRow(nroFila);
                ++nroFila; //Se incrementa el numero de Fila
                cell = row.createCell(nroColumna);  
                cell.setCellValue(String.valueOf(lista[i].getCantidadPedidos()));
                cell.setCellStyle(styleAmarillo);
                cell = row.createCell(++nroColumna); //Incrementamos el numero de columnas
                cell.setCellValue(String.valueOf(lista[i].getIdCliente()));
                cell.setCellStyle(styleAzul);
                cell = row.createCell(++nroColumna);
                cell.setCellValue(lista[i].getNombreCliente());
                cell.setCellStyle(styleNaranja);
                cell = row.createCell(++nroColumna);
                cell.setCellValue(lista[i].getApellidoCliente());
                cell.setCellStyle(styleGreen);
                cell = row.createCell(++nroColumna);
                cell.setCellValue(fechaInicio);
                cell.setCellStyle(styleAzul);
                cell = row.createCell(++nroColumna);
                cell.setCellValue(fechaFin);
                cell.setCellStyle(styleAmarillo);
                
            }
            
            
           // Se crea el archivo =>
           OutputStream fileOut = new FileOutputStream(ruta);
           libro.write(fileOut);
           
           //Se envia Excel creado se pasa ruta y mail =>
            SendEmail send = new SendEmail();
            
            boolean verificar = send.sendMailEstadisticasDueño(ruta, email);
            
            if(verificar){
                
                //Se borra Documento =>
                borrarDocument(ruta);
                
            }else{
                
                borrarDocument(ruta);
                
            }
         
 
           return "Documento Excel creado con exito";
            
        }catch(Exception error){
            
             System.out.println("Error => " + error.getMessage());
            
             return "Error en la creacion del documento Excel";
            
            
        }
        
        
      
    }
    
    //Metodo para enviar mail con documento excel Ranking Comidas: 
    public String sendMailandExcelRecaudacion(String recaudacionTotal, String email, String fechaInicial, String fechaFinal){
        
        try{
            
         
            String ruta = "Recaudacion.xlsx";
            
             //Crear el DOCUMENTO EXCEL con Libreria POI de JAVA:
            
            //creo el libro excel
            //El parametro especifica que cada 50 filas se escribe en el disco rigido y libera la memoria, asi sucesivamente:
            XSSFWorkbook libro = new XSSFWorkbook();

            //estilos, son los colores del documento (Stylos).
            XSSFFont font = (XSSFFont) libro.createFont();
            font.setBold(true);
            XSSFCellStyle style = (XSSFCellStyle) libro.createCellStyle();
            style.setFont(font);
            XSSFCellStyle styleGris = (XSSFCellStyle) libro.createCellStyle();
            styleGris.setFont(font);
            styleGris.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
            styleGris.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleGreen = (XSSFCellStyle) libro.createCellStyle();
            styleGreen.setFont(font);
            styleGreen.setFillForegroundColor(IndexedColors.SEA_GREEN.index);
            styleGreen.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleRed = (XSSFCellStyle) libro.createCellStyle();
            styleRed.setFont(font);
            styleRed.setFillForegroundColor(IndexedColors.RED.index);
            styleRed.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleNaranja = (XSSFCellStyle) libro.createCellStyle();
            styleNaranja.setFont(font);
            styleNaranja.setFillForegroundColor(IndexedColors.TAN.index);
            styleNaranja.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleTurquesa = (XSSFCellStyle) libro.createCellStyle();
            styleTurquesa.setFont(font);
            styleTurquesa.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.index);
            styleTurquesa.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleRosa = (XSSFCellStyle) libro.createCellStyle();
            styleRosa.setFont(font);
            styleRosa.setFillForegroundColor(IndexedColors.ROSE.index);
            styleRosa.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleAmarillo = (XSSFCellStyle) libro.createCellStyle();
            styleAmarillo.setFont(font);
            styleAmarillo.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.index);
            styleAmarillo.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleOro = (XSSFCellStyle) libro.createCellStyle();
            styleOro.setFont(font);
            styleOro.setFillForegroundColor(IndexedColors.GOLD.index);
            styleOro.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleOroObservado = (XSSFCellStyle) libro.createCellStyle();
            styleOroObservado.setFont(font);
            styleOroObservado.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleOroObservado.setBottomBorderColor(IndexedColors.RED.index);
            styleOroObservado.setFillForegroundColor(IndexedColors.YELLOW.index);
            XSSFCellStyle styleVerdeClaro = (XSSFCellStyle) libro.createCellStyle();
            styleVerdeClaro.setFont(font);
            styleVerdeClaro.setFillForegroundColor(IndexedColors.LIGHT_GREEN.index);
            styleVerdeClaro.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleVerdeObservacion = (XSSFCellStyle) libro.createCellStyle();
            styleVerdeObservacion.setFont(font);
            styleVerdeObservacion.setFillForegroundColor(IndexedColors.BRIGHT_GREEN.index);
            styleVerdeObservacion.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleVerdeObservacion.setBottomBorderColor(IndexedColors.RED.index);
            XSSFCellStyle styleAzul = (XSSFCellStyle) libro.createCellStyle();
            styleAzul.setFont(font);
            styleAzul.setFillForegroundColor(IndexedColors.PALE_BLUE.index);
            styleAzul.setFillPattern(FillPatternType.SOLID_FOREGROUND);


            // Se crea una hoja dentro del libro
            XSSFSheet hoja = libro.createSheet();

            //A continuacion creamos el encabezado de la hoja excel:

            int nroColumna = 0; // se inicializa el nro columnas en 0

            //Encabezado Documento (primera FIla):

            // Se crea una fila dentro de la hoja
            XSSFRow row = hoja.createRow(0); //Se pasa en el parametro que corresponde a la fila 0

            // Se crea una celda dentro de la fila
            XSSFCell cell = row.createCell(nroColumna);
            cell.setCellValue("RECAUDACION TOTAL"); //Se le da un valor a la celda
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna); //se incrementa el nro
            cell.setCellValue("FECHA INICIO");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("FECHA FIN");
            cell.setCellStyle(styleGris);
            

            //Creamos las siguientes filas y asignamos valores a las celdas:

            int nroFila = 1;  //Se reinicia el valor de filas pero en 1, ya que el 0 (Encabezado del Documento)
            nroColumna = 0;   //Se reinicia el valor de columnas en 0
            
            //Recorrido estatico sin estructura son For =>       
            
            nroColumna = 0; //Siguiente vuelta columnas se resetea a 0
            row = hoja.createRow(nroFila);
            ++nroFila; //Se incrementa el numero de Fila
            cell = row.createCell(nroColumna);  
            cell.setCellValue(recaudacionTotal); //Paso el primer parametro 
            cell.setCellStyle(styleAmarillo);
            cell = row.createCell(++nroColumna); //Incrementamos el numero de columnas
            cell.setCellValue(fechaInicial);
            cell.setCellStyle(styleAzul);
            cell = row.createCell(++nroColumna);
            cell.setCellValue(fechaFinal);
            cell.setCellStyle(styleNaranja);
                
       
           // Se crea el archivo =>
           OutputStream fileOut = new FileOutputStream(ruta);
           libro.write(fileOut);
           
           //Se envia Excel creado se pasa ruta y mail =>
            SendEmail send = new SendEmail();
            
            boolean verificar = send.sendMailEstadisticasDueño(ruta, email);
            
            if(verificar){
                
                //Se borra Documento =>
                borrarDocument(ruta);
                
            }else{
                
                borrarDocument(ruta);
                
            }
         
 
           return "Documento Excel creado con exito";
            
        }catch(Exception error){
            
             System.out.println("Error => " + error.getMessage());
            
             return "Error en la creacion del documento Excel";
            
            
        }
        
        
      
    }
    
    //Metodo para eliminar el Documento =>
    private void borrarDocument(String ruta){
        
        try{
        
            File archivo = new File(ruta);

            archivo.delete();
        
        }catch(Exception error){
            
            System.out.println("Error" + error.getMessage());
            
        }    
        
        
    }
    
    //Metodo para enviar mail con documento excel Ganancias: 
    public String sendMailandExcelGanancia(String ganancias, String email, String fechaInicial, String fechaFinal){
        
        try{
            
         
            String ruta = "Ganancias.xlsx";
            
             //Crear el DOCUMENTO EXCEL con Libreria POI de JAVA:
            
            //creo el libro excel
            //El parametro especifica que cada 50 filas se escribe en el disco rigido y libera la memoria, asi sucesivamente:
            XSSFWorkbook libro = new XSSFWorkbook();

            //estilos, son los colores del documento (Stylos).
            XSSFFont font = (XSSFFont) libro.createFont();
            font.setBold(true);
            XSSFCellStyle style = (XSSFCellStyle) libro.createCellStyle();
            style.setFont(font);
            XSSFCellStyle styleGris = (XSSFCellStyle) libro.createCellStyle();
            styleGris.setFont(font);
            styleGris.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
            styleGris.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleGreen = (XSSFCellStyle) libro.createCellStyle();
            styleGreen.setFont(font);
            styleGreen.setFillForegroundColor(IndexedColors.SEA_GREEN.index);
            styleGreen.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleRed = (XSSFCellStyle) libro.createCellStyle();
            styleRed.setFont(font);
            styleRed.setFillForegroundColor(IndexedColors.RED.index);
            styleRed.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleNaranja = (XSSFCellStyle) libro.createCellStyle();
            styleNaranja.setFont(font);
            styleNaranja.setFillForegroundColor(IndexedColors.TAN.index);
            styleNaranja.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleTurquesa = (XSSFCellStyle) libro.createCellStyle();
            styleTurquesa.setFont(font);
            styleTurquesa.setFillForegroundColor(IndexedColors.LIGHT_TURQUOISE.index);
            styleTurquesa.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleRosa = (XSSFCellStyle) libro.createCellStyle();
            styleRosa.setFont(font);
            styleRosa.setFillForegroundColor(IndexedColors.ROSE.index);
            styleRosa.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleAmarillo = (XSSFCellStyle) libro.createCellStyle();
            styleAmarillo.setFont(font);
            styleAmarillo.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.index);
            styleAmarillo.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleOro = (XSSFCellStyle) libro.createCellStyle();
            styleOro.setFont(font);
            styleOro.setFillForegroundColor(IndexedColors.GOLD.index);
            styleOro.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleOroObservado = (XSSFCellStyle) libro.createCellStyle();
            styleOroObservado.setFont(font);
            styleOroObservado.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleOroObservado.setBottomBorderColor(IndexedColors.RED.index);
            styleOroObservado.setFillForegroundColor(IndexedColors.YELLOW.index);
            XSSFCellStyle styleVerdeClaro = (XSSFCellStyle) libro.createCellStyle();
            styleVerdeClaro.setFont(font);
            styleVerdeClaro.setFillForegroundColor(IndexedColors.LIGHT_GREEN.index);
            styleVerdeClaro.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            XSSFCellStyle styleVerdeObservacion = (XSSFCellStyle) libro.createCellStyle();
            styleVerdeObservacion.setFont(font);
            styleVerdeObservacion.setFillForegroundColor(IndexedColors.BRIGHT_GREEN.index);
            styleVerdeObservacion.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleVerdeObservacion.setBottomBorderColor(IndexedColors.RED.index);
            XSSFCellStyle styleAzul = (XSSFCellStyle) libro.createCellStyle();
            styleAzul.setFont(font);
            styleAzul.setFillForegroundColor(IndexedColors.PALE_BLUE.index);
            styleAzul.setFillPattern(FillPatternType.SOLID_FOREGROUND);


            // Se crea una hoja dentro del libro
            XSSFSheet hoja = libro.createSheet();

            //A continuacion creamos el encabezado de la hoja excel:

            int nroColumna = 0; // se inicializa el nro columnas en 0

            //Encabezado Documento (primera FIla):

            // Se crea una fila dentro de la hoja
            XSSFRow row = hoja.createRow(0); //Se pasa en el parametro que corresponde a la fila 0

            // Se crea una celda dentro de la fila
            XSSFCell cell = row.createCell(nroColumna);
            cell.setCellValue("GANANCIAS"); //Se le da un valor a la celda
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna); //se incrementa el nro
            cell.setCellValue("FECHA INICIO");
            cell.setCellStyle(styleGris);
            cell = row.createCell(++nroColumna);
            cell.setCellValue("FECHA FIN");
            cell.setCellStyle(styleGris);
            

            //Creamos las siguientes filas y asignamos valores a las celdas:

            int nroFila = 1;  //Se reinicia el valor de filas pero en 1, ya que el 0 (Encabezado del Documento)
            nroColumna = 0;   //Se reinicia el valor de columnas en 0
            
            //Recorrido estatico sin estructura son For =>       
            
            nroColumna = 0; //Siguiente vuelta columnas se resetea a 0
            row = hoja.createRow(nroFila);
            ++nroFila; //Se incrementa el numero de Fila
            cell = row.createCell(nroColumna);  
            cell.setCellValue(ganancias); //Paso el primer parametro 
            cell.setCellStyle(styleAmarillo);
            cell = row.createCell(++nroColumna); //Incrementamos el numero de columnas
            cell.setCellValue(fechaInicial);
            cell.setCellStyle(styleAzul);
            cell = row.createCell(++nroColumna);
            cell.setCellValue(fechaFinal);
            cell.setCellStyle(styleNaranja);
                
       
           // Se crea el archivo =>
           OutputStream fileOut = new FileOutputStream(ruta);
           libro.write(fileOut);
           
           //Se envia Excel creado se pasa ruta y mail =>
            SendEmail send = new SendEmail();
            
            boolean verificar = send.sendMailEstadisticasDueño(ruta, email);
            
            if(verificar){
                
                //Se borra Documento =>
                borrarDocument(ruta);
                
            }else{
                
                borrarDocument(ruta);
                
            }
         
 
           return "Documento Excel creado con exito";
            
        }catch(Exception error){
            
             System.out.println("Error => " + error.getMessage());
            
             return "Error en la creacion del documento Excel";
            
            
        }
        
        
      
    }
    
    
    
}
