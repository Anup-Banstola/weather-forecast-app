import { DateTime } from "luxon";
const API_KEY = "34480b98aa332da53123a0ac63a4ea9d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((response) => response.json());
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
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 7).map((d) => {
    return {
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
    };
  });

  hourly = hourly.slice(2, 7).map((d) => {
    return {
      // title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      title: d.dt,
      temp: d.temp,
      icon: d.weather[0].icon,
      detail: d.weather[0].main,
      humidity: d.humidity,
      wind_speed: d.wind_speed,
      clouds: d.clouds,
      feels_like: d.feels_like,
    };
  });

  return { timezone, daily, hourly };
};

const getFormatedWeatherData = async (searchParams) => {
  const formatedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formatedCurrentWeather;
  const formatedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formatedCurrentWeather, ...formatedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "ccc, LL-dd' | 'HH:MM") =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormatedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
