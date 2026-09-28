<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username         = $_POST['username'] ?? '';
    $pickup_location  = $_POST['pickup_location'] ?? '';
    $pickup_date      = $_POST['pickup_date'] ?? '';
    $dropoff_location = $_POST['dropoff_location'] ?? '';
    $dropoff_date     = $_POST['dropoff_date'] ?? '';
    $car_info         = $_POST['car_info'] ?? '';
    $phone            = $_POST['phone'] ?? '';

    if (!$username || !$pickup_date) {
        echo json_encode([
            "success" => false,
            "message" => "Username and pickup date are required"
        ]);
        exit;
    }

    // If booking a specific car and no location provided, use the car label
    if (!$pickup_location && $car_info) {
        $pickup_location = $car_info;
    }

    try {
        $stmt = $conn->prepare(
            "INSERT INTO bookings (username, pickup_location, pickup_date, dropoff_location, dropoff_date, car_info, phone)
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([
            $username,
            $pickup_location,
            $pickup_date,
            $dropoff_location,
            $dropoff_date,
            $car_info,
            $phone
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Booking created successfully",
            "booking_id" => $conn->lastInsertId()
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "message" => "DB Error: " . $e->getMessage()
        ]);
    }
    exit;
}

echo json_encode(["success" => false, "message" => "Invalid request"]);
?>
