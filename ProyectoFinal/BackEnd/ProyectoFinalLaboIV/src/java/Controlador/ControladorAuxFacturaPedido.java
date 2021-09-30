package Controlador;

import Conexion.Conexion;
import Modelo.AuxFacturaPedido;
import SedEmail.SendEmail;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.nio.file.Files;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.DatatypeConverter;
import java.io.*;


public class ControladorAuxFacturaPedido {
    
    //OBTENER ALL AuxFacturaPedido Sirve para Generar la Factura:
    public List<AuxFacturaPedido> buscarAllAuxFacturaPedido(long id) {

        Connection conexion = null;
        Conexion con = new Conexion();
        AuxFacturaPedido auxFacturaPedido = null;
        List<AuxFacturaPedido> listaAuxFacturaPedido = new ArrayList<AuxFacturaPedido>();
        PreparedStatement ps = null;  //Este objeto permite guardar las consultas que hacemos a la BD.
        ResultSet rs = null;  // este objeto lo usamos cuando obtenemos algo de la base de datos.

        try {

            conexion = con.getConnection(); //metodo getConnection, logueamos el usuario.

            ps = conexion.prepareStatement("SELECT p.tipoEnvio AS tipoEnvio, f.codigo AS codigo, \n" +
            "f.montoDescuento as Descuento, f.formaPago AS MetodoPago, f.totalVenta AS Total, d.cantidad AS Cantidad,\n" +
            "d.subTotal AS SubTotal, a.denominacion AS Nombre, a.precioVenta AS PrecioUnitario FROM pedido AS p \n" +
            "INNER JOIN factura AS f ON p.idPedido = f.idPedido INNER JOIN detalle_factura AS d ON \n" +
            "f.idFactura = d.idFactura INNER JOIN articulo_manufacturado AS a ON d.idArticulo = a.idArticulo WHERE f.idFactura = ?");

            ps.setLong(1, id);
            
            rs = ps.executeQuery();

            while (rs.next()) {

                int tipoEnvio = rs.getInt(1); //cada numero del parametro hace referencia al dato del campo que se desea obtener = idPersona
                String codigo = rs.getString(2);
                double montoDescuento = rs.getDouble(3);
                String metodoPago = rs.getString(4);
                double total = rs.getDouble(5);
                int cantidad = rs.getInt(6);
                double subTotal = rs.getDouble(7);
                String denominacion = rs.getString(8);
                double precioVenta = rs.getDouble(9);
                
                auxFacturaPedido = new AuxFacturaPedido(tipoEnvio, codigo, montoDescuento, metodoPago, total, cantidad, subTotal, denominacion, precioVenta);

                listaAuxFacturaPedido.add(auxFacturaPedido);

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

        return listaAuxFacturaPedido; //devolvemos la lista de alumnos encontrado

    }
    
    //Crear documento PDF se importa librerias INTEX=>
    
    public String crearPDF(long id, String email){
        
        try{
        
            System.out.println("VALOR ID => " + id);

            //Obtenemos los datos de la consulta a la base para crear Factura =>
            ControladorAuxFacturaPedido controlador = new ControladorAuxFacturaPedido();
            List<AuxFacturaPedido> listaAuxFacturaPedido =  controlador.buscarAllAuxFacturaPedido(id);

            ////convertimos la coleccion de tipo AuxFacturaPedido a un array =>

            AuxFacturaPedido [] lista = new AuxFacturaPedido[listaAuxFacturaPedido.size()];

            lista = listaAuxFacturaPedido.toArray(lista);

            for(int i = 0; i < lista.length; i++){


                System.out.println(lista[i].toString());

            }
        
        
            
            //Se establecen caracteristicas para la letra del documento:
            Font titulo = new Font(Font.COURIER, 14, Font.BOLD);
            Font textoBold = new Font(Font.COURIER, 11, Font.BOLD);
            Font texto = new Font(Font.COURIER, 11, Font.NORMAL);
            
            //Creo el documento con un objeto Document (Libreria Itex), se asigna un tamaño y margenes:
            Document document = new Document(PageSize.A4, 30, 30, 50, 30);//float marginLeft, float marginRight, float marginTop, float marginBottom
            
            //Se crea ruta propia del documento con el codigo del pedido Unico =>
            String ruta = String.valueOf(lista[0].getCodigo()) + ".pdf";
            
            //Permite mostar el archivo creado en formato PDF =>
            FileOutputStream archivo = new FileOutputStream(ruta);
            PdfWriter.getInstance(document, archivo);
            
            document.open(); //Abro el documento, para escribirlo (escribir se deben crear objetos)
            
            //Se crea Objeto Parrafo("Texto", Caracteristicas establecidas):
            Paragraph paragraph1 = new Paragraph("FACTURA EL BUEN SABOR:", titulo);

            //Se agrega el parrafo al documento:
            document.add(paragraph1);
            
            //Obtener la Fecha y Hora =>
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            
            //Se crea Objeto Parrafo("Texto", Caracteristicas establecidas):
            Paragraph paragraph2 = new Paragraph("FECHA: " + dtf.format(LocalDateTime.now()), titulo);

            //Se agrega el parrafo al documento:
            document.add(paragraph2);

            //Creamos una Tabla: parametro(se indica el numero de columnas):
            PdfPTable table = new PdfPTable(2);

            //Se pasa el ancho de la misma 100%:
            table.setWidthPercentage(100);
            
            //(1 Fila) COLUMNA 1:
            PdfPCell celda1 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
            celda1.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(2 Fila) COLUMNA 2:
            PdfPCell celda2 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
            celda2.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(1 Fila) COLUMNA 1:
            PdfPCell celda3 = new PdfPCell(new Phrase("CODIGO FACTURA: ", textoBold));
            celda3.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(2 Fila) COLUMNA 2:
            PdfPCell celda4 = new PdfPCell(new Phrase(lista[0].getCodigo(), textoBold));
            celda4.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(1 Fila) COLUMNA 1:
            PdfPCell celda5 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
            celda5.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(2 Fila) COLUMNA 2:
            PdfPCell celda6 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
            celda6.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            PdfPCell celda7 = null;
            PdfPCell celda8 = null;
            
            if(lista[0].getTipoEnvio() == 1){

                //(1 Fila) COLUMNA 1:
                celda7 = new PdfPCell(new Phrase("TIPO DE ENVIO: ", textoBold));
                celda7.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
                //(2 Fila) COLUMNA 2:
                celda8 = new PdfPCell(new Phrase("DOMICILIO", textoBold));
                celda8.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

            }else{

                //(1 Fila) COLUMNA 1:
                celda7 = new PdfPCell(new Phrase("TIPO DE ENVIO: ", textoBold));
                celda7.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
                //(2 Fila) COLUMNA 2:
                celda8 = new PdfPCell(new Phrase("RETIRO LOCAL", textoBold));
                celda8.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

            }
            
            //(1 Fila) COLUMNA 1:
            PdfPCell celda9 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
            celda9.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(2 Fila) COLUMNA 2:
            PdfPCell celda10 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
            celda10.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(1 Fila) COLUMNA 1:
            PdfPCell celda11 = new PdfPCell(new Phrase("METODO PAGO: ", textoBold));
            celda11.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(2 Fila) COLUMNA 2:
            PdfPCell celda12 = new PdfPCell(new Phrase(lista[0].getMetodoPago(), textoBold));
            celda12.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
             //(1 Fila) COLUMNA 1:
            PdfPCell celda13 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
            celda13.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //(2 Fila) COLUMNA 2:
            PdfPCell celda14 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
            celda14.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
            //Se agregan las celdas al documento:
            table.addCell(celda1);
            table.addCell(celda2);
            table.addCell(celda3);
            table.addCell(celda4);
            table.addCell(celda5);
            table.addCell(celda6);
            table.addCell(celda7);
            table.addCell(celda8);
            table.addCell(celda9);
            table.addCell(celda10);
            table.addCell(celda11);
            table.addCell(celda12);
            table.addCell(celda13);
            table.addCell(celda14);
            
            
            for (int i = 0; i < lista.length; i++) {

                //(1ra Fila) COLUMNA 1:
                PdfPCell celda15 = new PdfPCell(new Phrase("PRODUCTO: ", textoBold));
                celda15.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

                //(1ra Fila) COLUMNA 2:
                PdfPCell celda16 = new PdfPCell(new Phrase(String.valueOf(lista[i].getDenominacion()), textoBold));
                celda16.setBorder(Rectangle.NO_BORDER);
                
                //(1ra Fila) COLUMNA 1:
                PdfPCell celda17 = new PdfPCell(new Phrase("CANTIDAD: ", textoBold));
                celda17.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

                //(1ra Fila) COLUMNA 2:
                PdfPCell celda18 = new PdfPCell(new Phrase(String.valueOf(lista[i].getCantidad()), textoBold));
                celda18.setBorder(Rectangle.NO_BORDER);
                
                //(1ra Fila) COLUMNA 1:
                PdfPCell celda19 = new PdfPCell(new Phrase("PRECIO UNITARIO: ", textoBold));
                celda19.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

                //(1ra Fila) COLUMNA 2:
                PdfPCell celda20 = new PdfPCell(new Phrase("$ " + String.valueOf(lista[i].getPrecioVenta()), textoBold));
                celda20.setBorder(Rectangle.NO_BORDER);
                
                //(1ra Fila) COLUMNA 1:
                PdfPCell celda21 = new PdfPCell(new Phrase("SUBTOTAL: ", textoBold));
                celda21.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

                //(1ra Fila) COLUMNA 2:
                PdfPCell celda22 = new PdfPCell(new Phrase("$ " + String.valueOf(lista[i].getSubTotal()), textoBold));
                celda22.setBorder(Rectangle.NO_BORDER);
                
                //(1 Fila) COLUMNA 1:
                PdfPCell celda23 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
                celda23.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE
            
                //(2 Fila) COLUMNA 2:
                PdfPCell celda24 = new PdfPCell(new Phrase("---------------------------------------", textoBold));
                celda24.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

              
                //Se agregan las celdas al documento:
                table.addCell(celda15);
                table.addCell(celda16);
                table.addCell(celda17);
                table.addCell(celda18);
                table.addCell(celda19);
                table.addCell(celda20);
                table.addCell(celda21);
                table.addCell(celda22);
                table.addCell(celda23);
                table.addCell(celda24);
               

            }
            
            //(1ra Fila) COLUMNA 1:
            PdfPCell celda25 = new PdfPCell(new Phrase("DESCUENTO: ", textoBold));
            celda25.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

            //(1ra Fila) COLUMNA 2:
            PdfPCell celda26 = new PdfPCell(new Phrase("$ " + String.valueOf(lista[0].getMontoDescuento()), textoBold));
            celda26.setBorder(Rectangle.NO_BORDER);
            
            //(1ra Fila) COLUMNA 1:
            PdfPCell celda27 = new PdfPCell(new Phrase("TOTAL: ", textoBold));
            celda27.setBorder(Rectangle.NO_BORDER);  //Se le puede agregar bordes con RECTANGLE

            //(1ra Fila) COLUMNA 2:
            PdfPCell celda28 = new PdfPCell(new Phrase("$ " + String.valueOf(lista[0].getTotal()), textoBold));
            celda28.setBorder(Rectangle.NO_BORDER);
            
            
            table.addCell(celda25);
            table.addCell(celda26);
            table.addCell(celda27);
            table.addCell(celda28);
            
            
            //Se agrega la tabla al documento
            document.add(table);
            

            //Se cierra el documento
            document.close();
            
                    
            //Se envia PDF creado se pasa ruta y mail =>
            SendEmail send = new SendEmail();
            if(send.sendMailFactura(ruta, email)){
                
                borrarDocument(ruta);
                
            }else{
                
                borrarDocument(ruta);
                
            }
            
            return "Documento PDF creado con exito";
            
        }catch(Exception error){
            
            System.out.println("Error => " + error.getMessage());
            
            return "Error en la creacion del documento PDF";
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
    
}
