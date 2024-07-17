<?php
require 'C:\xampp\htdocs\PCplanet-Project-main\vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


include_once ("/xampp/htdocs/PCplanet-Project-main/php/config.php");
$conn = getConnection($hostname, $user, $password, $database);

$key = 'pcplanetsecretkey123';
$action = $_REQUEST["action"];
$return = array();

// Requisição listar usuários
if ($action == "user-profile") {
    $query = "SELECT nome, 
    email, 
    cpf
    FROM usuarios";

    $result = $conn->query($query);
    while ($row = $result->fetch_assoc()) {
        $return[] = $row;
    }
    $conn->close();
    die(json_encode($return));
}

// Requisição registrar usuário
if ($action == "register-user") {
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

            $return["status"] = "success";
            $payload = [
                'iss' => 'pcplanet-admin',
                'aud' => 'user',
                'iat' => time(),
                'exp' => $expirationTime,
                'id' => $idUser
            ];

            $jwt = JWT::encode($payload, $key, 'HS256');

            header("Authorization: Bearer " . $jwt);
        } else {
            header("HTTP/1.1 401 Unauthorized");
            $return["status"] = "error";
        }
    }

    $conn->close();
    die(json_encode($return));
}

if ($action == "profile-user") {
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
        echo "Authorization Header not found";
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

    die(json_encode($response));


    
}

// alterar dados
if ($action == "profile-user-edit") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $senhaAtual = md5($data['senhaAtual']);
    $senhaNova =  md5($data['senhaNova']);
    $email = ($data['email']);
 
    // $sql = "SELECT senha FROM usuarios WHERE email = ?";
    // if ($stmt = $conn->prepare($sql)) {
    //     $stmt->bind_param("s", $email);
    //     $stmt->execute();
    //     $stmt->bind_result($senhaDB);  
    //     $stmt->fetch();
    //     $stmt->close();
    // }
    
    $sql = "UPDATE usuarios SET senha = '$senhaNova' WHERE email = '$email' AND senha = '$senhaAtual'";

    $result = $conn->query($sql);
   
    print($result);
    if (mysqli_fetch_array($result) > 0){
        $return["status"] = "Senha atualizada com sucesso." . $result;
    } else {
        $return["status"] = "Erro ao atualizar a senha: " . $result;
    }

    // if ($stmt = $conn->prepare($sql)) {
    //     $stmt->bind_param("sss", $senhaNova, $email, $senhaAtual);
    //     if ($stmt->execute()) {
            
    //     } else {
            
    //     }
    //     $stmt->close();
    // } else {
    //     $return["status"] = "Erro ao preparar a declaração: " . $conn->error;
    // }
    

    die(json_encode($return));
}


?>