import { DateTime } from "luxon";
const API_KEY = "34480b98aa332da53123a0ac63a4ea9d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch weather data.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const formatCurrentWeather = (data) => {
  console.log(data);
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    clouds: { all },
  } = data;

  const { main: detail, icon } = weather[0];
  console.log(weather);

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    detail,
    icon,
    speed,
    all,
  };
};

const formatForecastWeather = (data) => {
  if (!data.daily || !data.hourly) {
    console.error("Invalid forecast data", data);
    return { daily: [], hourly: [] };
  }

  const { timezone, daily, hourly } = data;

  const formattedDaily = daily.slice(1, 7).map((d) => ({
    title: formatToLocalTime(d.dt, timezone, "dd' 'LLL | ccc"),
    temp: d.temp.day,
    morn: d.temp.morn,
    eve: d.temp.eve,
    night: d.temp.night,
    icon: d.weather[0].icon,
    detail: d.weather[0].main,
    humidity: d.humidity,
    wind_speed: d.wind_speed,
    clouds: d.clouds,
    feels_like: d.feels_like.day,
    sunrise: formatToLocalTime(d.sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(d.sunset, timezone, "hh:mm a"),
  }));
  const formattedHourly = hourly.slice(2, 7).map((d) => ({
    title: d.dt,
    temp: d.temp,
    icon: d.weather[0].icon,
    detail: d.weather[0].main,
    humidity: d.humidity,
    wind_speed: d.wind_speed,
    clouds: d.clouds,
    feels_like: d.feels_like,
  }));

  return { timezone, daily: formattedDaily, hourly: formattedHourly };
};

const getFormatedWeatherData = async (searchParams) => {
  try {
    const currentWeather = await getWeatherData("weather", searchParams);
    const formattedCurrentWeather = formatCurrentWeather(currentWeather);

    const { lat, lon } = formattedCurrentWeather;
    const forecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    });

    const formattedForecastWeather = formatForecastWeather(forecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error getting formatted weather data:", error);

    throw error;
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm:ss a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormatedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
