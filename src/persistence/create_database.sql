CREATE DATABASE IF NOT EXISTS desafio_venda_db;
USE desafio_venda_db;

CREATE TABLE bairro (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255)
);

CREATE TABLE cidade (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
    uf VARCHAR(255) NOT NULL
);

CREATE TABLE produto (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	valor_venda DECIMAL (7, 2) NOT NULL
);

CREATE TABLE pessoa (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_cidade INT NOT NULL,
    id_bairro INT NOT NULL,
	nome VARCHAR(255) NOT NULL,
	cep VARCHAR(9) NOT NULL,
	endereco VARCHAR(255) NOT NULL,
    numero VARCHAR(6) NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
	
	CONSTRAINT FK_PES_CID FOREIGN KEY (id_cidade) REFERENCES cidade(id),
    CONSTRAINT FK_PES_BAI FOREIGN KEY (id_bairro) REFERENCES bairro(id)
);

CREATE TABLE venda (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_pessoa INT NOT NULL,
	data_venda DATE,

	CONSTRAINT FK_VEN_PES FOREIGN KEY (id_pessoa) REFERENCES pessoa(id)
);


CREATE TABLE venda_item(
	id_venda INT NOT NULL,
	id_produto INT NOT NULL,
	quantidade INT NOT NULL,
	valor DECIMAL (8, 2) NOT NULL,
	subtotal DECIMAL (8, 2) NOT NULL,

	CONSTRAINT FK_VI_VEN FOREIGN KEY (id_venda) REFERENCES venda(id) ON DELETE CASCADE,
	CONSTRAINT FK_VI_PROD FOREIGN KEY (id_produto) REFERENCES produto(id),
	CONSTRAINT PK_VENIT PRIMARY KEY (id_venda, id_produto)
);
