<?php

$hostname = 'localhost';
$user = 'root';
$password = 'root';
$database = 'pcplanet';

function getConnection($hostname, $user, $password, $database)
{
    static $createDB = false;
    if (!$createDB) {
        createDB($hostname, $user, $password);
        $createDB = true;
    }
    $conn = new mysqli($hostname, $user, $password, $database);
    if ($conn->connect_error) {
        die("Error" . $conn->connect_error);
    }
    return $conn;
}
;

function createDB($hostname, $user, $password){
    $conn = new mysqli($hostname, $user, $password);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $queries = [
        "CREATE SCHEMA IF NOT EXISTS pcplanet",
        "USE pcplanet",
        "CREATE TABLE IF NOT EXISTS usuarios (
            id_usuario INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(30) NOT NULL,
            cpf BIGINT(11) UNIQUE NOT NULL,
            rg VARCHAR(10) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            senha VARCHAR(150) NOT NULL
        )"
    ];

    foreach ($queries as $query) {
        if ($conn->query($query) === FALSE) {
            echo "Error executing SQL: " . $conn->error;
            error_log("MySQL Error: " . $conn->error);
            break;
        }
    }

    $conn->close();
}
?>