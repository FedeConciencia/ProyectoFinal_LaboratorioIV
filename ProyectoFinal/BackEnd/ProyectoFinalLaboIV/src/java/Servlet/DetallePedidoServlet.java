
package Servlet;


import Controlador.ControladorDetallePedido;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.DetallePedido;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.output.*;
import java.time.LocalDate;


//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/DetallePedidoServlet?
@WebServlet(name = "DetallePedidoServlet", urlPatterns = {"/DetallePedidoServlet"})
public class DetallePedidoServlet extends HttpServlet {

    
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
                    
                    ControladorDetallePedido controladorDetallePedido = new ControladorDetallePedido();
                    List<DetallePedido> listaDetallePedido = controladorDetallePedido.buscarAllDetallePedido();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String detallePedidoJson = gsonBuilder.toJson(listaDetallePedido);
                    respuestaServer = detallePedidoJson;
                    
                }else if(request.getParameter("action").equals("buscar")){
                    
                    ControladorDetallePedido controladorDetallePedido = new ControladorDetallePedido();    
                    DetallePedido detallePedido = controladorDetallePedido.buscarOneDetallePedido(Long.parseLong(request.getParameter("idDetallePedido"))); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String detallePedidoJson = gsonBuilder.toJson(detallePedido);
                    respuestaServer = detallePedidoJson;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    int cantidad = Integer.parseInt(request.getParameter("cantidad"));
                    double subTotal = Double.parseDouble(request.getParameter("subTotal"));
                    Long idPedido = Long.valueOf(request.getParameter("idPedido"));
                    Long idArticuloManufacturado = Long.valueOf(request.getParameter("idArticuloManufacturado"));
                    
                    
                    ControladorDetallePedido controladorDetallePedido = new ControladorDetallePedido();   
                    DetallePedido detallePedido = new DetallePedido(cantidad, subTotal, idPedido, idArticuloManufacturado);
                    controladorDetallePedido.insertarDetallePedido(detallePedido);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String detallePedidoJson = gsonBuilder.toJson(detallePedido);
                    respuestaServer = detallePedidoJson;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    Long idDetallePedido = Long.parseLong(request.getParameter("idDetallePedido"));
                    int cantidad = Integer.parseInt(request.getParameter("cantidad"));
                    double subTotal = Double.parseDouble(request.getParameter("subTotal"));
                    Long idPedido = Long.valueOf(request.getParameter("idPedido"));
                    Long idArticuloManufacturado = Long.valueOf(request.getParameter("idArticuloManufacturado"));
                    
                    
                    ControladorDetallePedido controladorDetallePedido = new ControladorDetallePedido();   
                    DetallePedido detallePedido = new DetallePedido(idDetallePedido, cantidad, subTotal, idPedido, idArticuloManufacturado);
                    controladorDetallePedido.actualizarDetallePedido(detallePedido);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String detallePedidoJson = gsonBuilder.toJson(detallePedido);
                    respuestaServer = detallePedidoJson;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorDetallePedido controladorDetallePedido = new ControladorDetallePedido();   
                    controladorDetallePedido.eliminarDetallePedido(Long.parseLong(request.getParameter("idDetallePedido")));
                    List<DetallePedido> listaDetallePedido = controladorDetallePedido.buscarAllDetallePedido();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String detallePedidoJson = gsonBuilder.toJson(listaDetallePedido);
                    respuestaServer = detallePedidoJson;
                    
                } else if (request.getParameter("action").equals("listarXId")){
                    
                    ControladorDetallePedido controladorDetallePedido = new ControladorDetallePedido();
                    List<DetallePedido> listaDetallePedido = controladorDetallePedido.buscarAllDetallePedidoId(Long.parseLong(request.getParameter("idPedido")));
                    Gson gsonBuilder = new GsonBuilder().create();
                    String detallePedidoJson = gsonBuilder.toJson(listaDetallePedido);
                    respuestaServer = detallePedidoJson;
                    
                }    
                
                //Las Tablas Uniones no tienen eliminacion Logica ya que las poseeen las entidades participes.
            
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
