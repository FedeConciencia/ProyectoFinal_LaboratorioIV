
package Servlet;


import Controlador.ControladorFactura;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import Modelo.Factura;
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


//Se especifica el nombre y ruta de la clase: 'http://localhost:8080/ProyectoFinalLaboIV/FacturaServlet?
@WebServlet(name = "FacturaServlet", urlPatterns = {"/FacturaServlet"})
public class FacturaServlet extends HttpServlet {

    
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
                    
                    ControladorFactura controladorFactura = new ControladorFactura();
                    List<Factura> listaFactura = controladorFactura.buscarAllFactura();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String facturaJson = gsonBuilder.toJson(listaFactura);
                    respuestaServer = facturaJson;
                    
                }else if(request.getParameter("action").equals("buscar")){
                    
                    ControladorFactura controladorFactura = new ControladorFactura();    
                    List<Factura> listaFactura = new ArrayList<Factura>();
                    Factura factura = controladorFactura.buscarOneFactura(Long.parseLong(request.getParameter("idFactura"))); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String facturaJson = gsonBuilder.toJson(factura);
                    respuestaServer = facturaJson;
                    
                }else if(request.getParameter("action").equals("insertar")){
                    
                    
                    String codigo = (request.getParameter("codigo"));
                    double montoDescuento = Double.parseDouble(request.getParameter("montoDescuento"));
                    String formaPago = (request.getParameter("formaPago"));
                    double totalVenta = Double.parseDouble(request.getParameter("totalVenta"));
                    Long idPedido = Long.valueOf(request.getParameter("idPedido"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorFactura controladorFactura = new ControladorFactura();  
                    Factura factura = new Factura(codigo, montoDescuento, formaPago, totalVenta, idPedido, fechaAlta, fechaBaja, estado);
                    controladorFactura.insertarFactura(factura);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String facturaJson = gsonBuilder.toJson(factura);
                    respuestaServer = facturaJson;
                    
                }else if(request.getParameter("action").equals("actualizar")){
                    
                    Long idFactura = Long.parseLong(request.getParameter("idFactura"));
                    String codigo = (request.getParameter("codigo"));
                    double montoDescuento = Double.parseDouble(request.getParameter("montoDescuento"));
                    String formaPago = (request.getParameter("formaPago"));
                    double totalVenta = Double.parseDouble(request.getParameter("totalVenta"));
                    Long idPedido = Long.valueOf(request.getParameter("idPedido"));
                    LocalDate fechaAlta = LocalDate.parse(request.getParameter("fechaAlta"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    String estado = (request.getParameter("estado"));
                    
                    ControladorFactura controladorFactura = new ControladorFactura();  
                    Factura factura = new Factura(idFactura, codigo, montoDescuento, formaPago, totalVenta, idPedido, fechaAlta, fechaBaja, estado);
                    controladorFactura.actualizarFactura(factura);
                    Gson gsonBuilder = new GsonBuilder().create();
                    String facturaJson = gsonBuilder.toJson(factura);
                    respuestaServer = facturaJson;
                    
                }else if(request.getParameter("action").equals("eliminar")){
                    
                    ControladorFactura controladorFactura = new ControladorFactura();
                    controladorFactura.eliminarFactura(Long.parseLong(request.getParameter("idFactura")));
                    List<Factura> listaFactura = controladorFactura.buscarAllFactura();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String facturaJson = gsonBuilder.toJson(listaFactura);
                    respuestaServer = facturaJson;
                    
                }else if(request.getParameter("action").equals("eliminarLogico")){
                    
                    Long idFactura = Long.parseLong(request.getParameter("idFactura"));
                    LocalDate fechaBaja = LocalDate.parse(request.getParameter("fechaBaja"));
                    
                    ControladorFactura controladorFactura = new ControladorFactura();
                    controladorFactura.eliminarLogicoFactura(idFactura, fechaBaja);
                    List<Factura> listaFactura = controladorFactura.buscarAllFactura();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String facturaJson = gsonBuilder.toJson(listaFactura);
                    respuestaServer = facturaJson;
                    
                }else if(request.getParameter("action").equals("buscarUltimoId")){
                    
                    ControladorFactura controladorFactura = new ControladorFactura();
                    long idFactura = controladorFactura.buscarUltimoId();
                    Gson gsonBuilder = new GsonBuilder().create();
                    String facturaJson = gsonBuilder.toJson(idFactura);
                    respuestaServer = facturaJson;
                    
                }else if(request.getParameter("action").equals("proximoId")){
                    
                    ControladorFactura controladorFactura = new ControladorFactura();    
                    long idFactura = controladorFactura.proximoId(); 
                    Gson gsonBuilder = new GsonBuilder().create();
                    String facturaJson = gsonBuilder.toJson(idFactura);
                    respuestaServer = facturaJson;
                    
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