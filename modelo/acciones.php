<?php
session_start();
include_once("conexion.php");
class Acciones
{
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //////////////ACCIONES administradores////////////////

    public function tomar_informacion_ticket($id,$sesion,$idTicket,$tipo_usuario)
    {

        $verificacion  = $this->checarSesion($id,$sesion);
        $verificacionEmpleado  = $this->checarSesionEmpleado($id,$sesion);
        $verificacionEmpresa  = $this->checarSesionEmpresa($id,$sesion);
        if($verificacion==$sesion || $verificacionEmpleado==$sesion || $verificacionEmpresa == $sesion)
        {
            $sql = "SELECT * FROM info_tickets WHERE id=:id";
            $modelo = new Servidor();
            $conexion= $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":id",$idTicket);
            $parametro->execute();
            $rows = $parametro->rowCount();
            if($rows==0)
            {
                return "no hay coincidencias";
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            }
        }
        else
        {
            return "ERROR";
        } 
    }

    public function tomar_informacion_factura($id,$sesion,$rfcEmpresa)
    {

        $verificacion  = $this->checarSesion($id,$sesion);
        $verificacionEmpleado  = $this->checarSesionEmpleado($id,$sesion);
        $verificacionEmpresa  = $this->checarSesionEmpresa($id,$sesion);
        if($verificacion==$sesion || $verificacionEmpleado==$sesion || $verificacionEmpresa == $sesion)
        {
            $sql = "SELECT razonsocialEmpresa ,domicilioEmpresa, numerocalleEmpresa, coloniaEmpresa, telefonoEmpresa, correoEmpresa FROM empresas WHERE rfcEmpresa=:id";
            $modelo = new Servidor();
            $conexion= $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":id",$rfcEmpresa);
            $parametro->execute();
            $rows = $parametro->rowCount();
            if($rows==0)
            {
                return "no hay coincidencias";
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            }
        }
        else
        {
            return "ERROR";
        } 
    }


    // agregar comentario 

    public function agregar_comentario($id,$idSesion,$id_ticket,$comentario)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        $verificacionEmpleado  = $this->checarSesionEmpleado($id,$idSesion);
        $verificacionEmpresa  = $this->checarSesionEmpresa($id,$idSesion);
        if($verificacion==$idSesion || $verificacionEmpleado==$idSesion || $verificacionEmpresa==$idSesion)
        {
            $modelo= new Servidor();
            $conexion= $modelo->conectar();
            $sql = "";
            $parametro ="";
            // seleccionar comentarios del ticket por pdo
            $sql = "SELECT comentarios FROM info_tickets WHERE id=:id_ticket";
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":id_ticket",$id_ticket);
            $parametro->execute();
            $rows = $parametro->rowCount();
            if($rows==0)
            {
                return "no hay coincidencias";
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);
                $comentarios = $datos[0]["comentarios"];
                $comentarios = $comentarios.$comentario;
                $sql = "UPDATE info_tickets SET comentarios=:comentarios WHERE id=:id_ticket";
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":comentarios",$comentarios);
                $parametro->bindParam(":id_ticket",$id_ticket);
                $parametro->execute();
                return "comentario agregado";
            }


            // $sql2 = "UPDATE info_tickets SET comentarios=:comentario WHERE id=:id";

            // $parametro2 = $conexion->prepare($sql2);
            // $parametro2->bindParam(":id",$id_ticket);
            // $parametro2->bindParam(":comentario",$comentario);
            
            // if($parametro2->execute())
            // {
            //     return json_encode("LISTO");
            // }
        }
        else
        {
            return json_encode("ERROR");
        }
    }


    //////Agregar administrador///////
    public function agregar_ticket($id,$idSesion,$nombreEmpresa,$rfcEmpresa,$tipoServicio,$prioridad,$descripcion)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        $verificacionEmpresa = $this -> checarSesionEmpresa($id,$idSesion);
        if($verificacion==$idSesion || $verificacionEmpresa == $idSesion)
        {
            $strVacio= " ";
            $fechaReg =date("d/m/Y");
            $horaReg =date("H:i:s");
            $servidor = new Servidor();
            $conexion = $servidor->conectar();
            $referencia = rand(100000,999999);
            $sql_vericar = "SELECT referencia FROM info_tickets WHERE referencia=:referencia";
            $existe = $conexion->prepare($sql_vericar);
            $existe->bindParam(":referencia",$referencia);
            $existe->execute();
            $estatus = "1";
            $cierrempleado = " ";
            if($existe->rowCount()==0)
            {
                $sql = "INSERT INTO info_tickets
                (referencia,
                nombreEmpresa,
                rfcEmpresa,
                empleadoCierre,
                fechaRegistro,
                fechaCierre,
                horaRegistro,
                horaCierre,
                tipoServicio,
                prioridad,
                descripcion,
                estatus,
                comentarios
                ) 
                VALUE(
                :referencia,
                :nombreEmpresa,
                :rfcEmpresa,
                :empleadoCierre,
                :fechaRegistro,
                :fechaCierre,
                :horaRegistro,
                :horaCierre,
                :tipoServicio,
                :prioridad,
                :descripcion,
                :estatus,
                :comentarios)";
    
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":referencia",$referencia);
                $parametro->bindParam(":nombreEmpresa",$nombreEmpresa);
                $parametro->bindParam(":rfcEmpresa",$rfcEmpresa);
                $parametro->bindParam(":empleadoCierre",$strVacio);
                $parametro->bindParam(":fechaRegistro",$fechaReg);
                $parametro->bindParam(":fechaCierre",$strVacio);
                $parametro->bindParam(":horaRegistro",$horaReg);
                $parametro->bindParam(":horaCierre",$strVacio);
                $parametro->bindParam(":tipoServicio",$tipoServicio);
                $parametro->bindParam(":prioridad",$prioridad);
                $parametro->bindParam(":descripcion",$descripcion);
                $parametro->bindParam(":estatus",$estatus);
                $parametro->bindParam(":comentarios",$strVacio);
    
                if($parametro->execute())
                {
                    return "Ticket dado de alta";
                }
                else
                {
                    return "ERROR";
                }
            }
            else
            {
                return "Ya un ticket con el folio existente";
            }
        }
        else
        {
            return "ERROR";
        } 
    }

    public function tomar_nombre_empresas($id,$sesion,$coincidencia)
    {
        $verificacion  = $this->checarSesion($id,$sesion);
        if($verificacion==$sesion)
        {
            $coincidencia = $coincidencia."[a-zA-Z0-9 ]";
            $sql ="SELECT nombreEmpresa,rfcEmpresa FROM empresas WHERE nombreEmpresa REGEXP :coincidencia AND activo ='1'";
            $modelo = new Servidor();
            $conn = $modelo->conectar();
            $parametro = $conn->prepare($sql);
            $parametro->bindParam(":coincidencia",$coincidencia);
            $parametro->execute();
            $rows = $parametro->rowCount();
            if($rows==0)
            {
                return json_encode("sin coincidencias");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);
                return json_encode($datos);
            }

        }
        else
        {
            return json_encode("ERROR");
        }        
    }


    public function tomar_datos_ticket_empresa($id,$sesion)
    {
        $verificacion  = $this->checarSesionEmpresa($id,$sesion);
        if($verificacion==$sesion)
        {
            $sql ="SELECT nombreEmpresa,rfcEmpresa FROM empresas WHERE  id=:coincidencia";
            $modelo = new Servidor();
            $conn = $modelo->conectar();
            $parametro = $conn->prepare($sql);
            $parametro->bindParam(":coincidencia",$id);
            $parametro->execute();
            $rows = $parametro->rowCount();
            if($rows==0)
            {
                return "sin coincidencias";
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);
                return $datos;
            }

        }
        else
        {
            return "ERROR";
        }        
    }

        public function tomarTicketsActivos($id,$idSesion)
        {
            $verificacion  = $this->checarSesion($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                referencia,
                nombreEmpresa,
                rfcEmpresa,
                fechaRegistro,
                horaRegistro,
                tipoServicio,
                prioridad,
                estatus FROM info_tickets WHERE estatus=:estatus";
                $estatus = "1";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":estatus",$estatus);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return json_encode("error 500");
            } 
        }

        public function tomarTicketsNoResuelto($id,$idSesion)
        {
            $verificacion  = $this->checarSesion($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                referencia,
                nombreEmpresa,
                rfcEmpresa,
                fechaCierre,
                horaCierre,
                tipoServicio,
                prioridad,
                estatus FROM info_tickets WHERE estatus=:estatus";
                $estatus = "0";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":estatus",$estatus);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return json_encode("error 500");
            } 
        }

        public function tomarTicketsResuelto($id,$idSesion)
        {
            $verificacion  = $this->checarSesion($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                referencia,
                nombreEmpresa,
                rfcEmpresa,
                fechaCierre,
                horaCierre,
                tipoServicio,
                prioridad,
                estatus FROM info_tickets WHERE estatus=:estatus";
                $estatus = "2";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":estatus",$estatus);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return json_encode("error 500");
            } 
        }


    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //////////////ACCIONES administradores////////////////
    //////////////////////////////////////////////////////


    //////Agregar administrador///////
    public function agregar_Administrador($idUsuario,$idSesion,$nombreAdministrador,$apellidopAdministrador,$apellidomAdministrador,$domicilioAdministrador,$numeroextAdministrador,$coloniaAdministrador,$telefonoAdministrador,$puestoAdministrador,$correoAdministrador,$contrasenaAdministrador)
    {
        $verificacion  = $this->checarSesion($idUsuario,$idSesion);
        if($verificacion==$idSesion)
        {

            $servidor = new Servidor();
            $conexion = $servidor->conectar();
            $sql_vericar = "SELECT correoAdministrador  FROM administrador WHERE correoAdministrador=:correoAdministrador";
            $existe = $conexion->prepare($sql_vericar);
            $existe->bindParam(":correoAdministrador",$correoAdministrador);
            $existe->execute();
            $activo = "1";
            $tipo_usuario = "ADMINISTRADOR";
            $str_vacio = " ";
            
            $numero = rand(100000,999999);
            $fecha = date("D/m/A H:i:s");
            $cifrado = sha1($contrasenaAdministrador);
            $cifrado = sha1($cifrado);

            if($existe->rowCount()==0)
            {


                $sql = "INSERT INTO administrador
                (nombreAdministrador,
                apellidopAdministrador,
                apellidomAdministrador,
                domicilioAdministrador,
                numeroextAdministrador,
                coloniaAdministrador,
                telefonoAdministrador,
                puestoAdministrador,
                correoAdministrador,
                contrasenaAdministrador,
                idSesion,
                activo,
                tipo_usuario
                ) 
                VALUE(
                :nombreAdministrador,
                :apellidopAdministrador,
                :apellidomAdministrador,
                :domicilioAdministrador,
                :numeroextAdministrador,
                :coloniaAdministrador,
                :telefonoAdministrador,
                :puestoAdministrador,
                :correoAdministrador,
                :contrasenaAdministrador,
                :idSesion,
                :activo,
                :tipo_usuario)";

                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":nombreAdministrador",$nombreAdministrador);
                $parametro->bindParam(":apellidopAdministrador",$apellidopAdministrador);
                $parametro->bindParam(":apellidomAdministrador",$apellidomAdministrador);
                $parametro->bindParam(":domicilioAdministrador",$domicilioAdministrador);
                $parametro->bindParam(":numeroextAdministrador",$numeroextAdministrador);
                $parametro->bindParam(":coloniaAdministrador",$coloniaAdministrador);
                $parametro->bindParam(":telefonoAdministrador",$telefonoAdministrador);
                $parametro->bindParam(":puestoAdministrador",$puestoAdministrador);
                $parametro->bindParam(":correoAdministrador",$correoAdministrador);
                $parametro->bindParam(":contrasenaAdministrador",$cifrado);
                $parametro->bindParam(":idSesion",$str_vacio);
                $parametro->bindParam(":activo",$activo);
                $parametro->bindParam(":tipo_usuario",$tipo_usuario);

                
                if($parametro->execute())
                {
                    return "Empleado registrado satisfactoriamente";
                }
                else
                {
                    return "ERROR";
                }
            }
            else
            {
                return "El empleado registrado ya esta dado de alta";
                // $correoEmpleado = $existe->fetchAll(PDO::FETCH_ASSOC);
                // return $correoEmpleado;
            }
        }
        else
        {
            return "ERROR";
        }
    }

    public function cerrar_sesion($id,$idSesion,$tipo_usuario)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        $verificacionEmpleado  = $this->checarSesionEmpleado($id,$idSesion);
        $verificacionEmpresa  = $this->checarSesionEmpresa($id,$idSesion);
        if($verificacion==$idSesion || $verificacionEmpleado==$idSesion || $verificacionEmpresa==$idSesion)
        {
            $str_vacio = " ";
            $servidor = new Servidor();
            $conexion = $servidor->conectar();
            $sql = "";
            if($tipo_usuario=="ADMINISTRADOR")
            {
                $sql = "UPDATE administrador SET idSesion=:idSesion WHERE id=:id";
            }
            if($tipo_usuario=="EMPLEADO")
            {
                $sql = "UPDATE empleado SET idSesion=:idSesion WHERE id=:id";
            }
            if($tipo_usuario=="EMPRESA")
            {
                $sql = "UPDATE empresas SET idSesion=:idSesion WHERE id=:id";
            }
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":idSesion",$str_vacio);
            $parametro->bindParam(":id",$id);
            if($parametro->execute())
            {
                session_destroy();
                return "Sesion cerrada";
            }
            else
            {
                return "ERROR";
            }
                
        }
        else
        {
            return "ERROR";
        }
    }

    public function  eliminar_adn($idUsuario,$idSesion,$id)
    {

        $verificacion  = $this->checarSesion($idUsuario,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "DELETE FROM administrador WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":id",$id);
            if($parametro->execute())
            {
                return "Se a eliminado el empleado permanentemente";
            }
            else
            {
                return "ERROR 400";
            }
        }
        else
        {
            return "ERROR";
        }
    }

        ///// Tomar empleados activos mostrar tabla
        public function tomarAndActivos($id,$idSesion)
        {
            $verificacion  = $this->checarSesion($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                nombreAdministrador,
                apellidopAdministrador,
                apellidomAdministrador,
                domicilioAdministrador,
                numeroextAdministrador,
                coloniaAdministrador,
                telefonoAdministrador,
                puestoAdministrador,
                correoAdministrador,
                idSesion,
                tipo_usuario,
                activo FROM administrador WHERE activo=:activo";
                $activo = "1";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":activo",$activo);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return  json_encode("error 500");
            } 
        }

        ///// Tomar empleados activos mostrar tabla
        public function tomarAdnNoActivos($id,$idSesion)
        {
            $verificacion  = $this->checarSesion($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                nombreAdministrador,
                apellidopAdministrador,
                apellidomAdministrador,
                domicilioAdministrador,
                numeroextAdministrador,
                coloniaAdministrador,
                telefonoAdministrador,
                puestoAdministrador,
                correoAdministrador,
                idSesion,
                tipo_usuario,
                activo FROM administrador WHERE activo=:activo";
                $activo = "0";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":activo",$activo);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return "error 500";
            } 
        }


        /////////Desactivar administradores//////////
    public function desactivar_adn($id,$idSesion,$id_empleado, $estado)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "UPDATE administrador SET activo=:activo WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$estado);
            $parametro->bindParam(":id",$id_empleado);
            if($parametro->execute())
            {
                return "El empleado se a dado de baja";
            }
            else
            {
                return "ERROR";
            }
        }
        else
        {
            return "ERROR 500";
        }
    }

    ///////// Activar administradores///////

    public function activar_adn($id,$idSesion,$id_empleado,$estado)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "UPDATE administrador SET activo=:activo WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$estado);
            $parametro->bindParam(":id",$id_empleado);
            if($parametro->execute())
            {
                return ("El empleado se a reactivado");
            }
            else
            {
                return ("ERROR 400");
            }
        }
        else
        {
            return ("ERROR 500");
        }
    }

    
    public function editar_adn($idUsuario,$idSesion,$id,$tipo,$valor)
    {
            $verificacion  = $this->checarSesion($idUsuario,$idSesion);
            if($verificacion==$idSesion)
            {
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro="";

                if($tipo=="nombreAdministrador")
                {
                    $sql = "UPDATE administrador  SET nombreAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="apellidoPAdministrador")
                {
                    $sql = "UPDATE administrador  SET apellidoPAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="apellidoMAdministrador")
                {
                    $sql = "UPDATE administrador  SET apellidoMAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="domicilioAdministrador")
                {
                    $sql = "UPDATE administrador  SET domicilioAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="numExtAdministrador")
                {
                    $sql = "UPDATE administrador  SET numeroextAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="coloniaAdministrador")
                {
                    $sql = "UPDATE administrador  SET coloniaAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="telefonoAdministrador")
                {
                    $sql = "UPDATE administrador  SET telefonoAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="puestoAdministrador")
                {
                    $sql = "UPDATE administrador  SET puestoAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="correoAdministrador")
                {
                    $sql = "UPDATE administrador  SET correoAdministrador=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
            }
            else
            {
                return "error";
            }
    }


    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //////////////ACCIONES EMPLEADO///////////////////////
    //////////////////////////////////////////////////////



    public function editar_empleado($idUsuario,$idSesion,$id,$tipo,$valor)
    {
            $verificacion  = $this->checarSesion($idUsuario,$idSesion);
            if($verificacion==$idSesion)
            {
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro="";

                if($tipo=="nombre")
                {
                    $sql = "UPDATE empleado  SET nombreEmpleado=:nombre WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":nombre",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="apellidoP")
                {
                    $sql = "UPDATE empleado  SET apellidopEmpleado=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="apellidoM")
                {
                    $sql = "UPDATE empleado  SET apellidomEmpleado=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="domicilio")
                {
                    $sql = "UPDATE empleado  SET domicilioEmpleado=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="numExt")
                {
                    $sql = "UPDATE empleado  SET numeroextEmpleado=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                
                if($tipo=="colonia")
                {
                    $sql = "UPDATE empleado  SET coloniaEmpleado=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="telefono")
                {
                    $sql = "UPDATE empleado  SET telefonoEmpleado=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="puesto")
                {
                    $sql = "UPDATE empleado  SET puestoEmpleado=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
                if($tipo=="correo")
                {
                    $sql = "UPDATE empleado  SET correoEmpleado=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "Se a modificado los datos del empleado";
                    }
                }
            }
            else
            {
                return "ERROR";
            }

    }
    public function  eliminar_usuario($idUsuario,$idSesion,$id)
    {
        $verificacion  = $this->checarSesion($idUsuario,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "DELETE FROM empleado WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":id",$id);
            if($parametro->execute())
            {
                return "Se a eliminado el empleado permanentemente";
            }
            else
            {
                return "ERROR 400";
            }
        }
        else
        {
            return "ERROR";
        }
    }

    //////Agregar Empleado///////
    public function agregar_empleado($idUsuario,$idSesion,$nombreEmpleado,$apellidopEmpleado,$apellidomEmpleado,$domicilioEmpleado,$numeroextEmpleado,$coloniaEmpleado,$telefonoEmpleado,$puestoEmpleado,$correoEmpleado,$contrasenaEmpleado)
    {
        $verificacion  = $this->checarSesion($idUsuario,$idSesion);
        if($verificacion==$idSesion)
        {   
            $servidor = new Servidor();
            $conexion = $servidor->conectar();
            $sql_vericar = "SELECT correoEmpleado FROM empleado WHERE correoEmpleado=:correoEmpleado";
            $existe = $conexion->prepare($sql_vericar);
            $existe->bindParam(":correoEmpleado",$correoEmpleado);
            $existe->execute();
            $activo = "1";
            $str_vacio = " ";
            $tipo_empleado = "EMPLEADO";

            $numero = rand(100000,999999);
            $fecha = date("D/m/A H:i:s");
            $cifrado = sha1($contrasenaEmpleado);
            $cifrado = sha1($cifrado);

            if($existe->rowCount()==0)
            {
                $sql = "INSERT INTO empleado
                (nombreEmpleado,
                apellidopEmpleado,
                apellidomEmpleado,
                domicilioEmpleado,
                numeroextEmpleado,
                coloniaEmpleado,
                telefonoEmpleado,
                puestoEmpleado,
                correoEmpleado,
                contrasenaEmpleado,
                idSesion,
                activo,
                tipo_usuario
                ) 
                VALUE(:nombreEmpleado,
                :apellidopEmpleado,
                :apellidomEmpleado,
                :domicilioEmpleado,
                :numeroextEmpleado,
                :coloniaEmpleado,
                :telefonoEmpleado,
                :puestoEmpleado,
                :correoEmpleado,
                :contrasenaEmpleado,
                :idSesion,
                :activo,
                :tipo_usuario)";

                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":nombreEmpleado",$nombreEmpleado);
                $parametro->bindParam(":apellidopEmpleado",$apellidopEmpleado);
                $parametro->bindParam(":apellidomEmpleado",$apellidomEmpleado);
                $parametro->bindParam(":domicilioEmpleado",$domicilioEmpleado);
                $parametro->bindParam(":numeroextEmpleado",$numeroextEmpleado);
                $parametro->bindParam(":coloniaEmpleado",$coloniaEmpleado);
                $parametro->bindParam(":telefonoEmpleado",$telefonoEmpleado);
                $parametro->bindParam(":puestoEmpleado",$puestoEmpleado);
                $parametro->bindParam(":correoEmpleado",$correoEmpleado);
                $parametro->bindParam(":contrasenaEmpleado",$cifrado);
                $parametro->bindParam(":idSesion",$str_vacio);
                $parametro->bindParam(":activo",$activo);
                $parametro->bindParam(":tipo_usuario",$tipo_empleado);
                
                if($parametro->execute())
                {
                    return "Empleado registrado satisfactoriamente";
                }
                else
                {
                    return "ERROR";
                }
            }
            else
            {
                return "El empleado registrado ya esta dado de alta";
                // $correoEmpleado = $existe->fetchAll(PDO::FETCH_ASSOC);
                // return $correoEmpleado;
            }
        }
        else
        {
            return "ERROR";
        }    
    }


    /////////Desactivar empleados//////////
    public function desactivar_empleado($id,$idSesion,$id_empleado, $estado)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "UPDATE empleado SET activo=:activo WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$estado);
            $parametro->bindParam(":id",$id_empleado);
            if($parametro->execute())
            {
                return "El empleado se a dado de baja";
            }
            else
            {
                return "ERROR";
            }
        }
        else
        {
            return "ERROR 500";
        }
    }

    ///////// Activar Empleados///////

    public function activar_empleado($id,$idSesion,$id_empleado,$estado)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "UPDATE empleado SET activo=:activo WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$estado);
            $parametro->bindParam(":id",$id_empleado);
            if($parametro->execute())
            {
                return "El empleado se a reactivado";
            }
            else
            {
                return "ERROR 400";
            }
        }
        else
        {
            return "ERROR 500";
        }
    }


    ///// Tomar empleados activos mostrar tabla
    public function tomarEmpleadosActivos($id,$idSesion)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "SELECT id,nombreEmpleado,
            apellidopEmpleado,
            apellidomEmpleado,
            domicilioEmpleado,
            numeroextEmpleado,
            coloniaEmpleado,
            telefonoEmpleado,
            puestoEmpleado,
            correoEmpleado,
            idSesion,
            tipo_usuario,
            activo FROM empleado WHERE activo=:activo";
            $activo = "1";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$activo);
            $parametro->execute();
            $columnas = $parametro->rowCount();
            if($columnas==0)
            {
                return json_encode("error 400");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                return json_encode($datos);       
            }
        }  
        else
        {
            return "error 500";
        } 
    }

    public function tomarEmpleadosNoActivos($id,$idSesion)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "SELECT 
            id,
            nombreEmpleado,
            apellidopEmpleado,
            apellidomEmpleado,
            domicilioEmpleado,
            numeroextEmpleado,
            coloniaEmpleado,
            telefonoEmpleado,
            puestoEmpleado,
            correoEmpleado,
            idSesion,
            tipo_usuario,
            activo FROM empleado WHERE activo=:activo";
            $activo = "0";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$activo);
            $parametro->execute();
            $columnas = $parametro->rowCount();
            if($columnas==0)
            {
                return json_encode("error 400");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                return json_encode($datos);       
            }
        }  
        else
        {
            return json_encode("error 500");
        } 
    }

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //////////////ACCIONES EMPRESAS///////////////////////
    //////////////////////////////////////////////////////

    public function desactivar_empresa($id,$idSesion,$id_empleado, $estado){
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "UPDATE empresas SET activo=:activo WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$estado);
            $parametro->bindParam(":id",$id_empleado);
            if($parametro->execute())
            {
                return "La empresa se a dado de baja";
            }
            else
            {
                return "ERROR";
            }
        }
        else
        {
            return "ERROR 500";
        }
    }


    ///////// Activar Empresas///////
    public function activar_empresa($id,$idSesion,$id_empleado,$estado){
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "UPDATE empresas SET activo=:activo WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$estado);
            $parametro->bindParam(":id",$id_empleado);
            if($parametro->execute())
            {
                return "La empresa se a reactivado";
            }
            else
            {
                return "Error 400";
            }
        }
        else
        {
            return "Error 500";
        }
    }

    ///tomar empresas activas
    public function tomarEmpresasActivas($id,$idSesion){
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "SELECT
            id,
            rfcEmpresa,
            nombreEmpresa,
            razonsocialEmpresa,
            domicilioEmpresa,
            numerocalleEmpresa,
            coloniaEmpresa,
            cpEmpresa,
            municipioEmpresa,
            estadoEmpresa,
            telefonoEmpresa,
            correoEmpresa,
            idSesion,
            activo,
            tipo_usuario 
            FROM empresas WHERE activo=:activo";
            $activo = "1";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$activo);
            $parametro->execute();
            $columnas = $parametro->rowCount();
            if($columnas==0)
            {
                return json_encode("error 400");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                return json_encode($datos);       
            }
        }  
        else
        {
            return json_encode("error 500");
        } 
    }


    ///tomar empresas activas
    public function tomarEmpresasNoActivas($id,$idSesion){
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "SELECT
            id,
            rfcEmpresa,
            nombreEmpresa,
            razonsocialEmpresa,
            domicilioEmpresa,
            numerocalleEmpresa,
            coloniaEmpresa,
            cpEmpresa,
            municipioEmpresa,
            estadoEmpresa,
            telefonoEmpresa,
            correoEmpresa,
            idSesion,
            activo,
            tipo_usuario 
            FROM empresas WHERE activo=:activo";
            $activo = "0";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":activo",$activo);
            $parametro->execute();
            $columnas = $parametro->rowCount();
            if($columnas==0)
            {
                return json_encode("error 400");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                return json_encode($datos);       
            }
        }  
        else
        {
            return json_encode("error 500");
        } 
    }


        ///tomar empresas activas
        public function tomarEmpresasPendientes($id,$idSesion){
            $verificacion  = $this->checarSesion($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT
                id,
                rfcEmpresa,
                nombreEmpresa,
                razonsocialEmpresa,
                domicilioEmpresa,
                numerocalleEmpresa,
                coloniaEmpresa,
                cpEmpresa,
                municipioEmpresa,
                estadoEmpresa,
                telefonoEmpresa,
                correoEmpresa,
                idSesion,
                activo,
                tipo_usuario 
                FROM empresas WHERE activo=:activo";
                $activo = "2";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":activo",$activo);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return json_encode("error 500");
            } 
        }

    public function agregar_peticion_empresa($rfcEmpresa,$nombreEmpresa,$razonsocialEmpresa,$domicilioEmpresa,$numerocalleEmpresa,$coloniaEmpresa,$cpEmpresa,$municipioEmpresa,$estadoEmpresa,$telefonoEmpresa,$correoEmpresa,$contrasenaEmpresa)
    {
    
            $servidor = new Servidor();
            $conexion = $servidor->conectar();
            $sql_vericar = "SELECT rfcEmpresa  FROM empresas WHERE rfcEmpresa=:rfcEmpresa";
            $existe = $conexion->prepare($sql_vericar);
            $existe->bindParam(":rfcEmpresa",$rfcEmpresa);
            $existe->execute();
            $activo = "2";
            $tipo_usuario = "EMPRESA";
            $str_vacio = " ";
            $numero = rand(100000,999999);
            $fecha = date("D/m/A H:i:s");
            $cifrado = sha1($contrasenaEmpresa);
            $cifrado = sha1($cifrado);


            if($existe->rowCount()==0)
            {
                $sql = "INSERT INTO empresas
                (rfcEmpresa,
                nombreEmpresa,
                razonsocialEmpresa,
                domicilioEmpresa,
                numerocalleEmpresa,
                coloniaEmpresa,
                cpEmpresa,
                municipioEmpresa,
                estadoEmpresa,
                telefonoEmpresa,
                correoEmpresa,
                contrasenaEmpresa,
                idSesion,
                activo,
                tipo_usuario
                ) 
                VALUE(
                :rfcEmpresa,
                :nombreEmpresa,
                :razonsocialEmpresa,
                :domicilioEmpresa,
                :numerocalleEmpresa,
                :coloniaEmpresa,
                :cpEmpresa,
                :municipioEmpresa,
                :estadoEmpresa,
                :telefonoEmpresa,
                :correoEmpresa,
                :contrasenaEmpresa,
                :idSesion,
                :activo,
                :tipo_usuario)";

                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":rfcEmpresa",$rfcEmpresa);
                $parametro->bindParam(":nombreEmpresa",$nombreEmpresa);
                $parametro->bindParam(":razonsocialEmpresa",$razonsocialEmpresa);
                $parametro->bindParam(":domicilioEmpresa",$domicilioEmpresa);
                $parametro->bindParam(":numerocalleEmpresa",$numerocalleEmpresa);
                $parametro->bindParam(":coloniaEmpresa",$coloniaEmpresa);
                $parametro->bindParam(":cpEmpresa",$cpEmpresa);
                $parametro->bindParam(":municipioEmpresa",$municipioEmpresa);
                $parametro->bindParam(":estadoEmpresa",$estadoEmpresa);
                $parametro->bindParam(":telefonoEmpresa",$telefonoEmpresa);
                $parametro->bindParam(":correoEmpresa",$correoEmpresa);
                $parametro->bindParam(":contrasenaEmpresa",$cifrado);
                $parametro->bindParam(":idSesion",$str_vacio);
                $parametro->bindParam(":activo",$activo);
                $parametro->bindParam(":tipo_usuario",$tipo_usuario);
                
                if($parametro->execute())
                {
                    return "La empresa se a regristrado satisfactoriamente<br>Espere un lapso de 12 a 24 hrs en lo que se acepta su peticion.";
                }
                else
                {
                    return "Error";
                }
            }
            else
            {
                return "La empresa que se esta registrando ya se encuentra dada de alta<br>Favor de ingresar los datos correctamente.";
            }    
    }
    


    public function agregar_empresa_dashboard($sesion,$idUsuario,$rfcEmpresa,$nombreEmpresa,$razonsocialEmpresa,$domicilioEmpresa,$numerocalleEmpresa,$coloniaEmpresa,$cpEmpresa,$municipioEmpresa,$estadoEmpresa,$telefonoEmpresa,$correoEmpresa,$contrasenaEmpresa)
    {
        $verificacion  = $this->checarSesion($idUsuario,$sesion);
        if($verificacion==$sesion)
        {
            $servidor = new Servidor();
            $conexion = $servidor->conectar();
            $sql_vericar = "SELECT rfcEmpresa  FROM empresas WHERE rfcEmpresa=:rfcEmpresa";
            $existe = $conexion->prepare($sql_vericar);
            $existe->bindParam(":rfcEmpresa",$rfcEmpresa);
            $existe->execute();
            $activo = "1";
            $tipo_usuario = "EMPRESA";
            $str_vacio = " ";
            $numero = rand(100000,999999);
            $fecha = date("D/m/A H:i:s");
            $cifrado = sha1($contrasenaEmpresa);
            $cifrado = sha1($cifrado);


            if($existe->rowCount()==0)
            {
                $sql = "INSERT INTO empresas
                (rfcEmpresa,
                nombreEmpresa,
                razonsocialEmpresa,
                domicilioEmpresa,
                numerocalleEmpresa,
                coloniaEmpresa,
                cpEmpresa,
                municipioEmpresa,
                estadoEmpresa,
                telefonoEmpresa,
                correoEmpresa,
                contrasenaEmpresa,
                idSesion,
                activo,
                tipo_usuario
                ) 
                VALUE(
                :rfcEmpresa,
                :nombreEmpresa,
                :razonsocialEmpresa,
                :domicilioEmpresa,
                :numerocalleEmpresa,
                :coloniaEmpresa,
                :cpEmpresa,
                :municipioEmpresa,
                :estadoEmpresa,
                :telefonoEmpresa,
                :correoEmpresa,
                :contrasenaEmpresa,
                :idSesion,
                :activo,
                :tipo_usuario)";

                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":rfcEmpresa",$rfcEmpresa);
                $parametro->bindParam(":nombreEmpresa",$nombreEmpresa);
                $parametro->bindParam(":razonsocialEmpresa",$razonsocialEmpresa);
                $parametro->bindParam(":domicilioEmpresa",$domicilioEmpresa);
                $parametro->bindParam(":numerocalleEmpresa",$numerocalleEmpresa);
                $parametro->bindParam(":coloniaEmpresa",$coloniaEmpresa);
                $parametro->bindParam(":cpEmpresa",$cpEmpresa);
                $parametro->bindParam(":municipioEmpresa",$municipioEmpresa);
                $parametro->bindParam(":estadoEmpresa",$estadoEmpresa);
                $parametro->bindParam(":telefonoEmpresa",$telefonoEmpresa);
                $parametro->bindParam(":correoEmpresa",$correoEmpresa);
                $parametro->bindParam(":contrasenaEmpresa",$cifrado);
                $parametro->bindParam(":idSesion",$str_vacio);
                $parametro->bindParam(":activo",$activo);
                $parametro->bindParam(":tipo_usuario",$tipo_usuario);
                
                if($parametro->execute())
                {
                    return "Empresa registrada satisfactoriamente";
                }
                else
                {
                    return "ERROR";
                }
            }
            else
            {
                return "La empresa registrado ya esta dado de alta";
                // $correoEmpleado = $existe->fetchAll(PDO::FETCH_ASSOC);
                // return $correoEmpleado;
            }
        }
        else
        {
            return "ERROR";
        }
    }


    public function editar_empresas($idUsuario,$idSesion,$id,$tipo,$valor)
    {
            $verificacion  = $this->checarSesion($idUsuario,$idSesion);
            if($verificacion==$idSesion)
            {
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro="";

                if($tipo=="rfcEmpresa")
                {
                    $sql = "UPDATE empresas  SET rfcEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="nombreEmpresa")
                {
                    $sql = "UPDATE empresas  SET nombreEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="razonsocialEmpresa")
                {
                    $sql = "UPDATE empresas  SET razonsocialEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="domicilioEmpresa")
                {
                    $sql = "UPDATE empresas  SET domicilioEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="numerocalleEmpresa")
                {
                    $sql = "UPDATE empresas  SET numerocalleEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="coloniaEmpresa")
                {
                    $sql = "UPDATE empresas  SET coloniaEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="cpEmpresa")
                {
                    $sql = "UPDATE empresas  SET cpEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo==" municipioEmpresa")
                {
                    $sql = "UPDATE empresas  SET  municipioEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="estadoEmpresa")
                {
                    $sql = "UPDATE empresas  SET estadoEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="telefonoEmpresa")
                {
                    $sql = "UPDATE empresas  SET telefonoEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
                if($tipo=="correoEmpresa")
                {
                    $sql = "UPDATE empresas  SET correoEmpresa=:dato WHERE id=:id";
                    $parametro = $conexion->prepare($sql);
                    $parametro->bindParam(":dato",$valor);
                    $parametro->bindParam(":id",$id);
                    if($parametro->execute())
                    {
                        return "listo";
                    }
                }
            }
            else
            {
                return "error";
            }
    }

    public function  eliminar_empresa($idUsuario,$idSesion,$id)
    {

        $verificacion  = $this->checarSesion($idUsuario,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "DELETE FROM empresas WHERE id=:id";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":id",$id);
            if($parametro->execute())
            {
                return "Se a eliminado la empresa permanentemente";
            }
            else
            {
                return "ERROR 400";
            }
        }
        else
        {
            return "ERROR";
        }
    }


    public function tomar_info_empresa($id,$sesion)
    {
        $sql = "SELECT nombreEmpresa,rfcEmpresa FROM empresas WHERE correoEmpresa=:correo";
        $modelo = new Servidor();
        $conexion = $modelo->conectar();
        $parametro = $conexion->prepare($sql);
        $parametro->bindParam(":correo",$id);
        $parametro->execute();
        $resultado = $parametro->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }




    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //////////////ACCIONES lOGIN//////////////////////////
    //////////////////////////////////////////////////////

    public function inicio_sesion($correo,$contra)
    {
        $contraCifrada = sha1($contra);
        $contraCifrada = sha1($contraCifrada);
        $randos= rand(100000,999999);
        $fecha = date("D/m/A H:i:s");
        $cifrado = sha1($correo.$fecha.$randos);

        $sql_admin = "SELECT correoAdministrador FROM administrador WHERE correoAdministrador=:correoAdministrador AND contrasenaAdministrador=:contrasenaAdministrador";
        $modelo = new Servidor();
        $conexion = $modelo->conectar();
        $parametro_admin = $conexion->prepare($sql_admin);
        $parametro_admin->bindParam(":correoAdministrador",$correo);
        $parametro_admin->bindParam(":contrasenaAdministrador",$contraCifrada);
        $parametro_admin->execute();
        $columnas_admin = $parametro_admin->rowCount();


        if($columnas_admin==0)
        {
            $sql = "SELECT correoEmpleado FROM empleado WHERE correoEmpleado=:correoEmpleado AND contrasenaEmpleado=:contrasenaEmpleado";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":correoEmpleado",$correo);
            $parametro->bindParam(":contrasenaEmpleado",$contraCifrada);
            $parametro->execute();
            $columnas = $parametro->rowCount();


            if($columnas==0)
            {
                $sql2 = "SELECT correoEmpresa FROM empresas WHERE correoEmpresa=:correoEmpresa AND contrasenaEmpresa=:contrasenaEmpresa";
                $parametro2 = $conexion->prepare($sql2);
                $parametro2->bindParam(":correoEmpresa",$correo);
                $parametro2->bindParam(":contrasenaEmpresa",$contraCifrada);
                $parametro2->execute();
                $columnas2 = $parametro2 ->rowCount();
                if($columnas2==0)
                {
                    return json_encode("No existe el usuario registrado");
                }
                else
                {
                    $sql6 = "SELECT activo FROM empresas WHERE correoEmpresa=:correoEmpresa AND contrasenaEmpresa=:contrasenaEmpresa";
                    $parametro6 = $conexion->prepare($sql6);
                    $parametro6->bindParam(":correoEmpresa",$correo);
                    $parametro6->bindParam(":contrasenaEmpresa",$contraCifrada);
                    $parametro6->execute();
                    $datos1= $parametro6->fetchAll(PDO::FETCH_ASSOC);
                    $estado_activo1 = $datos1[0]['activo'];
                    if($estado_activo1==1)
                    {
                        $sql7 = "UPDATE empresas SET idSesion=:idSesion WHERE correoEmpresa=:correoEmpresa AND contrasenaEmpresa=:contrasenaEmpresa";
                        $parametro7 = $conexion->prepare($sql7);
                        $parametro7->bindParam(":idSesion",$cifrado);
                        $parametro7->bindParam(":correoEmpresa",$correo);
                        $parametro7->bindParam(":contrasenaEmpresa",$contraCifrada);
                        if($parametro7->execute())
                        {
                            $sql8 = "SELECT 
                            id,
                            rfcEmpresa,
                            nombreEmpresa,
                            razonsocialEmpresa,
                            domicilioEmpresa,
                            numerocalleEmpresa,
                            coloniaEmpresa,
                            cpEmpresa,
                            municipioEmpresa,
                            estadoEmpresa,
                            telefonoEmpresa,
                            correoEmpresa,
                            idSesion,
                            tipo_usuario FROM empresas WHERE correoEmpresa=:correoEmpresa AND contrasenaEmpresa=:contrasenaEmpresa";
                            $parametro8 = $conexion->prepare($sql8);
                            $parametro8->bindParam(":correoEmpresa",$correo);
                            $parametro8->bindParam(":contrasenaEmpresa",$contraCifrada);
                            if($parametro8->execute())
                            {
                                $datos1 = $parametro8->fetchAll(PDO::FETCH_ASSOC);
                                $_SESSION['idSesion'] = $datos1[0]['idSesion'];
                                $_SESSION['idUsuario'] = $datos1[0]['id'];
                                $_SESSION['nombreUsuario'] = $datos1[0]['nombreEmpresa'];
                                $_SESSION['tipoUsuario'] = $datos1[0]['tipo_usuario'];
                                $_SESSION['nombreEmpresa'] = $datos1[0]['nombreEmpresa'];
                                $_SESSION['rfcEmpresa'] = $datos1[0]['rfcEmpresa'];     
                                return json_encode($datos1);
                            }
                        }
                    }
                    else
                    {
                        return json_encode ("inicio bloqueado");
                    }
                }
            }
            else
            {
                
                $sql3 = "SELECT activo FROM empleado WHERE correoEmpleado=:correoEmpleado AND contrasenaEmpleado=:contrasenaEmpleado";
                $parametro3 = $conexion->prepare($sql3);
                $parametro3->bindParam(":correoEmpleado",$correo);
                $parametro3->bindParam(":contrasenaEmpleado",$contraCifrada);
                $parametro3->execute();
                $datos= $parametro3->fetchAll(PDO::FETCH_ASSOC);
                $estado_activo = $datos[0]['activo'];
                if($estado_activo==1)
                {
                    $sql4 = "UPDATE empleado SET idSesion=:idSesion WHERE correoEmpleado=:correoEmpleado AND contrasenaEmpleado=:contrasenaEmpleado";
                    $parametro4 = $conexion->prepare($sql4);
                    $parametro4->bindParam(":idSesion",$cifrado);
                    $parametro4->bindParam(":correoEmpleado",$correo);
                    $parametro4->bindParam(":contrasenaEmpleado",$contraCifrada);
                    if($parametro4->execute())
                    {
                        $sql5 = "SELECT id,nombreEmpleado,
                        apellidopEmpleado,
                        apellidomEmpleado,
                        domicilioEmpleado,
                        numeroextEmpleado,
                        coloniaEmpleado,
                        telefonoEmpleado,
                        puestoEmpleado,
                        correoEmpleado,
                        idSesion,
                        tipo_usuario FROM empleado WHERE correoEmpleado=:correoEmpleado AND contrasenaEmpleado=:contrasenaEmpleado";
                        $parametro5 = $conexion->prepare($sql5);
                        $parametro5->bindParam(":correoEmpleado",$correo);
                        $parametro5->bindParam(":contrasenaEmpleado",$contraCifrada);
                        if($parametro5->execute())
                        {
                            $datos = $parametro5->fetchAll(PDO::FETCH_ASSOC);
                            $_SESSION['idSesion'] = $datos[0]['idSesion'];
                            $_SESSION['idUsuario'] = $datos[0]['id'];
                            $_SESSION['nombreUsuario'] = $datos[0]['nombreEmpleado'];
                            $_SESSION['tipoUsuario'] = $datos[0]['tipo_usuario'];
    
                            return json_encode($datos);
                        }
                    }
                }
                else
                {
                    return json_encode("Inicio bloqueado");
                }
                
            }

        }
        else
        {
            $sql_admin1 = "SELECT activo FROM administrador WHERE correoAdministrador=:correoAdministrador AND contrasenaAdministrador=:contrasenaAdministrador";
            $parametro_admin1 = $conexion->prepare($sql_admin1);
            $parametro_admin1->bindParam(":correoAdministrador",$correo);
            $parametro_admin1->bindParam(":contrasenaAdministrador",$contraCifrada);
            $parametro_admin1->execute();
            $datos_admin= $parametro_admin1->fetchAll(PDO::FETCH_ASSOC);
            $estado_activo_admin = $datos_admin[0]['activo'];
            if($estado_activo_admin==1)
            {
                $sql_admin2 = "UPDATE administrador SET idSesion=:idSesion WHERE correoAdministrador=:correoAdministrador AND contrasenaAdministrador=:contrasenaAdministrador";
                $parametro_admin2 = $conexion->prepare($sql_admin2);
                $parametro_admin2->bindParam(":idSesion",$cifrado);
                $parametro_admin2->bindParam(":correoAdministrador",$correo);
                $parametro_admin2->bindParam(":contrasenaAdministrador",$contraCifrada);
                if($parametro_admin2->execute())
                {
                    $sql_admin3 = "SELECT 
                    id,
                    nombreAdministrador,
                    apellidopAdministrador,
                    apellidomAdministrador,
                    domicilioAdministrador,
                    numeroextAdministrador,
                    coloniaAdministrador,
                    telefonoAdministrador,
                    puestoAdministrador,
                    correoAdministrador,
                    idSesion,
                    tipo_usuario FROM administrador WHERE correoAdministrador=:correoAdministrador AND contrasenaAdministrador=:contrasenaAdministrador";
                    $parametro_admin3 = $conexion->prepare($sql_admin3);
                    $parametro_admin3->bindParam(":correoAdministrador",$correo);
                    $parametro_admin3->bindParam(":contrasenaAdministrador",$contraCifrada);
                    if($parametro_admin3->execute())
                    {
                        $vista = "contenedor_dashboard";
                        $datos_admin = $parametro_admin3->fetchAll(PDO::FETCH_ASSOC);
                        $_SESSION['idSesion'] = $datos_admin[0]['idSesion'];
                        $_SESSION['idUsuario'] = $datos_admin[0]['id'];
                        $_SESSION['nombreUsuario'] = $datos_admin[0]['nombreAdministrador'];
                        $_SESSION['tipoUsuario'] = $datos_admin[0]['tipo_usuario'];
                        setcookie("vista-actual",$vista , time()+40000,"/","localhost",true,true);

                        return json_encode($datos_admin);
                        // return "listo";
                    }
                }
            }
            else
            {
                return json_encode("Inicio bloqueado");
            }

        }
    }

    public function checarSesion($id,$sesion)
    {
        $sql = "SELECT idSesion FROM administrador WHERE idSesion=:idSesion AND id=:id";
        $modelo = new Servidor();
        $conexion = $modelo->conectar();
        $parametro = $conexion->prepare($sql);
        $parametro->bindParam(":idSesion",$sesion);
        $parametro->bindParam(":id",$id);
        $parametro->execute();
        $columnas = $parametro->rowCount();
        if($columnas==0)
        {
            return "error";
        }
        else
        {
            $verificacion = $parametro->fetchAll(PDO::FETCH_ASSOC);
            $id_verificacion = $verificacion[0]['idSesion'];
            if($id_verificacion==$sesion)
            {
                return $id_verificacion;
            }
            else
            {
                return "error";
            }
        }   
    }

    public function checarSesionEmpleado($id,$sesion)
    {
        $sql = "SELECT idSesion FROM empleado WHERE idSesion=:idSesion AND id=:id";
        $modelo = new Servidor();
        $conexion = $modelo->conectar();
        $parametro = $conexion->prepare($sql);
        $parametro->bindParam(":idSesion",$sesion);
        $parametro->bindParam(":id",$id);
        $parametro->execute();
        $columnas = $parametro->rowCount();
        if($columnas==0)
        {
            return "error";
        }
        else
        {
            $verificacion = $parametro->fetchAll(PDO::FETCH_ASSOC);
            $id_verificacion = $verificacion[0]['idSesion'];
            if($id_verificacion==$sesion)
            {
                return $id_verificacion;
            }
            else
            {
                return "error";
            }
        }   
    }

    public function checarSesionEmpresa($id,$sesion)
    {
        $sql = "SELECT idSesion FROM empresas WHERE idSesion=:idSesion AND id=:id";
        $modelo = new Servidor();
        $conexion = $modelo->conectar();
        $parametro = $conexion->prepare($sql);
        $parametro->bindParam(":idSesion",$sesion);
        $parametro->bindParam(":id",$id);
        $parametro->execute();
        $columnas = $parametro->rowCount();
        if($columnas==0)
        {
            return "error";
        }
        else
        {
            $verificacion = $parametro->fetchAll(PDO::FETCH_ASSOC);
            $id_verificacion = $verificacion[0]['idSesion'];
            if($id_verificacion==$sesion)
            {
                return $id_verificacion;
            }
            else
            {
                return "error";
            }
        }   
    }
    
    public function crear_cookie_vista($idUsuario,$idSesion,$valor)
    {
        //$verificacion  = $this->checarSesion($idUsuario,$idSesion);
        //if($verificacion==$idSesion)
        //{
            setcookie("vista-actual", $valor, time()+40000,"/","localhost",true,true);   
            return "listo";
        //}
        //else
        //{
            //return "error";
        //}
    }


    ///////////////////////////////////
    ///////////////////////////////////
    //////Dashboard///////////////////
    /////////////////////////////////

    public function tomarTicketsActivosDashboard($id,$idSesion)
    {
        $verificacion  = $this->checarSesion($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "SELECT 
            id,
            referencia,
            nombreEmpresa,
            rfcEmpresa,
            fechaRegistro,
            horaRegistro,
            tipoServicio,
            prioridad,
            estatus FROM info_tickets WHERE estatus=:estatus";
            $estatus = "1";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":estatus",$estatus);
            $parametro->execute();
            $columnas = $parametro->rowCount();
            if($columnas==0)
            {
                return json_encode("error 400");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                return json_encode($datos);       
            }
        }  
        else
        {
            return json_encode("error 500");
        } 
    }


    public function tomarTicketsActivosEmpleado($id,$idSesion)
    {
        $verificacion  = $this->checarSesionEmpleado($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "SELECT 
            id,
            referencia,
            nombreEmpresa,
            rfcEmpresa,
            fechaRegistro,
            horaRegistro,
            tipoServicio,
            prioridad,
            estatus FROM info_tickets WHERE estatus=:estatus";
            $estatus = "1";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":estatus",$estatus);
            $parametro->execute();
            $columnas = $parametro->rowCount();
            if($columnas==0)
            {
                return json_encode("error 400");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                return json_encode($datos);       
            }
        }  
        else
        {
            return json_encode("error 500");
        } 
    }


    public function tomarTicketsNoResueltoEmpleado($id,$idSesion)
        {
            $verificacion  = $this->checarSesionEmpleado($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                referencia,
                nombreEmpresa,
                rfcEmpresa,
                fechaCierre,
                horaCierre,
                tipoServicio,
                prioridad,
                estatus FROM info_tickets WHERE estatus=:estatus";
                $estatus = "0";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":estatus",$estatus);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return json_encode("error 500");
            } 
        }


        public function tomarTicketsResueltoEmpleado($id,$idSesion)
        {
            $verificacion  = $this->checarSesionEmpleado($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                referencia,
                nombreEmpresa,
                rfcEmpresa,
                fechaCierre,
                horaCierre,
                tipoServicio,
                prioridad,
                estatus FROM info_tickets WHERE estatus=:estatus";
                $estatus = "2";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":estatus",$estatus);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return json_encode("error 500");
            } 
        }

        public function tomar_tickets_pendientes_empresas($id,$idSesion,$coincidencia)
        {
        $verificacion  = $this->checarSesionEmpresa($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "SELECT 
            id,
            referencia,
            nombreEmpresa,
            rfcEmpresa,
            fechaRegistro,
            horaRegistro,
            tipoServicio,
            prioridad,
            estatus FROM info_tickets WHERE estatus=:estatus AND nombreEmpresa=:nombre";
            $estatus = "1" ;
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":estatus",$estatus);
            $parametro->bindParam(":nombre",$coincidencia);
            $parametro->execute();
            $columnas = $parametro->rowCount();
            if($columnas==0)
            {
                return json_encode("error 400");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                return json_encode($datos);       
            }
        }  
        else
        {
            return json_encode("error 500");
        } 
    }

        public function tomarTicketsActivosEmpresa($id,$idSesion)
        {
        $verificacion  = $this->checarSesionEmpresa($id,$idSesion);
        if($verificacion==$idSesion)
        {
            $sql = "SELECT 
            id,
            referencia,
            nombreEmpresa,
            rfcEmpresa,
            fechaRegistro,
            horaRegistro,
            tipoServicio,
            prioridad,
            estatus FROM info_tickets WHERE estatus=:estatus";
            $estatus = "1";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":estatus",$estatus);
            $parametro->execute();
            $columnas = $parametro->rowCount();
            if($columnas==0)
            {
                return json_encode("error 400");
            }
            else
            {
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                return json_encode($datos);       
            }
        }  
        else
        {
            return json_encode("error 500");
        } 
    }
    
    
    public function tomarTicketsNoResueltoEmpresa($id,$idSesion)
        {
            $verificacion  = $this->checarSesionEmpresa($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                referencia,
                nombreEmpresa,
                rfcEmpresa,
                fechaCierre,
                horaCierre,
                tipoServicio,
                prioridad,
                estatus FROM info_tickets WHERE estatus=:estatus";
                $estatus = "0";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":estatus",$estatus);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return json_encode("error 500");
            } 
        }
        public function tomarTicketsResueltoEmpresa($id,$idSesion)
        {
            $verificacion  = $this->checarSesionEmpresa($id,$idSesion);
            if($verificacion==$idSesion)
            {
                $sql = "SELECT 
                id,
                referencia,
                nombreEmpresa,
                rfcEmpresa,
                fechaCierre,
                horaCierre,
                tipoServicio,
                prioridad,
                estatus FROM info_tickets WHERE estatus=:estatus";
                $estatus = "2";
                $modelo = new Servidor();
                $conexion = $modelo->conectar();
                $parametro = $conexion->prepare($sql);
                $parametro->bindParam(":estatus",$estatus);
                $parametro->execute();
                $columnas = $parametro->rowCount();
                if($columnas==0)
                {
                    return json_encode("error 400");
                }
                else
                {
                    $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);  
                    return json_encode($datos);       
                }
            }  
            else
            {
                return json_encode("error 500");
            } 
        }

    public function cambiar_contrasena($id,$idSesion,$contrasena,$tipo_usuario)
    {
    $verificacion  = $this->checarSesion($id,$idSesion);
    $verificacionEmpleado  = $this->checarSesionEmpleado($id,$idSesion);
    $verificacionEmpresa  = $this->checarSesionEmpresa($id,$idSesion);
    if($verificacion==$idSesion || $verificacionEmpresa==$idSesion || $verificacionEmpleado==$idSesion)
    {
        $sql = "";
        $modelo = new Servidor();
        $conexion = $modelo->conectar();
        if($tipo_usuario=="ADMINISTRADOR")
        {
            $sql = "UPDATE administrador SET contrasenaAdministrador=:contrasena WHERE id=:id";
        }
        if($tipo_usuario=="EMPLEADO")
        {
            $sql = "UPDATE empleado SET contrasenaEmpleado=:contrasena WHERE id=:id";
        }
        if($tipo_usuario=="EMPRESA")
        {
            $sql = "UPDATE empresas SET contrasenaEmpresa=:contrasena WHERE id=:id";
        }
        $contrasena = sha1($contrasena);
        $contrasena = sha1($contrasena);
        $parametro = $conexion->prepare($sql);
        $parametro->bindParam(":contrasena",$contrasena);
        $parametro->bindParam(":id",$id);
        if($parametro->execute())
        {
            return "se cambio correctamente";
        }
        else
        {
            return "error";
        }
    }
    else
    {
        return "ERROR";
    }
}



