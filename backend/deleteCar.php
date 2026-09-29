<?php
header("Content-Type: application/json");
include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        echo json_encode(["success" => false, "message" => "Car ID is required"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT image FROM cars WHERE id = ?");
    $stmt->execute([$id]);
    $car = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$car) {
        echo json_encode(["success" => false, "message" => "Car not found"]);
        exit;
    }

    if (!empty($car['image']) && file_exists(__DIR__ . '/' . $car['image'])) {
        @unlink(__DIR__ . '/' . $car['image']);
    }

    $stmt = $conn->prepare("DELETE FROM cars WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(["success" => true, "message" => "Car deleted"]);
    exit;
}

echo json_encode(["success" => false, "message" => "Invalid request"]);
?>
