<?php
header('Access-Control-Allow-Origin: https://arturo-lang.io');

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$code = $_POST['c'];
if (trim($_POST['i'])!="") {
	$temp_file = "/tmp/art_".$_POST['i'];
}
else {
	$temp_file = tempnam(sys_get_temp_dir(), 'art_');
}
file_put_contents($temp_file, $code."\n");

$i = exec ("/var/www/arturo-lang.io/arturo $temp_file 2>&1 | aha --no-header --black",$output);

$txt = "";
foreach ($output as $outp)
{
	$txt .= str_replace("\t","&nbsp;&nbsp;&nbsp;&nbsp;",$outp). "<br>";
}

$final = array(
	"text" => $txt,
	"code" => str_replace("art_","",str_replace("/tmp/", "", $temp_file))
);

echo json_encode($final);

?>