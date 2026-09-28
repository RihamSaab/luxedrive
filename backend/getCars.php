<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "config.php";

$stmt = $conn->prepare("SELECT * FROM cars ORDER BY id DESC");
$stmt->execute();
$cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($cars);
?>
