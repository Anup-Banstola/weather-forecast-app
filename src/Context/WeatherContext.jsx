import { createContext, useState } from "react";

export const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  let tempUnit = `${units === "metric" ? " °C" : " °F"}`;
  return (
    <WeatherContext.Provider
      value={{ weather, setWeather, tempUnit, units, setUnits }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
