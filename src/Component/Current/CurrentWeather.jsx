import { FaCloud, FaTemperatureLow, FaWater, FaWind } from "react-icons/fa";
import HourlyForecast from "./HourlyForecast";
import { formatToLocalTime, iconUrlFromCode } from "../Services/WeatherService";
import { useContext } from "react";
import { WeatherContext } from "../../Context/WeatherContext";
import styles from "./CurrentWeather.module.css";

const CurrentWeather = ({ hourly }) => {
  const allData = useContext(WeatherContext);
  const weathers = allData.weather;

  const onClick = (item) => {
    allData.setWeather({
      ...weathers,
      ...{
        temp: item.temp,
        icon: item.icon,
        feels_like: item.feels_like,
        humidity: item.humidity,
        all: item.clouds,
        speed: item.wind_speed,
        dt: item.title,
        timezone: item.timezone,
      },
    });
  };

  return (
    <div className={styles.currentWeather}>
      <div className={styles.weatherCard}>
        <div className={styles.weatherInfo}>
          <h2 className={styles.weatherTitle}>
            {formatToLocalTime(weathers.dt, weathers.timezone, "' ' cccc ")}'s
            WEATHER
          </h2>
          <div className={styles.weatherDetails}>
            <div className={styles.weatherLocation}>
              <span className={styles.locationName}>
                {weathers.name}, {weathers.country}
              </span>
              <p className={styles.locationTime}>
                {formatToLocalTime(weathers.dt, weathers.timezone)}
              </p>
            </div>
            <div className={styles.weatherTemperature}>
              <span className={styles.temperature}>
                {weathers.temp}
                {allData.tempUnit}
              </span>
              <p className={styles.weatherDetail}>{weathers.detail}</p>
            </div>
            <span>
              <img
                src={iconUrlFromCode(weathers.icon)}
                alt="icons"
                className={styles.weatherIcon}
              />
            </span>
          </div>
        </div>
        <div className={styles.airCondition}>
          <h2 className={styles.airConditionTitle}>AIR CONDITION</h2>

          <div className={styles.airConditionDetails}>
            <div className={styles.airConditionItem}>
              <div className={styles.iconContainer}>
                <FaTemperatureLow className={styles.icon} />

                <h3 className={styles.iconLabel}>Feels</h3>
              </div>
              <span className={styles.iconValue}>
                {weathers.feels_like} {allData.tempUnit}
              </span>
            </div>
            <div className={styles.airConditionItem}>
              <div className={styles.iconContainer}>
                <FaWind className={styles.icon} />

                <h3 className={styles.iconLabel}>Wind</h3>
              </div>
              <span className={styles.iconValue}>{weathers.speed}m/s</span>
            </div>

            <div className={styles.airConditionItem}>
              <div className={styles.iconContainer}>
                <FaCloud className={styles.icon} />
                <h3 className={styles.iconLabel}>Cloud</h3>
              </div>
              <span className={styles.iconValue}>{weathers.all}%</span>
            </div>
            <div className={styles.airConditionItem}>
              <div className={styles.iconContainer}>
                <FaWater className={styles.icon} />
                <h3 className={styles.iconLabel}>Humidity</h3>
              </div>
              <span className={styles.iconValue}>{weathers.humidity}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.forecast}>
        <h2 className={styles.forecastTitle}>TODAY'S FORECAST</h2>
        <div className={styles.forecastItems}>
          {weathers.hourly.map((item, index) => {
            return (
              <HourlyForecast
                tempUnit={allData.tempUnit}
                items={item}
                key={index}
                onClick={() => onClick(item)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
