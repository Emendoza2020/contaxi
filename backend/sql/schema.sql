CREATE DATABASE IF NOT EXISTS backend_mvc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE backend_mvc;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  ci VARCHAR(20),
  telefono VARCHAR(20),
  direccion VARCHAR(150)
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  estado TINYINT DEFAULT 1,
  id_persona INT NOT NULL,
  id_rol INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_persona) REFERENCES personas(id) ON DELETE CASCADE,
  FOREIGN KEY (id_rol) REFERENCES roles(id)
);

-- Roles iniciales
INSERT INTO roles (nombre) VALUES ('admin'), ('user');

-- Admin inicial (la contraseña se puede generar con bcrypt desde Node)
INSERT INTO personas (nombres, apellidos, ci, telefono, direccion)
VALUES ('Admin', 'Principal', '123456', '70000000', 'Oficina Central');

INSERT INTO usuarios (email, password, id_persona, id_rol)
VALUES ('admin@example.com', '$2b$10$h3px9EuyY9P1RXtGmjKRTO6p3Xv2f4QBGZyF72XJwb7n0D.8S8wrW', 1, 1);
-- contraseña: admin123