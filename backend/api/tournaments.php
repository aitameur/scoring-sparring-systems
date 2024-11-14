<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once "../config/database.php";

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        try {
            $stmt = $pdo->prepare("SELECT * FROM tournaments");
            $stmt->execute();
            $tournaments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($tournaments);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        try {
            $stmt = $pdo->prepare("INSERT INTO tournaments (name, date) VALUES (?, ?)");
            $stmt->execute([$data->name, $data->date]);
            echo json_encode(["message" => "Tournament created successfully"]);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
        break;
}
?>