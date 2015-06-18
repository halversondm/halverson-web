<?php
// main
$json = json_decode ( file_get_contents ( "php://input" ) );
//var_dump ( $json );
$conn = openConn ();
$id = insertABCChecklist ( $json );
insertABCChecklistSupport ( $json->people, 'people', $id );
insertABCChecklistSupport ( $json->behavior, 'behavior', $id );
insertABCChecklistSupport ( $json->consequence, 'consequence', $id );
mysqli_commit ( $conn );
echo "<b>Saved to Database!<b>";
closeConn ();
function insertABCChecklistSupport($obj, $type, $id) {
	global $conn;
	$i = 1;
	$count = count ( $obj );
	$sql = "INSERT INTO abc_checklist_support (id, supportType, supportId, supportValue)
		VALUES";
	foreach ( $obj as $single ) {
		$sql .= "($id, '$type', $i, '$single')";
		if ($i < $count) {
			$sql .= ",";
		}
		$i += 1;
	}
	if ($conn->multi_query ( $sql ) === FALSE) {
		echo "Error: " . $sql . "<br>" . $conn->error;
		closeConn ();
		die ();
	}
}
function insertABCChecklist($obj) {
	global $conn;
	$timestamp = date ( 'Y-m-d H:i:s', strtotime ( $obj->when ) );
	$sql = "INSERT INTO abc_checklist (dateOfEvent, antecedent, duration, intensity, antecedentOther, peopleOther, behaviorOther, consequenceOther, location)
	VALUES ('$timestamp', '$obj->antecedent', '$obj->duration', '$obj->intensity', '$obj->antecedentOther', '$obj->peopleOther', '$obj->behaviorOther', '$obj->consequenceOther', '$obj->location')";
	if ($conn->query ( $sql ) === TRUE) {
		$last_id = $conn->insert_id;
		// echo "New record created successfully. Last inserted ID is: " . $last_id . "<br>";
		return $last_id;
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
		closeConn ();
		die ();
	}
}
function openConn() {
	$servername = "localhost";
	$username = "dmhweborg";
	$password = "loanMe1$";
	$dbname = "dmhweborg";
	
	// Create connection
	$conn = new mysqli ( $servername, $username, $password, $dbname );
	
	// Check connection
	if ($conn->connect_error) {
		die ( "Connection failed: " . $conn->connect_error );
	}
	mysqli_autocommit ( $conn, FALSE );
	// echo "Connected successfully <br>";
	return $conn;
}
function closeConn() {
	global $conn;
	$conn->close ();
}
?>