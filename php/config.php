<?php 

    $hostname =  'localhost';
    $user = 'root';
    $password = '';
    $database = 'pcplanet';

    function getConnection ($hostname, $user, $password, $database) {
        $conn = new mysqli($hostname, $user, $password, $database);
        if ($conn->connect_error) {
            die("Error" . $conn->connect_error);
        }
        return $conn;
    };
?>