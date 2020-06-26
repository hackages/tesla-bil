import React from "react";

const TeslaStatsComponent = (props) => {
  const { models, wheels, climate, temperature, speed, metrics } = props;
  return (
    <div className="tesla-stats">
      <ul>
        {models
          .map((model) => {
            const miles =
              metrics[model][wheels.value][climate.value ? "on" : "off"].speed[
                speed.value
              ][temperature.value];
            return {
              model,
              miles,
            };
          })
          .map((stat) => (
            <li key={stat.model}>
              <div
                className={`tesla-stats-icon tesla-stats-icon--${stat.model.toLowerCase()}`}
              />
              <p>
                {stat.miles}
                <span>MI</span>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TeslaStatsComponent;
