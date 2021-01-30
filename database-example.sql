-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2021 at 04:08 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_zwallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `amountTransfer` bigint(20) NOT NULL,
  `notes` varchar(191) NOT NULL,
  `userSenderId` varchar(64) NOT NULL,
  `userReceiverId` varchar(64) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `amountTransfer`, `notes`, `userSenderId`, `userReceiverId`, `createdAt`, `updatedAt`) VALUES
(246, 200, '', '6fc7d0ad-67e7-4ff6-b2bb-df2e388a170b', '176cd969-8ea1-4f3c-879f-5c72c9b8d34e', '2020-12-15 06:13:56', '2020-12-15 06:13:56'),
(247, 200, '', '6fc7d0ad-67e7-4ff6-b2bb-df2e388a170b', '176cd969-8ea1-4f3c-879f-5c72c9b8d34e', '2020-12-15 06:13:57', '2020-12-15 06:13:57'),
(250, 100, '', '6fc7d0ad-67e7-4ff6-b2bb-df2e388a170b', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '2020-12-15 06:14:59', '2020-12-15 06:14:59'),
(252, 500, '', '6fc7d0ad-67e7-4ff6-b2bb-df2e388a170b', '81f6d45b-05c8-47a3-8d04-9956bf0c13ba', '2020-12-15 06:51:53', '2020-12-15 06:51:53'),
(253, 9500, '', '6fc7d0ad-67e7-4ff6-b2bb-df2e388a170b', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '2020-12-15 15:41:38', '2020-12-15 15:41:38'),
(254, 2000, '', '6fc7d0ad-67e7-4ff6-b2bb-df2e388a170b', '81f6d45b-05c8-47a3-8d04-9956bf0c13ba', '2020-12-15 16:03:22', '2020-12-15 16:03:22'),
(255, 200, '', '81f6d45b-05c8-47a3-8d04-9956bf0c13ba', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '2021-01-15 13:37:33', '2021-01-15 13:37:33'),
(256, 3670, '', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '81f6d45b-05c8-47a3-8d04-9956bf0c13ba', '2021-01-15 13:55:17', '2021-01-15 13:55:17'),
(257, 670, '', '81f6d45b-05c8-47a3-8d04-9956bf0c13ba', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '2021-01-15 13:56:08', '2021-01-15 13:56:08'),
(258, 670, '', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '176cd969-8ea1-4f3c-879f-5c72c9b8d34e', '2021-01-15 13:56:45', '2021-01-15 13:56:45'),
(259, 500, '', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '6fc7d0ad-67e7-4ff6-b2bb-df2e388a170b', '2021-01-15 13:56:55', '2021-01-15 13:56:55'),
(260, 500, '', 'bd71e4a2-2137-4315-b871-ca31fab515d6', 'af1289b1-62a4-41e8-b073-21879e77dc2e', '2021-01-15 13:57:08', '2021-01-15 13:57:08'),
(261, 500, '', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '176cd969-8ea1-4f3c-879f-5c72c9b8d34e', '2021-01-15 13:57:28', '2021-01-15 13:57:28'),
(262, 500, '', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '81f6d45b-05c8-47a3-8d04-9956bf0c13ba', '2021-01-15 13:57:39', '2021-01-15 13:57:39'),
(263, 8000, '', 'bd71e4a2-2137-4315-b871-ca31fab515d6', '81f6d45b-05c8-47a3-8d04-9956bf0c13ba', '2021-01-15 14:42:27', '2021-01-15 14:42:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(128) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `phone2` varchar(15) DEFAULT NULL,
  `photo` varchar(191) DEFAULT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `pin` varchar(25) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `roleId` varchar(11) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `phone2`, `photo`, `username`, `email`, `password`, `pin`, `balance`, `roleId`, `confirmed`, `createdAt`, `updatedAt`) VALUES
