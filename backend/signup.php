<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

include "config.php";

function validatePasswordStrength($password) {
    if (strlen($password) < 8) return "Password must be at least 8 characters";
    if (!preg_match('/[A-Z]/', $password)) return "Password must contain an uppercase letter";
    if (!preg_match('/[a-z]/', $password)) return "Password must contain a lowercase letter";
    if (!preg_match('/[0-9]/', $password)) return "Password must contain a number";
    if (!preg_match('/[^A-Za-z0-9]/', $password)) return "Password must contain a symbol";
    return null;
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if(!$username || !$password){
        echo json_encode(["success" => false, "message" => "Username and password are required"]);
        exit;
    }

    $pwError = validatePasswordStrength($password);
    if ($pwError) {
        echo json_encode(["success" => false, "message" => $pwError]);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->execute([$username, $hashedPassword]);

        echo json_encode(["success" => true, "message" => "User registered successfully"]);
        exit;

    } catch(PDOException $e) {

        if(str_contains($e->getMessage(), 'UNIQUE')){
            echo json_encode(["success" => false, "message" => "Username already exists"]);
        } else {
            echo json_encode(["success" => false, "message" => "DB Error: " . $e->getMessage()]);
        }
        exit;
    }
}

echo json_encode(["success" => false, "message" => "Invalid request"]);
?>
