<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function

include_once("../modelo/acciones.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$HOST = 'tickets-switchmx.com';
$USERNAME = 'recuperacion@tickets-switchmx.com';
$PASSWORD = 'Switch250117.';
$PORT = 465;
$host_name = 'https://tickets-switchmx.com/';

if(isset($_POST['correo_destino'])){
    $correo_destino = $_POST['correo_destino'];
    $modelo = new Acciones();
    $comprobacion =$modelo->comprobar_correo($correo_destino);

    if($comprobacion=="no hay coincidencias")
    {
        echo "El correo no existe";
    }
    else
    {
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);

        try {
            //Server settings
            // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = $HOST;                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = $USERNAME;                     //SMTP username
            $mail->Password   = $PASSWORD;                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
            $mail->Port       = $PORT;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            //Recipients
            $mail->setFrom($USERNAME, 'Switch');
            $mail->addAddress($correo_destino);     //Add a recipient
            // $mail->addAddress('ellen@example.com');               //Name is optional
            // $mail->addReplyTo('info@example.com', 'Information');
            // $mail->addCC('cc@example.com');
            // $mail->addBCC('bcc@example.com');

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Cambiar contrasena';
            $mail->Body    = 'Para cambiar la contrasena entra al siguiente enlace <br><a href="'.$host_name.'verificar.php?token='.$comprobacion.'">Cambiar contrasena</a>';
            $mail->send();
            echo 'Correo enviado';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
else
{
    echo "error";
}
?>