public function comprobar_codigo($codigo,$tipo_usuario)
{
    $modelo = new Servidor();
    $conexion = $modelo->conectar();
    $sql = "";
    if($tipo_usuario=="DM")
    {
        $sql = "SELECT idSesion FROM administrador WHERE idSesion=:codigo";
    }
    if($tipo_usuario=="EM")
    {
        $sql = "SELECT idSesion FROM empleado WHERE idSesion=:codigo";
    }
    if($tipo_usuario=="PS")
    {
        $sql = "SELECT idSesion FROM empresas WHERE idSesion=:codigo";
    }

    $parametro = $conexion->prepare($sql);
    $parametro->bindParam(":codigo",$codigo);
    $parametro->execute();
    $columnas = $parametro->rowCount();
    if($columnas==0)
    {
        return "error";
    }
    else
    {
        return $codigo;
    }
}

public function comprobar_correo($correo)
{
    $columnas = "";
    $cifrado = "";
    $sql = "SELECT correoAdministrador FROM administrador WHERE correoAdministrador=:correo";
    $modelo = new Servidor();
    $conexion = $modelo->conectar();
    $parametro = $conexion->prepare($sql);
    $parametro->bindParam(":correo",$correo);
    $parametro->execute();
    $columnas = $parametro->rowCount();
    if($columnas==0)
    {
        // return "no existe";
        $sql2 = "SELECT correoEmpleado FROM empleado WHERE correoEmpleado=:correo";
        $modelo = new Servidor();
        $conexion = $modelo->conectar();
        $parametro2 = $conexion->prepare($sql2);
        $parametro2->bindParam(":correo",$correo);
        $parametro2->execute();
        $columnas = $parametro2->rowCount();
        if($columnas==0)
        {
            $sql3 = "SELECT correoEmpresa FROM empresas WHERE correoEmpresa=:correo";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $parametro2 = $conexion->prepare($sql3);
            $parametro2->bindParam(":correo",$correo);
            $parametro2->execute();
            $columnas = $parametro2->rowCount();
            if($columnas==0)
            {
                return "no hay coincidencias";
            }
            else
            {
                $codigo_admin= "PS";
                $fecha = date("Y-m-d H:i:s");
                $cifrado = sha1($correo.$fecha);
                // insertar codigo random en tabla idSesion
                $sql_codigo = "UPDATE empresas SET idSesion=:cifrado WHERE correoEmpresa=:correo";
                $parametro_codigos = $conexion->prepare($sql_codigo);
                $parametro_codigos->bindParam(":correo",$correo);
                $parametro_codigos->bindParam(":cifrado",$cifrado);
                $parametro_codigos->execute();
                return $cifrado."---".$codigo_admin."---".$correo;
            }
        }
        else
        {
            $codigo_admin= "EM";
            $fecha = date("Y-m-d H:i:s");
            $cifrado = sha1($correo.$fecha);
            // insertar codigo random en tabla idSesion
            $sql_codigo = "UPDATE empleado SET idSesion=:cifrado WHERE correoEmpleado=:correo";
            $parametro_codigos = $conexion->prepare($sql_codigo);
            $parametro_codigos->bindParam(":correo",$correo);
            $parametro_codigos->bindParam(":cifrado",$cifrado);
            $parametro_codigos->execute();
            return $cifrado."---".$codigo_admin."---".$correo;
        }
    }
    else
    {
        $codigo_admin= "DM";
        $fecha = date("Y-m-d H:i:s");
        $cifrado = sha1($correo.$fecha);
        // insertar codigo random en tabla idSesion
        $sql_codigo = "UPDATE administrador SET idSesion=:cifrado WHERE correoAdministrador=:correo";
        $parametro_codigos = $conexion->prepare($sql_codigo);
        $parametro_codigos->bindParam(":correo",$correo);
        $parametro_codigos->bindParam(":cifrado",$cifrado);
        $parametro_codigos->execute();
        return $cifrado."---".$codigo_admin."---".$correo;
    }
}

