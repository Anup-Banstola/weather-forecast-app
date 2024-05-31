import { useState, useEffect } from "react";
import TopButtons from "./Component/TopButtons";
import SearchBox from "./Component/SearchBox";
import CurrentWeather from "./Component/Current/CurrentWeather";
import DailyWeather from "./Component/Daily/DailyWeather";
import getFormatedWeatherData from "./Component/Services/WeatherService";
import { WeatherContext } from "./Context/WeatherContext";
import { useContext } from "react";
import styles from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState({ q: "Pokhara" });

  const weathers = useContext(WeatherContext);
  console.log(weathers);

  let units = weathers.units;

  useEffect(() => {
    const fetchWeatherData = async () => {
      await getFormatedWeatherData({ ...query, units }).then((data) => {
        weathers.setWeather(data);
      });
    };

    fetchWeatherData();
  }, [query, units]);

  const formatTempBackground = () => {
    if (!weathers.weather) return styles.bgSlate700;
    const threshold = units === "metric" ? 20 : 68;
    return weathers.weather.temp >= threshold
      ? styles.bgGradientOrangeToRed
      : styles.bgGradientCyanToGray;
  };

  return (
    <div className={styles.container}>
      <TopButtons setQuery={setQuery} />
      <SearchBox
        setQuery={setQuery}
        units={weathers.units}
        setUnits={weathers.setUnits}
      />

      {!weathers.weather ? (
        <div className={styles.loading}>
          <span>Loading.... or</span> &nbsp; Incorrect City Name
        </div>
      ) : (
        <div className={styles.weatherContainer}>
          <CurrentWeather
            units={units}
            formatTempBackground={formatTempBackground}
          />
          <DailyWeather
            items={weathers.weather.daily}
            tempUnit={weathers.tempUnit}
            weather={weathers.weather}
          />
        </div>
      )}
    </div>
  );
};

export default App;
