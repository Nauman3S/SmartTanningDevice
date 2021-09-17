-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: srv-captain--gh-mysqldb-db:3306
-- Generation Time: Apr 26, 2021 at 06:21 AM
-- Server version: 5.7.33
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vendingmachine`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `ID` int(11) NOT NULL,
  `Email` text NOT NULL,
  `FName` text NOT NULL,
  `LName` text NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`ID`, `Email`, `FName`, `LName`, `Password`) VALUES
(1, 'admin@admin.com', 'admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `VLedger`
--

CREATE TABLE `VLedger` (
  `ID` int(11) NOT NULL,
  `Fingerprint` text NOT NULL,
  `LastVend` text NOT NULL,
  `TotalVends` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `VLedger`
--

INSERT INTO `VLedger` (`ID`, `Fingerprint`, `LastVend`, `TotalVends`) VALUES
(1, '76bf4d817ccd4dfd7e8f303d2b9a9331', '2021-04-25T21:14:56.024Z', '2'),
(2, '0d300ad9789a238752c60cb4223fe9a6', '2021-04-25T21:30:00.339Z', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `VLedger`
--
ALTER TABLE `VLedger`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `VLedger`
--
ALTER TABLE `VLedger`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
