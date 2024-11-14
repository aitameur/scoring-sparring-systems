CREATE DATABASE IF NOT EXISTS tkd_tournament;
USE tkd_tournament;

CREATE TABLE IF NOT EXISTS tournaments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tournament_id INT,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
);

CREATE TABLE IF NOT EXISTS matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tournament_id INT,
    blue_player VARCHAR(255) NOT NULL,
    red_player VARCHAR(255) NOT NULL,
    winner VARCHAR(255),
    blue_score INT DEFAULT 0,
    red_score INT DEFAULT 0,
    blue_penalties INT DEFAULT 0,
    red_penalties INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
);