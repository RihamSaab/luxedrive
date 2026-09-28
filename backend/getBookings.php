<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "config.php";

try {
    $username = $_GET['username'] ?? '';

    if ($username) {
        $stmt = $conn->prepare(
            "SELECT id, username, pickup_location, pickup_date, dropoff_location, dropoff_date, car_info, phone, created_at
             FROM bookings WHERE username = ? ORDER BY id DESC"
        );
        $stmt->execute([$username]);
    } else {
        $stmt = $conn->prepare(
            "SELECT id, username, pickup_location, pickup_date, dropoff_location, dropoff_date, car_info, phone, created_at
             FROM bookings ORDER BY id DESC"
        );
        $stmt->execute();
    }

    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success"  => true,
        "bookings" => $bookings
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "DB error: " . $e->getMessage()
    ]);
}
?>
