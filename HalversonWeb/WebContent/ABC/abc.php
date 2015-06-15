<?php
echo "<b>Saved to Database!<b>";
$json = json_decode(file_get_contents("php://input"));
var_dump($json);
?>