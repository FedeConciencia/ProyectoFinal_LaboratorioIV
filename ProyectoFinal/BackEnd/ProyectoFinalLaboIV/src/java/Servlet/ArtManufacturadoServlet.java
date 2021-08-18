package Servlet;

import Controlador.ControladorArticuloManufacturado;
import Modelo.ArticuloManufacturado;
import com.google.gson.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/ArtManufacturadoServlet?
@WebServlet(name = "ArtManufacturadoServlet", urlPatterns = {"/ArtManufacturadoServlet"})
public class ArtManufacturadoServlet extends HttpServlet {
 
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //Modificando el response.setContentType y agregando charset=UTF-8 soluciona problema de caracteres como ñ en react:
        //https://blog.continuum.cl/generar-una-respuesta-json-desde-java-en-utf-8-e68392ae4587
        
        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        
        PrintWriter out = response.getWriter();
        String respuestaServer = "";
        try {
            mostrarElementos(request, response);
            if(request.getParameter("action") != null){
                System.out.println("ACTION " + request.getParameter("action"));
                
                if(request.getParameter("action").equals("listar")){
                    
                    ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
                    List<ArticuloManufacturado> lista = controlador.buscarAllArtManufacturado();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String cadenaJson = gsonBuilder.toJson(lista);
                    respuestaServer = cadenaJson;
                    
                }else if(request.getParameter("action").equals("buscar")){
                    
                    ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();   
                    ArticuloManufacturado articuloManufacturado = controlador.buscarOneArtManufacturado(Long.parseLong(request.getParameter("idArticulo"))); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String articuloJson = gsonBuilder.toJson(articuloManufacturado);
                    respuestaServer = articuloJson;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    // parametros
                    int tiempoEstimado = Integer.valueOf(request.getParameter("tiempoEstimado"));
                    String denominacion = request.getParameter("denominacion");
                    double precioVenta = Double.valueOf(request.getParameter("precioVenta"));
                    String imagen = request.getParameter("imagen");
                    long idRubroGeneral = Long.valueOf(request.getParameter("idRubro"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = request.getParameter("estado");
                    
                    ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
                    ArticuloManufacturado articuloManufacturado = new ArticuloManufacturado(tiempoEstimado, denominacion, precioVenta, imagen, idRubroGeneral, fechaAlta, fechaBaja, estado);
                    controlador.insertarArtManufacturado(articuloManufacturado);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String articuloJson = gsonBuilder.toJson(articuloManufacturado);
                    respuestaServer = articuloJson;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    // parametros
                    long idArticulo = Long.valueOf(request.getParameter("idArticulo"));
                    int tiempoEstimado = Integer.valueOf(request.getParameter("tiempoEstimado"));
                    String denominacion = request.getParameter("denominacion");
                    double precioVenta = Double.valueOf(request.getParameter("precioVenta"));
                    String imagen = request.getParameter("imagen");
                    long idRubroGeneral = Long.valueOf(request.getParameter("idRubro"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = request.getParameter("estado");
                    
                    ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
                    ArticuloManufacturado articuloManufacturado = new ArticuloManufacturado(idArticulo, tiempoEstimado, denominacion, precioVenta, imagen, idRubroGeneral, fechaAlta, fechaBaja, estado);
                    controlador.actualizarArtManufacturado(articuloManufacturado);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String articuloJson = gsonBuilder.toJson(articuloManufacturado);
                    respuestaServer = articuloJson;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
                    controlador.eliminarArtManufacturado(Long.parseLong(request.getParameter("idArticulo")));
                    List<ArticuloManufacturado> lista = controlador.buscarAllArtManufacturado();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String cadenaJson = gsonBuilder.toJson(lista);
                    respuestaServer = cadenaJson;
                    
                }else if(request.getParameter("action").equals("eliminarLogico")){
                    
                    // parametros id y fechaBaja
                    long idArticulo = Long.valueOf(request.getParameter("idArticulo"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    
                    ControladorArticuloManufacturado controlador = new ControladorArticuloManufacturado();
                    controlador.eliminarLogicoArtManufacturado(idArticulo, fechaBaja);
                    List<ArticuloManufacturado> lista = controlador.buscarAllArtManufacturado();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String cadenaJson = gsonBuilder.toJson(lista);
                    respuestaServer = cadenaJson;
                    
                }
            }
                    
            out.write(respuestaServer);
        }catch(Exception ex){
            ex.printStackTrace();
        } finally {
            out.close();
        }
    }
    
    
    private void mostrarElementos(HttpServletRequest request, HttpServletResponse response) throws ServletException, java.io.IOException{
        try { 
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            response.setContentType("text/html");
            
            if(!isMultipart ) {
                System.out.println("NO ES MULTIPART");
                return;
            }

            DiskFileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload upload = new ServletFileUpload(factory);

        
           // Parse the request to get file items.
           List fileItems = upload.parseRequest(request);

           // Process the uploaded file items
           Iterator i = fileItems.iterator();

           while ( i.hasNext () ) {
                FileItem fi = (FileItem)i.next();
                // Get the uploaded file parameters
                String fieldName = fi.getFieldName();
                String value = fi.getString();
                System.out.println("FieldName: " + fieldName);
                System.out.println("VALOR: " + value);
           }
           
           } catch(Exception ex) {
              System.out.println(ex);
           }
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
