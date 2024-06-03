import React from "react";
import { useState } from "react";
import styles from "./TopButtons.module.css";

const TopButtons = ({ setQuery }) => {
  const cities = [
    {
      id: 0,
      city: "Biratnagar",
    },
    {
      id: 1,
      city: "Kathmandu",
    },
    {
      id: 2,
      city: "Lalitpur",
    },
    {
      id: 3,
      city: "Bhaktapur",
    },
    {
      id: 4,
      city: "Pokhara",
    },
    {
      id: 5,
      city: "Butwal",
    },
    { id: 6, city: "Sydney" },
  ];

  console.log(cities);

  return (
    <div className={styles.topButtonsContainer}>
      {cities.map((city) => (
        <button
          className={styles.topButton}
          key={city.id}
          onClick={() => setQuery({ q: city.city })}
        >
          {city.city}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
