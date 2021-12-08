<?php
include_once ('../modelo/acciones.php');
include_once ('FPDF/fpdf.php');

$sesion = $_SESSION['idSesion'];
$idUsuario = $_SESSION['idUsuario'];
$tipo_usuario = $_SESSION['tipoUsuario'];

$modelo = new Acciones();;
if(isset($_GET['token']))
{
    $numero = 158;
    $cadena_final = "";
    $texto = "EJEMPLO";
    $idTicket = $_GET['token'];
    $datos = $modelo->tomar_informacion_ticket($idUsuario,$sesion,$idTicket,$tipo_usuario);
    $datos = $datos[0];
    // var_dump($datos);
    $folio = $datos['referencia'];
    $id = $datos['id'];
    $comodin = $datos['comentarios'];
    $nombreE = $datos['nombreEmpresa'];
    $rfc = $datos['rfcEmpresa'];
    $fechaRegistro = $datos['fechaRegistro'];
    $horaRegistro = $datos['horaRegistro'];
    $fechaCierre = $datos['fechaCierre'];
    $HoraCierre = $datos['horaCierre'];
    $tipoServicio = $datos['tipoServicio'];
    $problematica = $datos['descripcion'];
    $cierreEmpleado = $datos['empleadoCierre'];
    $prioridad = $datos['prioridad'];

    $datosE = $modelo-> tomar_informacion_factura($idUsuario,$sesion,$rfc);
    $datosE = $datosE[0];
    $razonsocialEmpresa = $datosE['razonsocialEmpresa'];
    $domicilioEmpresa = $datosE['domicilioEmpresa'];
    $numerocalleEmpresa = $datosE['numerocalleEmpresa'];
    $coloniaEmpresa = $datosE['coloniaEmpresa'];
    $telefonoEmpresa = $datosE['telefonoEmpresa'];
    $correoEmpresa = $datosE['correoEmpresa'];

    // echo $comodin;

    $pdf = new FPDF('P','mm',array(215.9,279.4));   
    
    $pdf->AddPage();
    $pdf->Image("../recursos/img/pdf/formato_prueba.png",0,0,215.9,279.4,'PNG');
    // estilos de textos
    $pdf->SetFont('Arial','B',7.5);
    // posiciones de textos

    //No ticket 
    $pdf->Text(26.5,54.7,$id);
    // No Folio
    $pdf->Text(69.6,54.7,$folio);
    //Fecha Alta
    $pdf->Text(155,54.8,$fechaRegistro.' '. $horaRegistro);

    //Fecha cierre
    $pdf->Text(157.2,62.5,$fechaCierre.' '.$HoraCierre);

    //Empresa
    //$pdf->Text(24.5,59.6,$nombreE);
    $pdf->Text(24.5,59.6,utf8_decode($nombreE));



    //rfc
    //$pdf->Text(17.5,64.8,$rfc);
    $pdf->Text(17.5,64.8,utf8_decode($rfc));


    // razon social
    //$pdf->Text(30,69.5,$razonsocialEmpresa);
    $pdf->Text(30,69.5,utf8_decode($razonsocialEmpresa));


    //domicilio
    //$pdf->Text(25.5,74.6,$domicilioEmpresa.' '.$numerocalleEmpresa);
    $pdf->Text(25.5,74.6,utf8_decode($domicilioEmpresa).' '.$numerocalleEmpresa);


    //Colonia
    //$pdf->Text(23,79.7,$coloniaEmpresa);
    $pdf->Text(23,79.7,utf8_decode($coloniaEmpresa));


    //telefono
    $pdf->Text(24,84.6,$telefonoEmpresa);

    //correo
    //$pdf->Text(39,89.7,$correoEmpresa);
    $pdf->Text(39,89.7,utf8_decode($correoEmpresa));


    // Tipo servicio
    //$pdf->Text(36.5,98.4,$tipoServicio);
    $pdf->Text(36.5,98.4,utf8_decode($tipoServicio));



    //prioridad
    $pdf->Text(124.5,98.4,$prioridad);


    //problematica 
    //$pdf->Text(48,105.8,$problematica);    
    $pdf->Text(48,105.8,utf8_decode($problematica));    
    //firma empresa
    //$pdf->Text(53,217,$nombreE);
    $pdf->Text(53,217,utf8_decode($nombreE));


    //firma empleado
    //$pdf->Text(140,217,$cierreEmpleado);
    $pdf->Text(140,217,utf8_decode($cierreEmpleado));




    //comentarios
    // $pdf->Text(7.2,124,$comodin);
    for ($i=0; $i < ceil(strlen($comodin)/$numero); $i++) 
    {       
        $cadena_final =$cadena_final.substr($comodin, $i*$numero, $numero);
        // echo substr($comodin, $i*$numero, $numero);
    }
    $cadena_filas = explode("<br>",$cadena_final);
    $cadena_filas  = array_filter($cadena_filas);
    // echo "<pre>";
    // var_dump(array_filter($cadena_filas));
    // echo "</pre>";
    if (count($cadena_filas)<9)
    {
        for($i=0;$i<count($cadena_filas);$i++)
        {
            if(isset($cadena_filas[$i]))
            {
                
                $pdf->Text(7.2,124+$i*5,utf8_decode(str_replace("****"," ",$cadena_filas[$i])));
                

                
            }
        }
        $pdf->Output('D',$folio.".pdf",true);
    }
    else
    {
        for($i=0;$i<9;$i++)
        {
            $pdf->Text(7.2,126+$i*4,utf8_decode(str_replace("****"," ",$cadena_filas[$i])));
        }
        $pdf->AddPage();
        $pdf->Image("../recursos/img/pdf/formato_segunda_pagina.png",0,0,215.9,279.4,'PNG');
        for($i=9;$i<count($cadena_filas);$i++)
        {
            $pdf->Text(7.2,-30+$i*10,utf8_decode(str_replace("****"," ",$cadena_filas[$i])));
        }
        $pdf->Output('D',$folio.".pdf",true);
    }
    // $pdf->Output('I',$folio.".pdf",true);
}
else
{
    echo "No se pudo generar el pdf";
}
?>