<?php
header("Content-Type: application/json");
include "config.php";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';

    $MAX_ATTEMPTS = 5;
    $WINDOW_MINUTES = 15;

    $stmt = $conn->prepare("
        SELECT COUNT(*) FROM login_attempts
        WHERE username = ?
        AND success = 0
        AND attempted_at > DATE_SUB(NOW(), INTERVAL {$WINDOW_MINUTES} MINUTE)
    ");
    $stmt->execute([$username]);
    $failures = (int)$stmt->fetchColumn();

    if ($failures >= $MAX_ATTEMPTS) {
        echo json_encode([
            "success" => false,
            "message" => "Too many failed attempts. Try again in {$WINDOW_MINUTES} minutes."
        ]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $success = $user && password_verify($password, $user['password']);

    $log = $conn->prepare("INSERT INTO login_attempts (username, ip, success) VALUES (?, ?, ?)");
    $log->execute([$username, $ip, $success ? 1 : 0]);

    if($success){
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "username" => $user['username'],
            "role" => $user['role']
        ]);
    } else {
        $remaining = max(0, $MAX_ATTEMPTS - $failures - 1);
        echo json_encode([
            "success" => false,
            "message" => "Invalid username or password" . ($remaining <= 2 ? " ({$remaining} attempts left)" : "")
        ]);
    }
}
?>
