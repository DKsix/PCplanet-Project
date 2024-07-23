<?php
require 'C:\xampp\htdocs\PCplanet-Project\vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


include_once ("/xampp/htdocs/PCplanet-Project/php/config.php");


$key = 'pcplanetsecretkey123';
$action = $_REQUEST["action"];
$return = array();

// Requisição listar usuários
if ($action == "user-profile") {
    $conn = getConnection($hostname, $user, $password, $database);
    $query = "SELECT nome, 
    email, 
    cpf
    FROM usuarios";

    $result = $conn->query($query);
    while ($row = $result->fetch_assoc()) {
        $return[] = $row;
    }

    header('Content-Type: application/json');
    $conn->close();
    die(json_encode($return));
}

// Requisição registrar usuário
if ($action == "register-user") {
    $conn = getConnection($hostname, $user, $password, $database);
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!empty($data)) {
        $nome = $data["nome"];
        $cpf = $data["cpf"];
        $rg = $data["rg"];
        $email = $data["email"];
        $senha = md5($data["senha"]);
        try {
            $stm = $conn->prepare("INSERT INTO usuarios(nome, cpf, rg, email, senha) Values (?, ?, ?, ?, ?);");
            $stm->bind_param("siiss", $nome, $cpf, $rg, $email, $senha);
            if ($stm->execute()) {
                $return["status"] = "success";
            }
        } catch (Exception $error) {
            $return["status"] = "Error";
            $return["error"] = $error->getMessage();
            $return["errorCode"] = $error->getCode();
        }
    } else {
        print ('not found data');
    }

    $conn->close();
    die(json_encode($return));
}

//  Login
if ($action == "login-user") {
    $conn = getConnection($hostname, $user, $password, $database);
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $expirationTime = strtotime("+2 days");

    if (!empty($data)) {
        $email = $data["email"];
        $senha = md5($data["senha"]);
        $sql = "SELECT * FROM usuarios WHERE email = '$email' and senha = '$senha';";
        $result = $conn->query($sql);

        if (mysqli_num_rows($result) > 0) {
            $row = $result->fetch_array();
            $idUser = $row['id_usuario'];
            
            $payload = [
                'iss' => 'pcplanet-admin',
                'aud' => 'user',
                'iat' => time(),
                'exp' => $expirationTime,
                'id' => $idUser
            ];
            $jwt = JWT::encode($payload, $key, 'HS256');

            $return["status"] = "200";
            header("Authorization: Bearer " . $jwt);
        } else {
            header("HTTP/1.1 401 Unauthorized");
            $return["status"] = "Error";
        }
    }

    $conn->close();
    header('Content-Type: application/json');
    die(json_encode($return));
}

// Mostrar dados
if ($action == "profile-user") {
    $conn = getConnection($hostname, $user, $password, $database);
    $authHeader = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        if (isset($requestHeaders['Authorization'])) {
            $authHeader = $requestHeaders['Authorization'];
        }
    }
    if ($authHeader) {
        $decoded = JWT::decode($authHeader, new Key($key, 'HS256'));
        $userId = ($decoded->id);
    } else {
        echo "Token não encontrado";
    }

    $sql = "SELECT * FROM usuarios WHERE id_usuario = '$userId'";
    $result = $conn->query($sql);
    $row = mysqli_fetch_array($result);
    $nome = $row["nome"];
    $email = $row["email"];
    $cpf = $row["cpf"];
    $senha = $row["senha"];

    $response = [
        'nome' => $nome,
        'email' => $email,
        'cpf' => $cpf
    ];

    $conn->close();
    header('Content-Type: application/json');
    die(json_encode($response));
}

// alterar dados
if ($action == "profile-user-edit") {
    $conn = getConnection($hostname, $user, $password, $database);
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $senhaAtual = md5($data['senhaAtual']);
    $senhaNova =  md5($data['senhaNova']);
    $email = ($data['email']);
    
    $sql = "UPDATE usuarios SET senha = ? WHERE email = ? AND senha = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sss", $senhaNova, $email, $senhaAtual);
        
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                $return = ["status" =>  "200"];
            } else {
                $return = ["status" => "Error", "message" => "Senha incorreta"];
            }
        } else {
            $return["status"] = "1064 " . $stmt->error;
        }
        $stmt->close();
    } else {
        $return["status"] = "Erro ao preparar a declaração: " . $conn->error;
    }

    $conn->close();
    header('Content-Type: application/json');
    die(json_encode($return));
}

// Deletar conta
if ($action == "profile-delete") {
    $conn = getConnection($hostname, $user, $password, $database);
    $authHeader = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        if (isset($requestHeaders['Authorization'])) {
            $authHeader = $requestHeaders['Authorization'];
        }
    }
    if ($authHeader) {
        try {
            $decoded = JWT::decode($authHeader, new Key($key, 'HS256'));
            $userId = $decoded->id;

            $sql = "DELETE FROM usuarios WHERE id_usuario = ?";
            if ($stmt = $conn->prepare($sql)) {
                $stmt->bind_param("i", $userId);
                if ($stmt->execute()) {
                    $return = ["status" => ($stmt->affected_rows > 0) ? "200" : "Error"];
                } else {
                    $return = ["status" => "Error", "message" => "Erro ao executar o sql"];
                }
            } else {
                $return = ["status" => "Error", "message" => "Erro ao preparar o sql"];
            }
        } catch (Exception $e) {
            $return = ["status" => "Error", "message" => "Token invalido ou erro ao decodificar: " . $e->getMessage()];
        }
    } else {
        $return = ["status" => "Error", "message" => "Token não encontrado"];
    }

    $conn->close();
    header('Content-Type: application/json');
    echo json_encode($return);
}
?>