<?php
// One-off endpoint to promote a user to admin.
// Secret is read from PROMOTE_SECRET env var (configured in Render dashboard).

header("Content-Type: application/json");
include "config.php";

$SECRET = getenv('PROMOTE_SECRET') ?: '';

if ($SECRET === '') {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "PROMOTE_SECRET env var not set"]);
    exit;
}

$secret   = $_GET['secret']   ?? '';
$username = $_GET['username'] ?? '';

if ($secret !== $SECRET) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Forbidden"]);
    exit;
}

if (!$username) {
    echo json_encode(["success" => false, "message" => "username required"]);
    exit;
}

$stmt = $conn->prepare("UPDATE users SET role = 'admin' WHERE username = ?");
$stmt->execute([$username]);

echo json_encode([
    "success" => true,
    "message" => "Promoted '{$username}' to admin.",
    "rows_affected" => $stmt->rowCount(),
]);
?>
