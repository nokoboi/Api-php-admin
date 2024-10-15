-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-10-2024 a las 14:41:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cinebd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `director`
--

CREATE TABLE `director` (
  `id` int(10) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `f_nacimiento` date DEFAULT NULL,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `biografia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `director`
--

INSERT INTO `director` (`id`, `nombre`, `apellido`, `f_nacimiento`, `creado`, `biografia`) VALUES
(1, 'Steven', 'Spielberg', '2024-10-09', '2024-09-17 11:13:26', 'Ninguna peli'),
(2, 'Steven', 'Spielberg', '1946-12-18', '2024-09-17 11:19:43', 'Director, productor y guionista estadounidense'),
(3, 'Martin', 'Scorsese', '1942-11-17', '2024-09-17 11:19:43', 'Director y productor estadounidense'),
(4, 'Quentin', 'Tarantino', '1963-03-27', '2024-09-17 11:19:43', 'Director, productor, guionista y actor estadounidense'),
(5, 'Christopher', 'Nolan', '1970-07-30', '2024-09-17 11:19:43', 'Director y guionista británico-estadounidense'),
(6, 'Greta', 'Gerwig', '1983-08-04', '2024-09-17 11:19:43', 'Directora, guionista y actriz estadounidense'),
(7, 'Hayao', 'Miyazaki', '1941-01-05', '2024-09-17 11:19:43', 'Director de anime, animador, ilustrador y mangaka japonés'),
(8, 'Kathryn', 'Bigelow', '1951-11-27', '2024-09-17 11:19:43', 'Directora y productora estadounidense'),
(9, 'Guillermo', 'del Toro', '1964-10-09', '2024-09-17 11:19:43', 'Director, guionista y productor mexicano'),
(10, 'Ava', 'DuVernay', '1972-08-24', '2024-09-17 11:19:43', 'Directora, guionista y productora estadounidense'),
(11, 'Bong', 'Joon-ho', '1969-09-14', '2024-09-17 11:19:43', 'Director y guionista surcoreano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pelicula`
--

CREATE TABLE `pelicula` (
  `id` int(10) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `precio` decimal(6,2) NOT NULL,
  `id_director` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pelicula`
--

INSERT INTO `pelicula` (`id`, `titulo`, `precio`, `id_director`) VALUES
(1, 'E.T., el extraterrestre', 29.99, 1),
(2, 'Jhon Wick 3', 2.99, 3),
(3, 'La lista de Schindler', 34.99, 1),
(4, 'Tiburón', 19.99, 1),
(5, 'Indiana Jones: En busca del ar', 24.99, 1),
(6, 'Taxi Driver', 22.99, 2),
(7, 'Goodfellas', 26.99, 2),
(8, 'Casino', 23.99, 2),
(9, 'El lobo de Wall Street', 28.99, 2),
(10, 'The Irishman', 32.99, 2),
(11, 'Pulp Fiction', 25.99, 3),
(12, 'Kill Bill: Vol. 1', 21.99, 3),
(13, 'Inglourious Basterds', 27.99, 3),
(14, 'Django Unchained', 26.99, 3),
(15, 'Érase una vez en Hollywood', 29.99, 3),
(16, 'Inception', 28.99, 4),
(17, 'The Dark Knight', 27.99, 4),
(18, 'Interstellar', 31.99, 4),
(19, 'Dunkirk', 26.99, 4),
(20, 'Tenet', 34.99, 4),
(21, 'Lady Bird', 23.99, 5),
(22, 'Little Women', 25.99, 5),
(23, 'Barbie', 34.99, 5),
(24, 'Mi vecino Totoro', 22.99, 6),
(25, 'El viaje de Chihiro', 24.99, 6),
(26, 'El castillo ambulante', 23.99, 6),
(27, 'La princesa Mononoke', 25.99, 6),
(28, 'El viento se levanta', 26.99, 6),
(29, 'En tierra hostil', 22.99, 7),
(30, 'La noche más oscura', 24.99, 7),
(31, 'Detroit', 23.99, 7),
(32, 'El laberinto del fauno', 25.99, 8),
(33, 'La forma del agua', 27.99, 8),
(34, 'El espinazo del diablo', 22.99, 8),
(35, 'Pacific Rim', 26.99, 8),
(36, 'Selma', 23.99, 9),
(37, 'Un pliegue en el tiempo', 25.99, 9),
(38, '13th', 21.99, 9),
(39, 'Parásitos', 29.99, 10),
(40, 'Memorias de un asesino', 22.99, 10),
(41, 'Okja', 24.99, 10),
(42, 'torrente', 30.00, 1),
(43, 'torrente', 30.00, 1),
(44, 'Torrente 4', 2.00, 2),
(45, 'Torrente 5', 35.00, 2),
(51, 'Torrente definitive edition', 10.00, 2),
(53, 'Jhon Wick', 24.99, 4),
(54, 'Jhon Wick 2', 24.99, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `email`, `created_at`) VALUES
(1, 'oldPEpe', 'oldpepe@gmail.com', '2024-10-07 07:38:36'),
(2, 'adsasd', 'holag@gmail.com', '2024-10-07 07:38:36'),
(3, 'Eustaqui', 'eus@gmail.com', '2024-10-07 07:39:16'),
(4, 'Pepaso', 'pepaso@gmail.com', '2024-10-07 07:39:16'),
(5, 'Arturo', 'art34@gmail.com', '2024-10-08 10:19:19');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_director` (`id_director`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `director`
--
ALTER TABLE `director`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `pelicula`
--
ALTER TABLE `pelicula`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pelicula`
--
ALTER TABLE `pelicula`
  ADD CONSTRAINT `pelicula_ibfk_1` FOREIGN KEY (`id_director`) REFERENCES `director` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
