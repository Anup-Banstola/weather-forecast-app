import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import styles from "./SearchBox.module.css";

const SearchBox = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery({ q: city });
    setCity("");
  };

  //Handle the Current Location
  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setQuery({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  };

  //Handle the units change

  const handleUnits = (e) => {
    if (units !== e.target.name) {
      setUnits(e.target.name);
    }
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter the location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className={styles.submit} onClick={handleSearch}>
          <FaSearch className={styles.search} />
        </button>
      </div>
      <FaLocationDot
        color="white"
        size={30}
        cursor="pointer"
        onClick={handleCurrentLocation}
      />
      <div className={styles.units}>
        <button
          name="metric"
          onClick={handleUnits}
          className={units === "metric" ? styles.active : ""}
        >
          °C
        </button>
        |
        <button
          name="Imperial"
          onClick={handleUnits}
          className={units === "Imperial" ? styles.active : ""}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
