-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 10, 2025 at 08:36 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gis_fasum`
--

-- --------------------------------------------------------

--
-- Table structure for table `fasilitas_umum`
--

CREATE TABLE `fasilitas_umum` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `lat` double NOT NULL,
  `long` double NOT NULL,
  `cover_image` varchar(200) NOT NULL DEFAULT 'none.jpg',
  `deskripsi` varchar(250) NOT NULL,
  `jenis_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fasilitas_umum`
--

INSERT INTO `fasilitas_umum` (`id`, `nama`, `alamat`, `lat`, `long`, `cover_image`, `deskripsi`, `jenis_id`, `created_at`, `updated_at`) VALUES
(1, 'TAMAN AHMAD YANI', 'Jl. Imam Bonjol, J A T I, Kec. Medan Maimun, Kota Medan, Sumatera Utara 20151', 3.5764285, 98.6740685, 'TAMAN AHMAD YANI.jpg', 'Taman Ahmad Yani', 1, '2025-04-18 14:49:59', '2025-04-18 09:26:41'),
(2, 'Taman Sri Deli', 'Jl. Sisingamangaraja, Mesjid, Kec. Medan Kota, Kota Medan, Sumatera Utara 20213', 3.5764616, 98.6840393, 'none.jpg', 'Taman Sri Deli', 1, '2025-04-27 08:31:12', '2025-04-27 08:31:12'),
(3, 'Taman Gajah Mada', 'Jl. Gajah Mada No.35, Babura, Kec. Medan Baru, Kota Medan, Sumatera Utara 20154', 3.5842487, 98.6228243, 'none.jpg', 'Taman Gajah Mada', 1, '2025-04-27 08:36:56', '2025-04-27 08:36:56'),
(4, 'Taman Petula', 'Jl. Petula II No.15, Petisah Hulu, Kec. Medan Baru, Kota Medan, Sumatera Utara 20152', 3.5823626, 98.6602982, 'none.jpg', 'Taman Petula', 1, '2025-04-27 08:37:38', '2025-04-27 08:37:38'),
(5, 'Taman Beringin', 'Taman Beringin, Madras Hulu, Kec. Medan Polonia, Kota Medan, Sumatera Utara', 3.5759649, 98.6667507, 'none.jpg', 'Taman Beringin', 1, '2025-04-27 08:38:22', '2025-04-27 08:38:22'),
(6, 'Taman Lili Suheri', 'Petisah Tengah, Kec. Medan Petisah, Kota Medan, Sumatera Utara 20212', 3.5842941, 98.6737051, 'none.jpg', 'Taman Lili Suheri', 1, '2025-04-27 08:40:31', '2025-04-27 08:40:31'),
(7, 'Lapangan Merdeka', 'Kesawan, Kec. Medan Bar., Kota Medan, Sumatera Utara', 3.5903413, 98.6739622, 'none.jpg', 'Lapangan Merdeka', 2, '2025-04-27 08:41:16', '2025-04-27 08:41:16'),
(8, 'Lapangan Benteng', 'Jl. Pengadilan No.Kel, Petisah Tengah, Kec. Medan Petisah, Kota Medan, Sumatera Utara 20236', 3.5880478, 98.6709112, 'none.jpg', 'Taman kota yang teduh dengan lapangan tenis dan jalur joging, serta konser dan pertunjukan tari tradisional.', 2, '2025-04-27 08:42:07', '2025-04-27 08:42:07'),
(9, 'Lapangan Pertiwi Medan', 'Jl. Budi Pembangunan No.5, Pulo Brayan Kota, Kec. Medan Bar., Kota Medan, Sumatera Utara 20239', 3.6227613, 98.6688332, 'none.jpg', 'Lapangan Pertiwi Medan', 2, '2025-04-27 08:42:53', '2025-04-27 08:42:53'),
(10, 'Rumah Sakit Umum Pusat H. Adam Malik', 'Jl. Bunga Lau No.17, Kemenangan Tani, Kec. Medan Tuntungan, Kota Medan, Sumatera Utara 20136', 3.5184139, 98.6040246, 'none.jpg', 'Rumah Sakit Umum Pusat H. Adam Malik', 3, '2025-04-27 08:44:24', '2025-04-27 08:44:24'),
(11, 'RS Columbia Asia Medan', 'Jl. Listrik No.2A, Petisah Tengah, Kec. Medan Petisah, Kota Medan, Sumatera Utara 20112', 3.5857324, 98.674268, 'none.jpg', 'RS Columbia Asia Medan', 3, '2025-04-27 08:45:44', '2025-04-27 08:45:44'),
(12, 'Rumah Sakit Murni Teguh Memorial', 'Jl. Jawa No.2, Gg. Buntu, Kec. Medan Tim., Kota Medan, Sumatera Utara 20231', 3.5907473, 98.678962, 'none.jpg', 'Rumah Sakit Murni Teguh Memorial', 3, '2025-04-27 08:46:25', '2025-04-27 08:46:25'),
(13, 'SPBU Pertamina 14.201.1108', 'Jl. Sei Batang Hari No.61, Babura Sunggal, Kec. Medan Baru, Kota Medan, Sumatera Utara 20112', 3.5847444, 98.6445173, 'none.jpg', 'SPBU Pertamina 14.201.1108', 4, '2025-04-27 08:47:09', '2025-04-27 08:47:09'),
(14, 'SPBU Pertamina 14.202.140', 'Jl. Arief Rahman Hakim, Ps. Merah Tim., Kec. Medan Area, Kota Medan, Sumatera Utara 20227', 3.573153, 98.7005554, 'none.jpg', 'SPBU Pertamina 14.202.140', 4, '2025-04-27 08:47:44', '2025-04-27 08:47:44'),
(15, 'SPBU Singapore Station', 'Jl. Brigjend Katamso No.266, Sei Mati, Kec. Medan Maimun, Kota Medan, Sumatera Utara 20159', 3.5683092, 98.6839294, 'none.jpg', 'SPBU Singapore Station', 4, '2025-04-27 08:48:28', '2025-04-27 08:48:28');

-- --------------------------------------------------------

--
-- Table structure for table `jenis`
--

CREATE TABLE `jenis` (
  `id` int(11) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `icon` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jenis`
