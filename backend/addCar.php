<?php
header(header: "Content-Type: application/json");
include "config.php";

$targetDir = getenv('UPLOAD_DIR') ?: "upload/";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // retrieve car details from POST request
    $brand = $_POST['brand'];
    $type = $_POST['type'];
    $model = $_POST['model'];
    $year = $_POST['year'];
    $price_per_day = $_POST['price_per_day'];
    $passengers = $_POST['passengers'];
    $transmission = $_POST['transmission'];
    $fuel_type = $_POST['fuel_type'];
// handle image upload
    $image = "";
    if(isset($_FILES['image'])) {
        $imageName = time() . "_" . $_FILES['image']['name'];
        $targetFile = $targetDir . $imageName;
        if(!is_dir(filename: $targetDir)) {
            mkdir(directory: $targetDir, permissions: 0777, recursive: true);
        }
        if(move_uploaded_file(from: $_FILES['image']['tmp_name'], to: $targetFile)){
            $image = $targetFile;
        }
    }

    $stmt = $conn->prepare(query: "INSERT INTO cars (brand, type, model, year, price_per_day, passengers, transmission, fuel_type, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute(params: [$brand, $type, $model, $year, $price_per_day, $passengers, $transmission, $fuel_type, $image]);

    echo json_encode(value: ["success" => true, "message" => "Car added successfully"]);
}
?>
