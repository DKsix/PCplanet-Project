CREATE SCHEMA IF NOT EXISTS pcplanet;

USE pcplanet;

CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario int auto_increment unique,
    nome varchar(30) not null,
    cpf bigInt(11) primary key not null,
    rg varchar(10) unique not null,
    email varchar(100) unique not null,
    senha varchar(150) not null
);

CREATE TABLE IF NOT EXISTS computadores(
    id int (10) auto_increment primary key,
    nome varchar(150) not null,
    marca varchar(35) not null,
    precoAvista varchar(50) not null,
    precoParcelado varchar(50) not null,
    precoParceladoInteiro bigInt(20) not null,
    processador varchar(150) not null,
    cooler varchar(150),
    placaMae varchar(150) not null,
    memoria varchar(150) not null,
    armazenamento varchar(150) not null,
    placaDeVideo varchar(150) not null,
    fonte varchar(100) not null,
    gabinete varchar(150) not null,
    image01 varchar(50) not null,
    image02 varchar(50) not null,
    image03 varchar(50) not null,
    image04 varchar(50) not null,
    link varchar(150) not null
);

INSERT INTO
    usuarios(nome, sobrenome, cpf, rg, email, senha)
Values
    (
        'carlos',
        'campos',
        12345678910,
        1234567891,
        'dudu@gmail.com',
        123456
    );

SELECT
    *
FROM
    usuarios
WHERE
    email = ''
    and senha = '';

UPDATE
    `pcplanet`.`usuarios`
SET
    `nome` = 'Mario'
WHERE
    (`nome` = 'Carlos');

$ sql = "CREATE SCHEMA IF NOT EXISTS 'pcplanet';

    USE pcplanet;

    CREATE TABLE IF NOT EXISTS  usuarios(
	nome varchar(30) not null,
    sobrenome varchar(30) not null,
    cpf bigInt(11) auto_increment primary key not null,
    rg varchar(10) unique not null,
    email varchar(100) unique not null,
    senha varchar(150) not null
    );";

$ result = $ conn -> query($ sql);