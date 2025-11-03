-- ===========================================
-- BASE DE DATOS: YANGO REGION ACHACACHI (La Paz - Omasuyos)
-- ===========================================

CREATE DATABASE IF NOT EXISTS contaxi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE contaxi_db;

-- ===========================================
-- TABLA: region
-- ===========================================
CREATE TABLE region (
    id_region INT AUTO_INCREMENT PRIMARY KEY,
    departamento VARCHAR(100) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200),
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertamos la única región permitida
INSERT INTO region (departamento, provincia, municipio, descripcion)
VALUES ('La Paz', 'Omasuyos', 'Achacachi', 'Zona habilitada para operación del sistema Yango');

-- ===========================================
-- TABLA: rol
-- ===========================================
CREATE TABLE rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- TABLA: persona
-- ===========================================
CREATE TABLE persona (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    ci VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- TABLA: usuario
-- ===========================================
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    id_rol INT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_persona) REFERENCES persona(id_persona),
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

-- ===========================================
-- TABLA: conductor
-- ===========================================
CREATE TABLE conductor (
    id_conductor INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    licencia VARCHAR(30) NOT NULL,
    categoria_licencia VARCHAR(10),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
);

-- ===========================================
-- TABLA: vehiculo
-- ===========================================
CREATE TABLE vehiculo (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    placa VARCHAR(15) UNIQUE NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    anio INT,
    color VARCHAR(30),
    capacidad INT DEFAULT 4,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_conductor) REFERENCES conductor(id_conductor)
);

-- ===========================================
-- TABLA: pasajero
-- ===========================================
CREATE TABLE pasajero (
    id_pasajero INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
);

-- ===========================================
-- TABLA: solicitud_viaje
-- ===========================================
CREATE TABLE solicitud_viaje (
    id_solicitud INT AUTO_INCREMENT PRIMARY KEY,
    id_region INT NOT NULL,
    id_pasajero INT NOT NULL,
    id_conductor INT,
    id_vehiculo INT,
    origen VARCHAR(150) NOT NULL,
    destino VARCHAR(150) NOT NULL,
    distancia_km DECIMAL(5,2),
    costo_estimado DECIMAL(10,2),
    estado ENUM('pendiente', 'aceptado', 'en_curso', 'finalizado', 'cancelado') DEFAULT 'pendiente',
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_region) REFERENCES region(id_region),
    FOREIGN KEY (id_pasajero) REFERENCES pasajero(id_pasajero),
    FOREIGN KEY (id_conductor) REFERENCES conductor(id_conductor),
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(id_vehiculo)
);

-- ===========================================
-- TABLA: log
-- ===========================================
CREATE TABLE log (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    accion VARCHAR(100),
    descripcion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- ===========================================
-- INSERTAR ROLES BASE
-- ===========================================
INSERT INTO rol (nombre, descripcion) VALUES
('Administrador', 'Gestión completa del sistema'),
('Conductor', 'Usuario con permisos para conducir'),
('Pasajero', 'Usuario que solicita viajes');
