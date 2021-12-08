<?php
$cadena_final = "";
$numero  = 158;
$cadena = ' <tr><td class="text_item" style ="border:none;">Hola || ejemplo EMPRESA 24/10/2021 21:33:6</td></tr><tr><td class="text_item" style ="border:none;">holaaaa || carlos EMPLEADO 24/10/2021 22:34:6</td></tr><tr><td class="text_item" style ="border:none;">buenas buenas
|| carlos ADMINISTRADOR 3/11/2021 2:3:36</td></tr><tr><td class="text_item" style ="border:none;">hola
jajaja
|| carlos ADMINISTRADOR 3/11/2021 2:3:42</td></tr><tr><td class="text_item" style ="border:none;">asi es otro
|| carlos ADMINISTRADOR 3/11/2021 2:3:50</td></tr><tr><td class="text_item" style ="border:none;">Asi es otro || carlos ADMINISTRADOR 3/11/2021 2:3:55</td></tr><tr><td class="text_item" style ="border:none;">Asi es otro || carlos ADMINISTRADOR 3/11/2021 2:4:2</td></tr><tr><td class="text_item" style ="border:none;">Asie s otro comentario
|| carlos ADMINISTRADOR 3/11/2021 2:4:13</td></tr>';

// echo ceil(strlen($cadena)/$numero);
for ($i=0; $i < ceil(strlen($cadena)/$numero); $i++) 
{ 
    $cadena_final =  $cadena_final.substr($cadena, $i*$numero, $numero)."<br>";
}

$cadena_array = explode("<br>", $cadena_final);
echo "<pre>";
var_dump($cadena_array);
echo "</pre>";
// echo $cadena_final;
?>