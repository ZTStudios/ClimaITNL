<?php 

$url = $_GET['url'];

$request = file_get_contents($url);

echo $request;

?>