('1cd292bc-471d-407d-a560-dd3cd7f8e7b2', NULL, '08xxxxxxxx', 'null', 'https://zwallet-hanif.fwdev.online/v1/upload/photo-1610883110514-FB_IMG_16106820062452257.jpg', 'Hanif Kumara', 'hanifkumara00@gmail.com', '$2a$10$MFBf30.gOP2/KCKUVMhVAeyxYnXyu5ILp81A6zXcVYJPN0KsORJde', NULL, 0, '1', 1, '2021-01-15 13:33:55', '2021-01-15 13:33:55'),
('65c61efc-05c4-4feb-9bbc-a43a61c0a5aa', NULL, '08xxxxxxxx', 'null', 'https://placekitten.com/320/320', 'Kepokepo', 'Sukasukangoding@gmail.com', '$2a$10$lhGzK5QuWpaJhNqd07mEiOs5P44KcgGkgRmQpdsz3K/Cbtloh6Z9u', '111111', 1002, '2', 1, '2021-01-18 15:23:00', '2021-01-18 15:23:00'),
('6d8e9908-9188-41c6-b3b0-92317b8a94e8', NULL, '08xxxxxxxx', 'null', 'https://placekitten.com/320/320', 'hnflasting@gmail.com', 'hnflasting@gmail.com', '$2a$10$i5SlA6U5SwyLiSy5nsbGv.cV6S2XurZzhxha9T6IQ5gH5pYtX6LT6', NULL, 0, '2', 1, '2021-01-21 06:35:27', '2021-01-21 06:35:27'),
('81f6d45b-05c8-47a3-8d04-9956bf0c13ba', 'Kurniawan Khoiruddin', '0812345677', 'null', 'https://placekitten.com/320/320', 'kurniawan', 'hanifkumara@gmail.com', '$2a$10$y7wPtYpejkWl.ohng8.1a.PTYeIyK4auLlWju7xWKY75VMOKynOEG', '123456', 23500, '2', 1, '2020-12-15 03:24:58', '2020-12-15 03:24:58'),
('92f43478-504d-42db-a8d1-39dd9c954c86', NULL, '08xxxxxxxx', 'null', 'https://placekitten.com/320/320', 'ticketingankasa', 'tikceting.ankasa@gmail.com', '$2a$10$jrkppvezmA1n05UVOZQmhuWjzLAw02j1YfMvFNg.CZMYpzs4okqC2', NULL, 0, '2', NULL, '2021-01-18 09:55:40', '2021-01-18 09:55:40'),
('af1289b1-62a4-41e8-b073-21879e77dc2e', NULL, '08xxxxxxxx', 'null', 'https://placekitten.com/320/320', 'hanif123', 'hanifkumara@gmail.com', '$2a$10$i9qKbKa7J0r1.d4FgkWnZuXYYV5BhAHw6Fl.1K1L4PU183GiYzxjK', NULL, 500, '2', NULL, '2020-12-15 06:50:33', '2020-12-15 06:50:33'),
('b84ba676-d065-47f5-af1b-851d096910ab', NULL, '08xxxxxxxx', 'null', 'https://placekitten.com/320/320', 'sigitwhyu', 'sigitwid.id@gmail.com', '$2a$10$ilV3t8HuttIwW0vA6ZR2CeKxJ.DeP/MzRQqHAZHExs8xVEXlJOgxy', NULL, 0, '2', 1, '2021-01-21 13:42:42', '2021-01-21 13:42:42'),
('c06f5e35-2778-486f-982f-b4c15311425b', NULL, '08xxxxxxxx', 'null', 'https://placekitten.com/320/320', 'Ankasa Ticketing', 'ankasa.ticketing@gmail.com', '$2a$10$uHXd/OlxDTdw/o.mYzp9z.uwVZK06OeMK/gj2rv/gck19hdVLCABq', NULL, 0, '2', NULL, '2021-01-18 09:54:47', '2021-01-18 09:54:47'),
('eeab644a-e611-437f-88e1-6fad01c41841', NULL, '08xxxxxxxx', 'null', 'https://placekitten.com/320/320', 'fathoniiii', 'hanifkumara@gmail.com', '$2a$10$cT5XZL0KbWNbkVjVu/MI1uayRHbpwKNs4TWYTE/oUWiTwLmGE9RTK', NULL, 0, '2', 1, '2020-12-14 21:25:38', '2020-12-14 21:25:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userSenderId` (`userSenderId`),
  ADD KEY `userReceiverId` (`userReceiverId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
