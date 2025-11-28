-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2025 a las 01:30:48
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `contaxi_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductor`
--

CREATE TABLE `conductor` (
  `id_conductor` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `licencia` varchar(30) NOT NULL,
  `categoria_licencia` varchar(10) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conductor`
--

INSERT INTO `conductor` (`id_conductor`, `id_persona`, `licencia`, `categoria_licencia`, `fecha_registro`) VALUES
(1, 2, 'LP-2025-ABC123', 'B', '2025-11-01 21:06:29'),
(2, 20, 'ABC12345', 'B', '2025-11-04 23:41:45'),
(3, 21, '34343', 'b', '2025-11-05 02:37:39'),
(4, 22, '689545', 'C', '2025-11-05 12:57:51'),
(5, 23, '6845162', 'C', '2025-11-05 21:03:04'),
(6, 25, '6080047', 'C', '2025-11-05 21:25:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log`
--

CREATE TABLE `log` (
  `id_log` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `accion` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasajero`
--

CREATE TABLE `pasajero` (
  `id_pasajero` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pasajero`
--

INSERT INTO `pasajero` (`id_pasajero`, `id_persona`, `fecha_registro`) VALUES
(1, 3, '2025-11-01 21:07:04'),
(2, 4, '2025-11-01 21:07:04'),
(3, 18, '2025-11-04 20:00:25'),
(4, 19, '2025-11-04 21:06:40'),
(5, 24, '2025-11-05 21:05:50'),
(6, 29, '2025-11-24 03:11:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id_persona` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `ci` varchar(20) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id_persona`, `nombres`, `apellidos`, `ci`, `telefono`, `direccion`, `fecha_registro`) VALUES
(1, 'Juan', 'Mamani', '1234567LP', '72000001', 'Av. Principal #45', '2025-11-01 21:06:05'),
(2, 'Rosa', 'Quispe', '2345678LP', '72000002', 'Calle Bolívar #12', '2025-11-01 21:06:05'),
(3, 'Pedro', 'Huanca', '3456789LP', '72000003', 'Barrio San Antonio', '2025-11-01 21:06:05'),
(4, 'María', 'Condori', '4567890LP', '72000004', 'Av. Los Andes #99', '2025-11-01 21:06:05'),
(5, 'Admin', 'Principal', '0000000', '12345678', 'Calle Admin', '2025-11-04 01:42:34'),
(16, 'Erick', 'Mendoza', '0000070', '12345678', 'Calle Admin', '2025-11-04 02:33:26'),
(17, 'efrain ', 'erick', '6899047', '7852454', 'la paz bolivia', '2025-11-04 18:44:13'),
(18, 'María', 'López', '9988776', '76543210', 'Calle 12 #123', '2025-11-04 20:00:25'),
(19, 'juan', 'nacho', '789456', '7758985', 'laz paz', '2025-11-04 21:06:40'),
(20, 'Juan', 'Pérez', '12345678', '76543210', 'Av. Siempre Viva 123', '2025-11-04 23:41:45'),
(21, 'wilson', 'gutierrez', '535855', '254859', 'la paz', '2025-11-05 02:37:39'),
(22, 'rene', 'calle', '4578595', '7845956', 'calle kantuta #456', '2025-11-05 12:57:51'),
(23, 'JUAN', 'PEREZ', '6845162', '77700589', 'EL ALTO LA PAZ', '2025-11-05 21:03:03'),
(24, 'MARIA', 'PEREZ', '65895787', '525858', 'EL ALTO', '2025-11-05 21:05:50'),
(25, 'Wilson', 'Gutierrez', '6080047', '72088844', 'achacachi prov omasuyos', '2025-11-05 21:25:53'),
(28, 'Erick', 'Mendoza', '0000070555', '123456786', 'Calle Admin', '2025-11-05 22:10:11'),
(29, 'jose', 'perez', '77777777', '7777777', 'la pazz bolivia', '2025-11-24 03:11:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `region`
--

CREATE TABLE `region` (
  `id_region` int(11) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `municipio` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `region`
--

INSERT INTO `region` (`id_region`, `departamento`, `provincia`, `municipio`, `descripcion`, `activo`, `fecha_registro`) VALUES
(1, 'La Paz', 'Omasuyos', 'Achacachi', 'Zona habilitada para operación del sistema contaxi', 1, '2025-11-01 21:04:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`, `descripcion`, `fecha_registro`) VALUES
(1, 'admin', 'Administrador', NULL),
(2, 'pasajero', 'Usuario pasajero', NULL),
(3, 'conductor', 'Usuario conductor', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_viaje`
--

CREATE TABLE `solicitud_viaje` (
  `id_solicitud` int(11) NOT NULL,
  `id_region` int(11) NOT NULL,
  `id_pasajero` int(11) NOT NULL,
  `id_conductor` int(11) DEFAULT NULL,
  `id_vehiculo` int(11) DEFAULT NULL,
  `origen` varchar(150) NOT NULL,
  `destino` varchar(150) NOT NULL,
  `distancia_km` decimal(5,2) DEFAULT NULL,
  `costo_estimado` decimal(10,2) DEFAULT NULL,
  `estado` enum('pendiente','aceptado','en_curso','finalizado','cancelado') DEFAULT 'pendiente',
  `fecha_solicitud` datetime DEFAULT NULL,
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitud_viaje`
--

INSERT INTO `solicitud_viaje` (`id_solicitud`, `id_region`, `id_pasajero`, `id_conductor`, `id_vehiculo`, `origen`, `destino`, `distancia_km`, `costo_estimado`, `estado`, `fecha_solicitud`, `fecha_registro`) VALUES
(1, 1, 1, 1, 1, 'Plaza 2 de Febrero', 'Mercado Central', '2.50', '10.00', 'finalizado', '2025-11-01 21:07:25', '2025-11-01 21:07:25'),
(2, 1, 2, 1, 2, 'Barrio San Antonio', 'Hospital Municipal', '3.80', '15.00', 'en_curso', '2025-11-01 21:07:25', '2025-11-01 21:07:25'),
(3, 1, 1, 1, 1, 'Av. Los Andes', 'Terminal de Buses', '5.10', '20.00', 'pendiente', '2025-11-01 21:07:25', '2025-11-01 21:07:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado` varchar(20) DEFAULT 'activo',
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_persona`, `id_rol`, `email`, `password`, `estado`, `fecha_registro`) VALUES
(1, 16, 1, 'erick@gmail.com', '$2b$10$oCurdGuVt0zJmdcdZ1aKC.yjKlYV9auhVmQLj7TV7ez28byRYL40m', 'activo', '2025-11-04 02:33:26'),
(2, 17, 1, 'admin@gmail.com', '$2b$10$2bQIKL80MEVW2MU/HNdzXOVjcFjZCPYXkHPnBUKXHAobKZEef0SDu', 'activo', '2025-11-04 18:44:13'),
(3, 18, 2, 'maria@demo.com', '$2b$10$b2Z2AyqbderLC0r3DCMX8uqe6AeniRI73D4Q2dLpcKhj/oX79e/ie', 'activo', '2025-11-04 20:00:25'),
(4, 19, 2, 'juan@gmail.com', '$2b$10$N3egf1KOTNndAkqK9EcLLO0n1NMsJtniZOnMOmX94/imUCFRuL/7m', 'activo', '2025-11-04 21:06:41'),
(5, 20, 3, 'juan.perez@example.com', '$2b$10$tI1Z4JEciUloQXUcP2ji6ehqU7ynBqAYkzzpAB9EAOvruFPkDqT1q', 'activo', '2025-11-04 23:41:45'),
(6, 21, 3, 'wilson@gmail.com', '$2b$10$/YpRJ9U5m1ATztdQQt24iO6E/xzsj07YiMJK.eCiFOigXuqPHYG/W', 'activo', '2025-11-05 02:37:39'),
(7, 22, 3, 'rene@gmail.com', '$2b$10$kxkztmlOF8B08EUE32oJQOtA6EMD5eUuxKCuk7kvBnO03PDOnpJke', 'activo', '2025-11-05 12:57:51'),
(8, 23, 3, 'juan25@gmail.com', '$2b$10$bhY0Bak8VZ1lfxtg3OQ6w.8Crk9O1fnwRTdJR00riROa0845ImTeK', 'activo', '2025-11-05 21:03:04'),
(9, 24, 2, 'maria@gmail.com', '$2b$10$wBpU6GmcG0bN.I.1A4Cyfec7vY61P36Hk8J51UZzhk69GGwO8yKzC', 'activo', '2025-11-05 21:05:50'),
(10, 25, 3, 'wilson11@gmail.com', '$2b$10$GLs6T/KTRldNH96emvs/DuykXN/3hnobuhBMCEveAFVWoKDkdG2rm', 'activo', '2025-11-05 21:25:53'),
(11, 28, 1, 'erick1@gmail.com', '$2b$10$EtU6c9fNFTO2.SGUpkdO2.IApOnpnhd7a2sZlgI7K1voeNJONUuM6', 'activo', '2025-11-05 22:10:11'),
(12, 29, 2, 'jose@gmail.com', '$2b$10$AZ42LMmuboiswdZ13ZseWeB6pgpkk6p4zo/XFtvdHmk7327/C.mz6', 'activo', '2025-11-24 03:11:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `id_vehiculo` int(11) NOT NULL,
  `id_conductor` int(11) NOT NULL,
  `placa` varchar(15) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `anio` int(11) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `capacidad` int(11) DEFAULT 4,
  `estado` varchar(20) DEFAULT 'activo',
  `fecha_registro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id_vehiculo`, `id_conductor`, `placa`, `marca`, `modelo`, `anio`, `color`, `capacidad`, `estado`, `fecha_registro`) VALUES
(1, 1, 'ABC123', 'Toyota', 'Vitz', 2019, 'Plata', 4, 'activo', '2025-11-01 21:06:45'),
(2, 1, 'XYZ789', 'Suzuki', 'Alto', 2021, 'Rojo', 4, 'activo', '2025-11-01 21:06:45'),
(3, 2, 'ABC-123', 'Toyota', 'Corolla', 2020, 'Blanco', 4, 'activo', '2025-11-04 23:41:45'),
(4, 2, 'XYZ-789', 'Honda', 'Civic', 2019, 'Negro', 4, 'activo', '2025-11-04 23:41:45'),
(5, 3, 'wewe23', 'asd', 'taxi', 2024, 'blanco', 4, 'activo', '2025-11-05 02:37:39'),
(6, 4, '1254HGY', 'toyota', 'Moto', 2021, 'blanco', 1, 'activo', '2025-11-05 12:57:51'),
(7, 5, '6258KTB', 'TOYOTA', 'Taxi', 2020, 'BLANCO', 4, 'activo', '2025-11-05 21:03:04'),
(8, 6, '3617ipk', 'toyota', 'Taxi', 2012, 'plomo', 4, 'activo', '2025-11-05 21:25:53');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `conductor`
--
ALTER TABLE `conductor`
  ADD PRIMARY KEY (`id_conductor`),
  ADD KEY `id_persona` (`id_persona`);

--
-- Indices de la tabla `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pasajero`
--
ALTER TABLE `pasajero`
  ADD PRIMARY KEY (`id_pasajero`),
  ADD KEY `id_persona` (`id_persona`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id_persona`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD UNIQUE KEY `ci_2` (`ci`),
  ADD UNIQUE KEY `ci_3` (`ci`),
  ADD UNIQUE KEY `ci_4` (`ci`),
  ADD UNIQUE KEY `ci_5` (`ci`),
  ADD UNIQUE KEY `ci_6` (`ci`),
  ADD UNIQUE KEY `ci_7` (`ci`),
  ADD UNIQUE KEY `ci_8` (`ci`),
  ADD UNIQUE KEY `ci_9` (`ci`),
  ADD UNIQUE KEY `ci_10` (`ci`),
  ADD UNIQUE KEY `ci_11` (`ci`),
  ADD UNIQUE KEY `ci_12` (`ci`),
  ADD UNIQUE KEY `ci_13` (`ci`),
  ADD UNIQUE KEY `ci_14` (`ci`),
  ADD UNIQUE KEY `ci_15` (`ci`),
  ADD UNIQUE KEY `ci_16` (`ci`),
  ADD UNIQUE KEY `ci_17` (`ci`),
  ADD UNIQUE KEY `ci_18` (`ci`),
  ADD UNIQUE KEY `ci_19` (`ci`),
  ADD UNIQUE KEY `ci_20` (`ci`),
  ADD UNIQUE KEY `ci_21` (`ci`),
  ADD UNIQUE KEY `ci_22` (`ci`),
  ADD UNIQUE KEY `ci_23` (`ci`),
  ADD UNIQUE KEY `ci_24` (`ci`),
  ADD UNIQUE KEY `ci_25` (`ci`),
  ADD UNIQUE KEY `ci_26` (`ci`),
  ADD UNIQUE KEY `ci_27` (`ci`),
  ADD UNIQUE KEY `ci_28` (`ci`),
  ADD UNIQUE KEY `ci_29` (`ci`),
  ADD UNIQUE KEY `ci_30` (`ci`),
  ADD UNIQUE KEY `ci_31` (`ci`),
  ADD UNIQUE KEY `ci_32` (`ci`),
  ADD UNIQUE KEY `ci_33` (`ci`),
  ADD UNIQUE KEY `ci_34` (`ci`),
  ADD UNIQUE KEY `ci_35` (`ci`),
  ADD UNIQUE KEY `ci_36` (`ci`),
  ADD UNIQUE KEY `ci_37` (`ci`),
  ADD UNIQUE KEY `ci_38` (`ci`),
  ADD UNIQUE KEY `ci_39` (`ci`),
  ADD UNIQUE KEY `ci_40` (`ci`),
  ADD UNIQUE KEY `ci_41` (`ci`),
  ADD UNIQUE KEY `ci_42` (`ci`),
  ADD UNIQUE KEY `ci_43` (`ci`),
  ADD UNIQUE KEY `ci_44` (`ci`),
  ADD UNIQUE KEY `ci_45` (`ci`),
  ADD UNIQUE KEY `ci_46` (`ci`),
  ADD UNIQUE KEY `ci_47` (`ci`),
  ADD UNIQUE KEY `ci_48` (`ci`),
  ADD UNIQUE KEY `ci_49` (`ci`),
  ADD UNIQUE KEY `ci_50` (`ci`),
  ADD UNIQUE KEY `ci_51` (`ci`),
  ADD UNIQUE KEY `ci_52` (`ci`),
  ADD UNIQUE KEY `ci_53` (`ci`),
  ADD UNIQUE KEY `ci_54` (`ci`),
  ADD UNIQUE KEY `ci_55` (`ci`),
  ADD UNIQUE KEY `ci_56` (`ci`),
  ADD UNIQUE KEY `ci_57` (`ci`),
  ADD UNIQUE KEY `ci_58` (`ci`),
  ADD UNIQUE KEY `ci_59` (`ci`),
  ADD UNIQUE KEY `ci_60` (`ci`),
  ADD UNIQUE KEY `ci_61` (`ci`),
  ADD UNIQUE KEY `ci_62` (`ci`),
  ADD UNIQUE KEY `ci_63` (`ci`);

--
-- Indices de la tabla `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id_region`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `solicitud_viaje`
--
ALTER TABLE `solicitud_viaje`
  ADD PRIMARY KEY (`id_solicitud`),
  ADD KEY `id_vehiculo` (`id_vehiculo`),
  ADD KEY `id_region` (`id_region`),
  ADD KEY `id_pasajero` (`id_pasajero`),
  ADD KEY `id_conductor` (`id_conductor`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`),
  ADD UNIQUE KEY `email_60` (`email`),
  ADD UNIQUE KEY `email_61` (`email`),
  ADD KEY `id_persona` (`id_persona`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id_vehiculo`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD UNIQUE KEY `placa_2` (`placa`),
  ADD UNIQUE KEY `placa_3` (`placa`),
  ADD UNIQUE KEY `placa_4` (`placa`),
  ADD UNIQUE KEY `placa_5` (`placa`),
  ADD UNIQUE KEY `placa_6` (`placa`),
  ADD UNIQUE KEY `placa_7` (`placa`),
  ADD UNIQUE KEY `placa_8` (`placa`),
  ADD UNIQUE KEY `placa_9` (`placa`),
  ADD UNIQUE KEY `placa_10` (`placa`),
  ADD UNIQUE KEY `placa_11` (`placa`),
  ADD UNIQUE KEY `placa_12` (`placa`),
  ADD UNIQUE KEY `placa_13` (`placa`),
  ADD UNIQUE KEY `placa_14` (`placa`),
  ADD UNIQUE KEY `placa_15` (`placa`),
  ADD UNIQUE KEY `placa_16` (`placa`),
  ADD UNIQUE KEY `placa_17` (`placa`),
  ADD UNIQUE KEY `placa_18` (`placa`),
  ADD UNIQUE KEY `placa_19` (`placa`),
  ADD UNIQUE KEY `placa_20` (`placa`),
  ADD UNIQUE KEY `placa_21` (`placa`),
  ADD UNIQUE KEY `placa_22` (`placa`),
  ADD UNIQUE KEY `placa_23` (`placa`),
  ADD UNIQUE KEY `placa_24` (`placa`),
  ADD UNIQUE KEY `placa_25` (`placa`),
  ADD UNIQUE KEY `placa_26` (`placa`),
  ADD UNIQUE KEY `placa_27` (`placa`),
  ADD UNIQUE KEY `placa_28` (`placa`),
  ADD UNIQUE KEY `placa_29` (`placa`),
  ADD UNIQUE KEY `placa_30` (`placa`),
  ADD UNIQUE KEY `placa_31` (`placa`),
  ADD UNIQUE KEY `placa_32` (`placa`),
  ADD UNIQUE KEY `placa_33` (`placa`),
  ADD UNIQUE KEY `placa_34` (`placa`),
  ADD UNIQUE KEY `placa_35` (`placa`),
  ADD UNIQUE KEY `placa_36` (`placa`),
  ADD UNIQUE KEY `placa_37` (`placa`),
  ADD UNIQUE KEY `placa_38` (`placa`),
  ADD UNIQUE KEY `placa_39` (`placa`),
  ADD UNIQUE KEY `placa_40` (`placa`),
  ADD UNIQUE KEY `placa_41` (`placa`),
  ADD UNIQUE KEY `placa_42` (`placa`),
  ADD UNIQUE KEY `placa_43` (`placa`),
  ADD UNIQUE KEY `placa_44` (`placa`),
  ADD UNIQUE KEY `placa_45` (`placa`),
  ADD UNIQUE KEY `placa_46` (`placa`),
  ADD UNIQUE KEY `placa_47` (`placa`),
  ADD UNIQUE KEY `placa_48` (`placa`),
  ADD UNIQUE KEY `placa_49` (`placa`),
  ADD UNIQUE KEY `placa_50` (`placa`),
  ADD UNIQUE KEY `placa_51` (`placa`),
  ADD UNIQUE KEY `placa_52` (`placa`),
  ADD UNIQUE KEY `placa_53` (`placa`),
  ADD UNIQUE KEY `placa_54` (`placa`),
  ADD UNIQUE KEY `placa_55` (`placa`),
  ADD UNIQUE KEY `placa_56` (`placa`),
  ADD UNIQUE KEY `placa_57` (`placa`),
  ADD UNIQUE KEY `placa_58` (`placa`),
  ADD UNIQUE KEY `placa_59` (`placa`),
  ADD UNIQUE KEY `placa_60` (`placa`),
  ADD UNIQUE KEY `placa_61` (`placa`),
  ADD UNIQUE KEY `placa_62` (`placa`),
  ADD KEY `id_conductor` (`id_conductor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `conductor`
--
ALTER TABLE `conductor`
  MODIFY `id_conductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `log`
--
ALTER TABLE `log`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pasajero`
--
ALTER TABLE `pasajero`
  MODIFY `id_pasajero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `region`
--
ALTER TABLE `region`
  MODIFY `id_region` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `solicitud_viaje`
--
ALTER TABLE `solicitud_viaje`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id_vehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conductor`
--
ALTER TABLE `conductor`
  ADD CONSTRAINT `conductor_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pasajero`
--
ALTER TABLE `pasajero`
  ADD CONSTRAINT `pasajero_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitud_viaje`
--
ALTER TABLE `solicitud_viaje`
  ADD CONSTRAINT `solicitud_viaje_ibfk_35` FOREIGN KEY (`id_region`) REFERENCES `region` (`id_region`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_viaje_ibfk_36` FOREIGN KEY (`id_pasajero`) REFERENCES `pasajero` (`id_pasajero`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_viaje_ibfk_37` FOREIGN KEY (`id_conductor`) REFERENCES `conductor` (`id_conductor`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_viaje_ibfk_4` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_43` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_44` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `vehiculo_ibfk_1` FOREIGN KEY (`id_conductor`) REFERENCES `conductor` (`id_conductor`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
