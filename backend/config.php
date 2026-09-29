
<?php
// PHP connection to SQLite database
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $db_file = getenv('DB_PATH') ?: __DIR__ . "/car_rental.sqlite";
    $conn = new PDO("sqlite:" . $db_file);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Cars table 
    $conn->exec("
        CREATE TABLE IF NOT EXISTS cars (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brand TEXT NOT NULL,
            type TEXT NOT NULL,
            model TEXT NOT NULL,
            year INTEGER NOT NULL,
            price_per_day REAL NOT NULL,
            passengers INTEGER,
            transmission TEXT,
            fuel_type TEXT,
            image TEXT
        )
    ");

    // Users table

$conn->exec("
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user' -- can be 'user' or 'admin'
    )
");

    // Bookings table
    $conn->exec("
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            pickup_location TEXT NOT NULL,
            pickup_date TEXT NOT NULL,
            dropoff_location TEXT,
            dropoff_date TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // Add car_info / phone columns for existing databases (safe if already added)
    try { $conn->exec("ALTER TABLE bookings ADD COLUMN car_info TEXT"); } catch (PDOException $e) { /* column exists */ }
    try { $conn->exec("ALTER TABLE bookings ADD COLUMN phone TEXT"); } catch (PDOException $e) { /* column exists */ }


} catch(PDOException $e) {
    die("DB error: " . $e->getMessage());
}
?>
