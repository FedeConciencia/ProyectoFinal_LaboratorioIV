
package SedEmail;

import java.io.IOException;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import com.lowagie.text.Document;
import java.io.File;

public class SendEmail {

	public void sendMail() {
            
            /*
            //Enviar Mail sin Attachment =>
		//authentication info
		final String username = "alumnoutn424@yahoo.com"; 
		final String password = "kviegoamvcxfnyhi"; //password account settings app
		String fromEmail = "alumnoutn424@yahoo.com"; //origen
		String toEmail = "federicosabatini@gmail.com"; //destino
		
		Properties properties = new Properties();
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.mail.yahoo.com");
		properties.put("mail.smtp.port", "587");
		
		Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username,password);
			}
		});
                
		//Start our mail message
		MimeMessage msg = new MimeMessage(session);
		try {
			msg.setFrom(new InternetAddress(fromEmail));
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
			msg.setSubject("EL BUEN SABOR => FACTURA");
                        msg.setText("El Buen Sabor le envia su Factura.\nMuchas Gracias por elegirnos.\nSaludos.");
		
			
			Transport.send(msg);
			System.out.println("Sent message");
                        
                        
		} catch (MessagingException e) {
			e.printStackTrace();
		} 
            */
            
            //Enviar Mail con Attachment =>
            
            //authentication info
		final String username = "alumnoutn424@yahoo.com";
		final String password = "kviegoamvcxfnyhi";
		String fromEmail = "alumnoutn424@yahoo.com";
		String toEmail = "federicosabatini@gmail.com";
		
		Properties properties = new Properties();
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.mail.yahoo.com");
		properties.put("mail.smtp.port", "587");
		
		Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username,password);
			}
		});
		//Start our mail message
		MimeMessage msg = new MimeMessage(session);
		try {
			msg.setFrom(new InternetAddress(fromEmail));
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
			msg.setSubject("EL BUEN SABOR => FACTURA");
			
			Multipart emailContent = new MimeMultipart();
			
			//Text body part
			MimeBodyPart textBodyPart = new MimeBodyPart();
			textBodyPart.setText("El Buen Sabor le envia su Factura.\nMuchas Gracias por elegirnos.\nSaludos.");
			
			//Attachment body part.
			MimeBodyPart pdfAttachment = new MimeBodyPart();
                        //Ruta del Proyecto =>
                        pdfAttachment.attachFile("C:/Users/fedsa/Desktop/Proyecto_Final_LaboIV/ProyectoFinal_LaboratorioIV/ProyectoFinal/BackEnd/ProyectoFinalLaboIV/Factura.pdf");
                        
			//Attach body parts
			emailContent.addBodyPart(textBodyPart);
			emailContent.addBodyPart(pdfAttachment);
			
			//Attach multipart to message
			msg.setContent(emailContent);
			Transport.send(msg);
			System.out.println("Sent message");
                        
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
