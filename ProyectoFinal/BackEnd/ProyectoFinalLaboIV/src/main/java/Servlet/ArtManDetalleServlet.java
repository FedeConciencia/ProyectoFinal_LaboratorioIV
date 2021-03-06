package Servlet;

import Controlador.ControladorArticuloManufacturadoDetalle;
import Modelo.ArticuloManufacturadoDetalle;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/ArtManDetalleServlet?
@WebServlet(name = "ArtManDetalleServlet", urlPatterns = {"/ArtManDetalleServlet"})
public class ArtManDetalleServlet extends HttpServlet {
 
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
                    
                    ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
                    List<ArticuloManufacturadoDetalle> lista = controlador.buscarAllArtManDetalle();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String cadenaJson = gsonBuilder.toJson(lista);
                    respuestaServer = cadenaJson;
                    
                }else if(request.getParameter("action").equals("buscar")){
                    
                    ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle(); 
                    ArticuloManufacturadoDetalle artManDetalle = controlador.buscarOneArtManDetalle(Long.parseLong(request.getParameter("idArticuloDetalle"))); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String clienteJson = gsonBuilder.toJson(artManDetalle);
                    respuestaServer = clienteJson;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    // parametros
                    double cantidad = Double.valueOf(request.getParameter("cantidad"));
                    String unidadMedida = String.valueOf(request.getParameter("unidadMedida"));
                    long idArticuloManufacturado = Long.valueOf(request.getParameter("idArticuloManufacturado"));
                    long idArticuloInsumo = Long.valueOf(request.getParameter("idArticuloInsumo"));
                    
                    ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
                    ArticuloManufacturadoDetalle artManDetalle = new ArticuloManufacturadoDetalle(cantidad, unidadMedida, idArticuloManufacturado, idArticuloInsumo);
                    controlador.insertarArtManDetalle(artManDetalle);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String cadenaJson = gsonBuilder.toJson(artManDetalle);
                    respuestaServer = cadenaJson;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    // parametros
                    long idArticuloDetalle = Long.valueOf(request.getParameter("idArticuloDetalle"));
                    double cantidad = Double.valueOf(request.getParameter("cantidad"));
                    String unidadMedida = String.valueOf(request.getParameter("unidadMedida"));
                    long idArticuloManufacturado = Long.valueOf(request.getParameter("idArticuloManufacturado"));
                    long idArticuloInsumo = Long.valueOf(request.getParameter("idArticuloInsumo"));
                    
                    ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
                    ArticuloManufacturadoDetalle artManDetalle = new ArticuloManufacturadoDetalle(idArticuloDetalle, cantidad, unidadMedida, idArticuloManufacturado, idArticuloInsumo);
                    controlador.actualizarArtManDetalle(artManDetalle);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String cadenaJson = gsonBuilder.toJson(artManDetalle);
                    respuestaServer = cadenaJson;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorArticuloManufacturadoDetalle controlador = new ControladorArticuloManufacturadoDetalle();
                    controlador.eliminarArtManDetalle(Long.parseLong(request.getParameter("idArticuloDetalle")));
                    List<ArticuloManufacturadoDetalle> listaArtManDetalle = controlador.buscarAllArtManDetalle();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String cadenaJson = gsonBuilder.toJson(listaArtManDetalle);
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

