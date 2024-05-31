import React from "react";
import { FaWind } from "react-icons/fa";
import { iconUrlFromCode } from "../Services/WeatherService";
import { formatToLocalTime } from "../Services/WeatherService";
import styles from "./HourlyForecast.module.css";

const HourlyForecast = ({ items, tempUnit, onClick }) => {
  return (
    <div
      className={`${styles.hourlyForecast} ${styles.hoverEffect}`}
      onClick={onClick}
    >
      <p className={styles.time}>
        {formatToLocalTime(items.title, items.timezone, "hh:mm a")}
      </p>
      <img src={iconUrlFromCode(items.icon)} alt="" />
      <h3 className={styles.temperature}>
        {Math.floor(Number(items.temp))} {tempUnit}
      </h3>
    </div>
  );
};

export default HourlyForecast;
