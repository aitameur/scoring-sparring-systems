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
            $stmt = $pdo->prepare("SELECT * FROM matches");
            $stmt->execute();
            $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($matches);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        try {
            $stmt = $pdo->prepare("INSERT INTO matches (tournament_id, blue_player, red_player, winner, blue_score, red_score, blue_penalties, red_penalties) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data->tournament_id,
                $data->blue_player,
                $data->red_player,
                $data->winner,
                $data->blue_score,
                $data->red_score,
                $data->blue_penalties,
                $data->red_penalties
            ]);
            echo json_encode(["message" => "Match recorded successfully"]);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
        break;
}
?>