public function reset_contrasena($correo,$codigo,$tipo_usuario,$nueva_contrasena)
{
    $sql = "";
    $modelo = new Servidor();
    $conexion = $modelo->conectar();
    if($tipo_usuario=="DM")
    {
        $sql = "UPDATE administrador SET contrasenaAdministrador=:contrasena WHERE correoAdministrador=:correo AND idSesion=:sesion";
    }
    if($tipo_usuario=="EM")
    {
        $sql = "UPDATE empleado SET contrasenaEmpleado=:contrasena WHERE correoEmpleado=:correo AND idSesion=:sesion";
    }
    if($tipo_usuario=="PS")
    {
        $sql = "UPDATE empresas SET contrasenaEmpresa=:contrasena WHERE correoEmpresa=:correo AND idSesion=:sesion";
    }
    $nueva_contrasena = sha1($nueva_contrasena);
    $nueva_contrasena = sha1($nueva_contrasena);
    $parametro = $conexion->prepare($sql);
    $parametro->bindParam(":contrasena",$nueva_contrasena);
    $parametro->bindParam(":sesion",$codigo);
    $parametro->bindParam(":correo",$correo);
    if($parametro->execute())
    {
        return "se cambio correctamente";
    }
    else
    {
        return "error";
    }
}
    public function cierreTicket($idUsuario, $sesion, $tipoUsuario,$id_ticket,$comentario,$motivo){
       

        $verificacion = $this -> checarSesion($idUsuario,$sesion);
        $verificacionEmpleado = $this -> checarSesionEmpleado($idUsuario,$sesion);
        if($verificacion == $sesion || $verificacionEmpleado == $sesion){
            $sql = "";
            $modelo = new Servidor();
            $conexion = $modelo->conectar();
            $fechaCierre =date("d/m/Y");
            $horaCierre =date("H:i:s");
            $sql = "SELECT comentarios FROM info_tickets WHERE id=:id_ticket";
            $parametro = $conexion->prepare($sql);
            $parametro->bindParam(":id_ticket",$id_ticket);
            $parametro->execute();
            $rows = $parametro->rowCount();
            if($rows==0)
            {
                return "no hay coincidencias";
            }
            else
            {
                $estatus = " ";
                $datos = $parametro->fetchAll(PDO::FETCH_ASSOC);
                $comentarios = $datos[0]["comentarios"];
                if ($motivo == "NO RESUELTO")
                {
                    $estatus = "0";
                    $formato_comentario =  'TICKET: NO RESUELTO **** MOTIVO: '.$motivo.'****DESCRIPCION: '.$comentario.'<br>';
                }
                if ($motivo == "RESUELTO")
                {
                    $estatus = "2";
                    $formato_comentario =  'TICKET: RESUELTO **** MOTIVO: '.$motivo.'****DESCRIPCION: '.$comentario.'<br>';
                }
                $comentarios = $formato_comentario.$comentarios;
                $sql3 = " ";
                $nombreCompleto = " ";

                if($tipoUsuario == "ADMINISTRADOR")
                {
                    $sql3 = "SELECT nombreAdministrador,apellidopAdministrador, apellidomAdministrador FROM administrador WHERE id=:id";
                    $parametro3 = $conexion->prepare($sql3);
                    $parametro3->bindParam(":id", $idUsuario);
                    $parametro3->execute();
    
                    if($parametro3->rowCount() == 0)
                    {
                        return "ERROR";
                    }
                    else
                    {
                        $datosUsuario = $parametro3->fetchAll(PDO::FETCH_ASSOC);
                        $nombreUsuario = $datosUsuario[0]['nombreAdministrador'];
                        $apellidoP = $datosUsuario[0]['apellidopAdministrador'];
                        $apellidoM = $datosUsuario[0]['apellidomAdministrador'];
                        $espacio = " ";

                        $nombreCompleto = $nombreUsuario.$espacio.$apellidoP.$espacio.$apellidoM;
                    }
                }
                if($tipoUsuario == "EMPLEADO")
                {
                    $sql3 = "SELECT nombreEmpleado,apellidopEmpleado, apellidomEmpleado FROM empleado WHERE id=:id";
                    $parametro3 = $conexion->prepare($sql3);
                    $parametro3->bindParam(":id", $idUsuario);
                    $parametro3->execute();
    
                    if($parametro3->rowCount() == 0)
                    {
                        return "ERROR";
                    }
                    else
                    {
                        $datosUsuario = $parametro3->fetchAll(PDO::FETCH_ASSOC);
                        $nombreUsuario = $datosUsuario[0]['nombreEmpleado'];
                        $apellidoP = $datosUsuario[0]['apellidopEmpleado'];
                        $apellidoM = $datosUsuario[0]['apellidomEmpleado'];
                        $espacio = " ";
                        $nombreCompleto = $nombreUsuario.$espacio.$apellidoP.$espacio.$apellidoM;
                    }
                }

                
                $sql2 = "UPDATE info_tickets SET empleadoCierre=:usuarioCierre, comentarios=:comentarios, estatus=:estatus, fechaCierre=:fechaCierre, horaCierre=:horaCierre WHERE id=:id_ticket";    
                $parametro2 = $conexion->prepare($sql2);
                $parametro2->bindParam(":usuarioCierre",$nombreCompleto);
                $parametro2->bindParam(":comentarios",$comentarios);
                $parametro2->bindParam(":id_ticket",$id_ticket);
                $parametro2->bindParam(":estatus",$estatus);
                $parametro2->bindParam(":fechaCierre",$fechaCierre);
                $parametro2->bindParam(":horaCierre",$horaCierre);
                $parametro2->execute();
                return "Ticket Finalizado";
            }
        }
        else
        {
            return "ERROR";
        }

    }
    


}
?>