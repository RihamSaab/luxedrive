<?php
// One-off seed endpoint. Populates the cars table with sample luxury vehicles.
// DELETE THIS FILE after running it once.

header("Content-Type: application/json");
include "config.php";

$SECRET = "luxe-seed-2026-x9k2pQ";
$secret = $_GET['secret'] ?? '';

if ($secret !== $SECRET) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Forbidden"]);
    exit;
}

$cars = [
    ["Porsche", "Taycan", 2024, "Electric Sports Sedan", 800, 4, "2-speed automatic", "Electric", "upload/1763317808_car1.jpeg"],
    ["Ferrari", "488 GTB", 2020, "Sport", 1500, 2, "7-speed dual-clutch", "Petrol", "upload/1763317902_car2.jpg"],
    ["Lamborghini", "Aventador SVJ", 2022, "Sport", 2000, 2, "7-speed automatic", "Petrol", "upload/1763317998_car3.jpg"],
    ["Mercedes-Benz", "AMG GT", 2024, "Sport", 1200, 2, "7-speed dual-clutch", "Petrol", "upload/1763318113_car4.avif"],
    ["BMW", "M4 Competition", 2023, "Coupe", 700, 4, "8-speed automatic", "Petrol", "upload/1763318429_car5.jpg"],
    ["Audi", "R8 V10", 2022, "Sport", 1100, 2, "7-speed automatic", "Petrol", "upload/1763318514_car6.jpg"],
    ["McLaren", "720S", 2023, "Sport", 1800, 2, "7-speed dual-clutch", "Petrol", "upload/1763318611_car8.jpg"],
    ["Bentley", "Continental GT", 2024, "Grand Tourer", 900, 4, "8-speed automatic", "Petrol", "upload/1763318705_car10.png"],
    ["Rolls-Royce", "Ghost", 2024, "Luxury Sedan", 1400, 5, "8-speed automatic", "Petrol", "upload/1763318796_car12.jpg"],
    ["Koenigsegg", "Gemera", 2024, "Grand Tourer", 3000, 4, "Single-Speed", "Plug-in Hybrid", "upload/1763319018_car13.jpg"],
    ["Aston Martin", "DB11", 2023, "Grand Tourer", 1000, 4, "8-speed automatic", "Petrol", "upload/1763448988_testCar1.jpg"],
];

$conn->exec("DELETE FROM cars");

$stmt = $conn->prepare("INSERT INTO cars (brand, model, year, type, price_per_day, passengers, transmission, fuel_type, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$inserted = 0;
foreach ($cars as $c) {
    $stmt->execute($c);
    $inserted++;
}

echo json_encode([
    "success" => true,
    "message" => "Seeded {$inserted} cars. Now DELETE this file.",
    "cars_inserted" => $inserted,
]);
?>
