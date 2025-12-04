<?php
// Enable debugging (remove after fixing)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuration
$uploadDir = __DIR__ . '/uploads/'; // Folder to save files
$maxFileSize = 5 * 1024 * 1024; // 5MB max
$allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'png'];
$logFile = __DIR__ . '/upload_log.txt'; // Log file for notifications
$yourEmail = 'kashisninja@gmail.com'; // Replace with your real email

// Create uploads folder if needed
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Check login (for portal)
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit;
}

// Process upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $studentName = htmlspecialchars($_POST['student_name'] ?? '');
    $file = $_FILES['uploaded_file'] ?? null;
    
    if (empty($studentName) || !$file) {
        die("Error: Missing name or file.");
    }
    
    $fileName = basename($file['name']);
    $fileSize = $file['size'];
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    if (!in_array($fileExt, $allowedTypes) || $fileSize > $maxFileSize) {
        die("Error: Invalid file or too large.");
    }
    
    // Save file with unique name
    $newFileName = $studentName . '_' . time() . '.' . $fileExt;
    $targetPath = $uploadDir . $newFileName;
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Log the upload
        $logMessage = date('Y-m-d H:i:s') . " - Student: $studentName sent file: $newFileName (Path: $targetPath)\n";
        file_put_contents($logFile, $logMessage, FILE_APPEND);
        
        // Try to send email
        $subject = "New File from $studentName";
        $message = "File uploaded: $newFileName\nDownload link: " . $_SERVER['HTTP_HOST'] . '/' . str_replace(__DIR__, '', $targetPath);
        if (mail($yourEmail, $subject, $message)) {
            echo "File sent successfully! Check your email.";
        } else {
            echo "File saved! Check upload_log.txt (email failed).";
        }
    } else {
        die("Error: Could not save file.");
    }
} else {
    die("Invalid request.");
}

?>
