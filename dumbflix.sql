-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2020 at 01:25 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dumbflix`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'TV Shows', '2020-06-12 10:26:43', '2020-06-12 10:26:43'),
(2, 'Movies', '2020-06-12 10:28:10', '2020-06-12 10:30:35');

-- --------------------------------------------------------

--
-- Table structure for table `episodes`
--

CREATE TABLE `episodes` (
  `id` int(11) NOT NULL,
  `filmId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `thumbnailFilm` varchar(255) DEFAULT NULL,
  `linkFilm` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `episodes`
--

INSERT INTO `episodes` (`id`, `filmId`, `title`, `thumbnailFilm`, `linkFilm`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'episode 1', 'EpisodeGOT1.jpg', 'https://lk21/got/episode1.mp4', '2020-06-13 18:21:37', '2020-06-13 18:21:37'),
(4, 2, 'episode 1', 'moneyheist1.jpg', 'https://lk21/got/episode1.mp4', '2020-06-15 04:15:24', '2020-06-15 04:22:56'),
(5, 15, 'episode 1', 'withcher1.jpg', 'https://lk21/got/episode1.mp4', '2020-06-15 04:19:13', '2020-06-15 04:19:13'),
(7, 1, 'episode 2', 'got2.jpg', 'https://lk21/got/episode2.mp4', '2020-06-15 07:46:26', '2020-06-15 07:46:26');

-- --------------------------------------------------------

--
-- Table structure for table `films`
--

CREATE TABLE `films` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `thumbnailFilm` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `films`
--

INSERT INTO `films` (`id`, `categoryId`, `title`, `thumbnailFilm`, `year`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Game Of Throne', 'GOT.jpg', 2011, 'Film ini menceritakan peperangan antar klan untuk mendapatkan tahta kerajaan', '2020-06-12 10:45:35', '2020-06-12 10:45:35'),
(2, 1, 'Money Heist', 'mheist.jpg', 2017, 'Komplotan pencuri uang besar', '2020-06-12 10:49:01', '2020-06-12 10:53:22'),
(15, 1, 'The Witcher', 'TW.jpg', 2019, 'Film ini menceritakan bagaimana seorang penyihir dapat di terima disuatu negara', '2020-06-12 12:18:28', '2020-06-12 12:18:28');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200610094341-create-user.js'),
('20200611050658-create-film.js'),
('20200611050826-create-category.js'),
('20200611051652-create-transaction.js'),
('20200611052054-create-episode.js');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `startDate` date DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `attache` varchar(255) DEFAULT NULL,
  `status` enum('Approved','Pending','Rejected','') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `userId`, `startDate`, `dueDate`, `attache`, `status`, `createdAt`, `updatedAt`) VALUES
(4, 1, '2020-06-26', '2020-07-30', NULL, 'Pending', '2020-06-13 03:24:09', '2020-06-13 03:24:09'),
(7, 6, '2020-06-14', '2020-06-21', '1592125853429-bca.jpg', 'Approved', '2020-06-14 09:10:53', '2020-06-14 09:10:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `subscribe` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `gender`, `phone`, `address`, `subscribe`, `createdAt`, `updatedAt`) VALUES
(1, 'Muhammad Rizki Akbar', 'rizkyakbar1511@gmail.com', '$2b$10$0r506Npb5wamH.wfSaaxjOL1jANpYDmxky/KRZ2.2kVhEKsUhbae2', 'Male', '083802595929', 'Jl.Sako Baru, Perumahan Alam Sako Blok A11', 1, '2020-06-12 18:01:31', '2020-06-12 18:01:31'),
(6, 'Iis Is', 'iis@gmail.com', '$2b$10$IWmxWbeN9EXzLpwN1wipEeer8Qx4kqqRrspUTfXtqun6I9jIRvu8W', 'male', '083896831233', 'Jln. Marvel Universe, RT.21 RW.69', 0, '2020-06-13 04:50:47', '2020-06-13 04:50:47'),
(10, 'Demo', 'demo@dumbflix.com', '$2b$10$./mmEwT8hwKZqxDMjjE4SuUJg3uo7dFHfxWh5YAdQpSIGUPjxdWBu', 'male', '081234567890', 'Jln. Marvel Universe, RT.21 RW.69', NULL, '2020-06-15 07:34:34', '2020-06-15 07:34:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `filmId` (`filmId`);

--
-- Indexes for table `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `films`
--
ALTER TABLE `films`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `films` (`id`);

--
-- Constraints for table `films`
--
ALTER TABLE `films`
  ADD CONSTRAINT `films_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
