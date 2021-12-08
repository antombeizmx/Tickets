<?php
include_once("../modelo/acciones.php");
if(isset($_GET['info']))
{
    $idUsuario = $_SESSION['idUsuario'];
    $idSesion = $_SESSION['idSesion'];
    $tipo = $_SESSION['tipoUsuario'];
    $id_informacion = $_GET['info'];
    $modelo = new Acciones();
    $datos = $modelo->tomar_informacion_ticket($idUsuario,$idSesion,$id_informacion,$tipo); 
    $datos = $datos[0];
}

if(isset($_SESSION['idSesion']))
{
    $verificacion = $modelo->checarSesion($_SESSION['idUsuario'],$_SESSION['idSesion']);
    $verificacionEmpresa = $modelo->checarSesionEmpresa($_SESSION['idUsuario'],$_SESSION['idSesion']);
    $verificacionEmpleado = $modelo->checarSesionEmpleado($_SESSION['idUsuario'],$_SESSION['idSesion']);
    if($verificacion==$_SESSION['idSesion'] || $verificacionEmpresa==$_SESSION['idSesion'] || $verificacionEmpleado==$_SESSION['idSesion'])
    {
        echo '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ticket</title>
            <link rel="stylesheet" href="../recursos/css/estilos.css" type="text/css">
            <link rel="stylesheet" href="../recursos/css/estilos_ticket.css" type="text/css">
            <link rel="shortcut icon" href="../recursos/img/logo.ico" type="image/x-icon">
        </head>
        <body>
        ';
        echo'
        <div id="contenedor">
            <input type="hidden" id="id_ticket" value="'. $id_informacion.'">
            <input type="hidden" id="id_nombre" value="'.$_SESSION['nombreUsuario'].'">
            <input type="hidden" id="id_tipo" value="'.$_SESSION['tipoUsuario'].'">
            <input type="hidden" id="id_referencia" value="'.$datos['referencia'].'">
            
            <div class="contenedor_menu">
                ';
                
                    if($datos['estatus'] == "0" || $datos['estatus'] == "2")
                    {
                        echo '<p class="boton_menu" onclick="descargar_ticket();">Descargar Reporte</p>';
                    }
                
                    if($tipo == "EMPLEADO" || $tipo == "ADMINISTRADOR")
                    {
                        if($datos['estatus'] == "2" || $datos['estatus'] == "0")
                        {
                            echo '<input type="hidden">';
                        }
                        else
                        {
                            echo '<p class="boton_menu" onclick="dialogos_cerrar();">Cerrar</p>';
        
                        }
                    } 
               echo '
               <div id="tabla_estado">
                   <p id="header_estado">
                       Estado
                   </p>
                   <p id="contenedor_estado">
                       '.$datos['estatus'].'
                   </p>
               </div>
            </div>
            <div class="contenedor_informacion">
                    <div class="contenedor_titulo">
                        <h1>Informacion ticket</h1>
                    </div>
                    <div class="contenedor_division">
                        <div class="lados_contenedor">
                            <div class="contenedor_info_item">
                                <div class="info_item">
                                    <p class="titulo_item"><strong>Nombre Empresa</strong></p>
                                    <p class="text_item">'. $datos['nombreEmpresa'].'</p>
                                </div>
                                <div class="info_item">
                                    <p class="titulo_item"><strong>RFC Empresa</strong></p>
                                    <p class="text_item">'. $datos['rfcEmpresa'].'</p>
                                </div>
                        </div>
                        <div class="contenedor_info_item">
                                <div class="info_item">
                                    <p class="titulo_item"><strong>Fecha y hora</strong></p>
                                    <p class="text_item">'. $datos['fechaRegistro']." ".$datos['horaRegistro'].'</p>
                                </div>
                                <div class="info_item">
                                    <p class="titulo_item"><strong>Tipo Servicio</strong></p>
                                    <p class="text_item">'. $datos['tipoServicio'].'</p>
                                </div>
                                <div class="info_item">
                                    <p class="titulo_item"><strong>Prioridad Servicio</strong></p>
                                    <p class="text_item">'. $datos['prioridad'].'</p>
                                </div>
                        </div>
                        <div class="contenedor_info_item">
                                <div class="info_item">
                                    <p class="titulo_item"><strong>Descripcion del problema</strong></p>
                                    <p class="text_item1">'. $datos['descripcion'].'</p>
                                </div>     
                        </div>
                        '; 
                            if($datos['estatus'] == "0" || $datos['estatus'] == "2")
                            {
                                echo '<div class="contenedor_info_item">
                                <div class="info_item">
                                    <p class="titulo_item"><strong>Empleado quien cerro el ticket</strong></p>
                                    <p class="text_item1">';
                                    echo $datos['empleadoCierre'];
                                    echo'</p>
                                </div>
                                </div>';
                            }
                        echo'     
                        </div>
                        <div class="lados_contenedor">
                            <div class="contenedor_info_item">
                                    <div class="info_item">
                                        <p class="titulo_item"><strong> Comentarios</strong></p>
                                        <!-- <p class="text_item">Comentario - Admin - 21.12.21</p> -->
                                        <table>
                                            <tr>
                                                ';
                                                $com =  $datos['comentarios'];
                                                $arrayComentario = explode("<br>",$com);
                                                $arrayComentario = array_filter($arrayComentario);
                                                //echo '<pre>';
                                                //var_dump($arrayComentario);
                                                //echo '</pre>';
                                                for($i = 0; $i < count($arrayComentario); $i++)
                                                {
                                                    $cadenaComentario = '<p class="text_item1">'.str_replace("****"," ",$arrayComentario[$i]).'</p>';
                                                    echo $cadenaComentario;
                                                    
                                                }
                                                //echo count($arrayComentario);
        
                                                //echo str_replace("****"," ",$com);
                                            echo'
                                            </tr>
                                        </table>
                                    </div>
                            </div>
                            <div class="contenedor_info_item">
                                    <div class="info_item">
                                        ';
                                            if ($datos['estatus'] == "1")
                                            {
                                                echo '
                                                <p class="titulo_item"><strong> Crear Comentario</strong></p>
                                                <textarea name="" id="textarea_comentario" cols="30" rows="10"></textarea>
                                                <button id="" class="boton_alerta" onclick="agregar_comentario();">Comentar</button>
                                                ';
                                            }
                                        echo'
                                    </div>
                            </div>
        
                        </div>
                    </div>
            </div>
        </div><script src="../recursos/js/funcionesTickets.js"></script>
        </body>
        </html>    
        ';
    }
    else
    {
        header("Location: ../");
        echo "sin coincidencia";
    }

}
else{
    header("Location: ../");
    echo "no disponible";
}

?>
