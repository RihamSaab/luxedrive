<?php
// One-off CLI utility to (re)set the admin password with a strong value.
// Usage:   php backend/setAdminPassword.php
// Delete this file after use.

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    exit("This script runs only from the command line.\n");
}

require __DIR__ . '/config.php';

function validatePasswordStrength($password) {
    if (strlen($password) < 12) return "Admin password must be at least 12 characters";
    if (!preg_match('/[A-Z]/', $password)) return "Password must contain an uppercase letter";
    if (!preg_match('/[a-z]/', $password)) return "Password must contain a lowercase letter";
    if (!preg_match('/[0-9]/', $password)) return "Password must contain a number";
    if (!preg_match('/[^A-Za-z0-9]/', $password)) return "Password must contain a symbol";
    return null;
}

echo "Enter new admin password (input hidden): ";
system('stty -echo');
$password = trim(fgets(STDIN));
system('stty echo');
echo "\n";

$err = validatePasswordStrength($password);
if ($err) {
    exit("Rejected: $err\n");
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("
    INSERT INTO users (username, password, role)
    VALUES ('admin', ?, 'admin')
    ON CONFLICT(username) DO UPDATE SET password = excluded.password, role = 'admin'
");
$stmt->execute([$hash]);

echo "Admin password updated successfully.\n";
