<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$creds = require __DIR__ . '/db_credentials.php';

try {
    $dsn = "mysql:host={$creds['host']};dbname={$creds['db']};charset=utf8mb4";
    $conn = new PDO($dsn, $creds['user'], $creds['pass']);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $conn->exec("
        CREATE TABLE IF NOT EXISTS cars (
            id INT AUTO_INCREMENT PRIMARY KEY,
            brand VARCHAR(100) NOT NULL,
            type VARCHAR(100) NOT NULL,
            model VARCHAR(150) NOT NULL,
            year INT NOT NULL,
            price_per_day DECIMAL(10,2) NOT NULL,
            passengers INT,
            transmission VARCHAR(50),
            fuel_type VARCHAR(50),
            image VARCHAR(255)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    $conn->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'user'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    $conn->exec("
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            pickup_location VARCHAR(255) NOT NULL,
            pickup_date VARCHAR(50) NOT NULL,
            dropoff_location VARCHAR(255),
            dropoff_date VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            car_info VARCHAR(255),
            phone VARCHAR(50)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    try { $conn->exec("ALTER TABLE bookings ADD COLUMN car_info VARCHAR(255)"); } catch (PDOException $e) { /* column exists */ }
    try { $conn->exec("ALTER TABLE bookings ADD COLUMN phone VARCHAR(50)"); } catch (PDOException $e) { /* column exists */ }

    $conn->exec("
        CREATE TABLE IF NOT EXISTS login_attempts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            ip VARCHAR(45),
            success TINYINT DEFAULT 0,
            attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_login_attempts_uname_time (username, attempted_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

} catch(PDOException $e) {
    die("DB error: " . $e->getMessage());
}
?>
