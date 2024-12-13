<?php

// Simple PHP backend API
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Database file (JSON-based for simplicity)
const DB_FILE = 'users.json';

// Create database file if it doesn’t exist
if (!file_exists(DB_FILE)) {
    file_put_contents(DB_FILE, json_encode([]));
}

// Main router
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
error_log("Getting $method request for $path");
switch ($method) {
    case 'POST':
        error_log("POST request received");
        if ($path === '/users/auth') {
            authenticateUser();
        } elseif ($path === '/users/register') {
            registerUser();
        } else {
            response(404, ['message' => 'Endpoint not found']);
        }
        break;

    case 'GET':
          $file = __DIR__ . $path . ".csv";
          if (file_exists($file) && is_file($file)) {
            readfile($file);
          }
          else {
            response(404, ['message' => 'File not found']);
        }
        break;
    
    case 'OPTIONS':
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 86400');
        header('Content-Length: 0');
        response(200, null);
        break;
        
    default:
        response(405, ['message' => 'Method not allowed']);
        break;
}

// Helper functions
function authenticateUser() {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['userID'], $input['password'])) {
        response(400, ['message' => 'Missing userID or password']);
        return;
    }

    $users = loadDatabase();
    $userID = $input['userID'];
    $password = $input['password'];
    error_log("Authenticating user $userID");

    if (isset($users[$userID]) && password_verify($password, $users[$userID]['password'])) {
        response(200, ['message' => 'Authentication successful']);
    } else {
        response(401, ['message' => 'Invalid credentials']);
    }
}

function registerUser() {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['userID'], $input['password'])) {
        response(400, ['message' => 'Missing userID or password']);
        return;
    }

    $users = loadDatabase();
    $userID = $input['userID'];
    $password = $input['password'];

    if (isset($users[$userID])) {
        response(409, ['message' => 'User already exists']);
        return;
    }

    $users[$userID] = ['password' => password_hash($password, PASSWORD_DEFAULT)];
    saveDatabase($users);

    response(201, ['message' => 'User registered successfully']);
}

function loadDatabase() {
    return json_decode(file_get_contents(DB_FILE), true);
}

function saveDatabase($data) {
    file_put_contents(DB_FILE, json_encode($data, JSON_PRETTY_PRINT));
}

function response($statusCode, $data) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}