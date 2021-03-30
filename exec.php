<?php
header('Access-Control-Allow-Origin: https://arturo-lang.io');
//error_reporting(~0);
//ini_set('display_errors', 1);
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$code = $_POST['c'];

$temp_file = tempnam(sys_get_temp_dir(), 'art');
file_put_contents($temp_file, $code."\n");

// //$temp = tmpfile();
// //fwrite($temp, $code);
// //fseek($temp, 0);
// //echo fread($temp, 1024);

// //$fname = "tmp".rand(1,10000).".art";
// //$i = file_put_contents("/var/www/$fname", $code);
$i = exec ("/var/www/arturo-lang.io/arturo \"$temp_file\" 2>&1",$output);

// //print_r($i);
// //print_r($output);
foreach ($output as $outp)
{
	echo trim($outp)."<br>";
}
	/*
// 	$oo = str_replace("[0m","",$outp);
// 	$oo = str_replace("File","\n| File",$oo);
// 	$oo = str_replace("[37m","",$oo);
// 	$oo = str_replace("[32m","",$oo);
// 	$oo = str_replace("[31m","",$oo);

// 	echo trim($oo)."\n";*/
// }


// fclose($temp); // this removes the file



?>