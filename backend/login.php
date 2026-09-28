<?php
header("Content-Type: application/json");
include "config.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if($user && password_verify($password, $user['password'])){
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "username" => $user['username'],
            "role" => $user['role']
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid username or password"]);
    }
}
?>
