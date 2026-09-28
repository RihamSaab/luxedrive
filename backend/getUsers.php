<?php
header("Content-Type: application/json");
include "config.php"; // use your existing SQLite connection

try {
    $stmt = $conn->prepare("SELECT id, username, role FROM users ORDER BY id DESC");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "users" => $users
    ], JSON_PRETTY_PRINT);

} catch(PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "DB error: " . $e->getMessage()
    ]);
}
?>
