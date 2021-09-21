-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: srv-captain--gh-mysqldb-db:3306
-- Generation Time: Sep 21, 2021 at 05:01 AM
-- Server version: 5.7.35
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tanningdevice`
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
  `Passowrd` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`ID`, `Email`, `FName`, `LName`, `Passowrd`) VALUES
(1, 'admin@admin.com', 'Admin', 'Admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `VLedger`
--

CREATE TABLE `VLedger` (
  `ID` int(11) NOT NULL,
  `DeviceMAC` text NOT NULL,
  `StartSession` text NOT NULL,
  `EndSession` text NOT NULL,
  `EndSessionType` text NOT NULL,
  `Temperature` text NOT NULL,
  `SensorFilters` text NOT NULL,
  `LampMaintenance` text NOT NULL,
  `AnnualMaintenance` text NOT NULL,
  `PowerFactorCorrection` text NOT NULL,
  `AnemometerSensor` text NOT NULL,
  `InputVoltage` text NOT NULL,
  `PresencePhases` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
