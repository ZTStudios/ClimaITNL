<?php 

$url = $_POST['url'];

$request = file_get_contents($url);

echo $request;

?>