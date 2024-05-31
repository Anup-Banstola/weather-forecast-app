import React from "react";
import DailyComponent from "./DailyComponent";
import styles from "./DailyWeather.module.css";

const DailyWeather = ({ items, tempUnit }) => {
  return (
    <div className={styles.dailyContainer}>
      <h2 className={styles.dailyTitle}>Daily Forecast</h2>

      {items.map((item, index) => {
        return (
          <DailyComponent
            key={index}
            item={item}
            tempUnit={tempUnit}
            className={styles.daily}
          />
        );
      })}
    </div>
  );
};

export default DailyWeather;
