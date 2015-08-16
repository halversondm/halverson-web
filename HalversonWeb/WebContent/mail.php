<?php 

$to = "daniel.m.halverson@gmail.com";
$from = $_POST["emailAddress"];
$subject = $_POST["subject"];
$message = $_POST["message"];
$headers = "From: " . $from;

mail($to, $subject, $message, $headers);

?>