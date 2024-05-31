import { useState } from "react";
import { FaCloud, FaTemperatureLow, FaWind } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { iconUrlFromCode } from "../Services/WeatherService";
import styles from "./DailyComponent.module.css";

const DailyComponent = ({ item, tempUnit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.details} onClick={toggleDetails}>
      {!isOpen && (
        <summary className={styles.summary}>
          <div className={styles.summaryContent}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.detailContainer}>
              <span>
                <FaTemperatureLow />
              </span>
              <span>
                {item.temp} {tempUnit}
              </span>
            </div>

            <div className={styles.detailContainer}>
              <img
                src={iconUrlFromCode(item.icon)}
                alt="weather icon"
                className={styles.weatherIcon}
              />{" "}
              <span>{item.detail}</span>
            </div>
          </div>
        </summary>
      )}

      {isOpen && (
        <div className={styles.detailsContent}>
          <div className={styles.temperatureDetail}>
            <div className={styles.tempContent}>
              <span className={styles.temperatureTitle}>{item.title}</span>

              <span className={styles.temperature}>
                {Math.round(item.temp)} {tempUnit}
              </span>
            </div>

            <div className={styles.detail}>
              <img
                src={iconUrlFromCode(item.icon)}
                alt="weather icon"
                className={styles.weatherIcon}
              />

              <span> {item.detail}</span>
            </div>
            <div className={styles.feelsLike}>
              <span className={styles.feelsLikeText}>Feels Like</span>
              <span className={styles.feelsLikeValue}>
                {Math.round(item.feels_like)} {tempUnit}
              </span>
            </div>
          </div>
          <div className={styles.otherDetails}>
            <div className={styles.tempContent}>
              <div className={styles.weatherDetails}>
                Mor:
                <span className={styles.temUnit}>
                  {Math.round(item.morn)} {tempUnit}
                </span>
              </div>
              <div className={styles.weatherDetails}>
                Eve:
                <span className={styles.temUnit}>
                  {Math.round(item.eve)} {tempUnit}
                </span>
              </div>
              <div className={styles.weatherDetails}>
                Ngt:{" "}
                <span className={styles.temUnit}>
                  {Math.round(item.night)} {tempUnit}
                </span>
              </div>
            </div>
            <div className={styles.tempContent}>
              <div className={styles.weatherDetails}>
                💧Hum: <span className={styles.temUnit}>{item.humidity}%</span>
              </div>
              <div className={styles.weatherDetails}>
                <FaWind /> Wind:
                <span className={styles.temUnit}>{item.wind_speed}%</span>
              </div>
              <div className={styles.weatherDetails}>
                <FaCloud /> Cloud:{" "}
                <span className={styles.temUnit}> {item.clouds}%</span>
              </div>
            </div>
            <div className={styles.tempContent}>
              <div className={styles.weatherDetails}>
                <FiSunrise /> Rise:{" "}
                <span className={styles.temUnit}> {item.sunrise}</span>
              </div>
              <div className={styles.weatherDetails}>
                <FiSunset /> Set:{" "}
                <span className={styles.temUnit}>{item.sunset}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyComponent;