--

INSERT INTO `jenis` (`id`, `jenis`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Taman', 'marker-taman.png', '2025-04-26 15:08:45', '2025-04-26 15:08:45'),
(2, 'Lapangan', 'marker-lapangan.png', '2025-04-26 15:08:45', '2025-04-26 15:08:45'),
(3, 'Rumah Sakit', 'marker-rs.png', '2025-04-26 15:08:54', '2025-04-26 15:08:54'),
(4, 'SPBU', 'marker-spbu.png', '2025-04-26 15:08:54', '2025-04-26 15:08:54');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('Administrator','User') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'User',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `kabupaten_id` int(11) NOT NULL DEFAULT 0,
  `faces` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.png',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `level`, `remember_token`, `last_login`, `kabupaten_id`, `faces`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2y$10$.zyv.mN4ewS36HGJcBDXWua88yylf2MwZRK3603IZfRfoNZhJEvHy', 'Administrator', NULL, '2025-06-01 08:24:50', 0, 'default.png', '2024-10-20 01:44:16', '2025-06-01 08:24:50'),
(2, 'user', 'user@gmail.com', '$2y$10$.zyv.mN4ewS36HGJcBDXWua88yylf2MwZRK3603IZfRfoNZhJEvHy', 'User', NULL, '2025-04-18 12:39:55', 1, 'default.png', '2024-10-20 01:44:16', '2024-12-06 17:31:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fasilitas_umum`
--
ALTER TABLE `fasilitas_umum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jenis`
--
ALTER TABLE `jenis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fasilitas_umum`
--
ALTER TABLE `fasilitas_umum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `jenis`
--
ALTER TABLE `jenis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
