import React, { Component } from "react";
import teslaService from "./tesla-battery.service";
import { initialData } from "../mocks/data";
import {
  TeslaCar,
  TeslaClimate,
  TeslaCounter,
  TeslaStats,
  TeslaWheels,
} from "../components";

export class TeslaBattery extends Component {
  state = initialData;

  changeClimate = () => {
    this.setState({ climate: !this.state.climate });
  };

  changeWheelSize = (size) => {
    this.setState({ wheels: size });
  };

  componentDidMount() {
    this.setState({ metrics: teslaService.getModelData() });
  }

  render() {
    const {
      title,
      wheels,
      speed,
      models,
      metrics,
      climate,
      temperature,
    } = this.state;
    if (!metrics) {
      return null;
    }
    return (
      <form className="tesla-battery">
        <h1>{title}</h1>

        <TeslaCar wheels={wheels} speed={speed} />

        <TeslaStats {...this.state} />

        <div className="tesla-controls cf">
          <TeslaCounter
            title="Speed"
            unit="mph"
            step={5}
            min={45}
            max={70}
            changeVal={(value) => this.setState({ speed: value })}
            value={this.state.speed.value}
          />
          <div className="tesla-climate cf">
            <TeslaCounter
              title="Outside Temperature"
              unit="°"
              step={10}
              min={-10}
              max={40}
              changeVal={(value) => this.setState({ temperature: value })}
              value={this.state.temperature.value}
            />

            <TeslaClimate
              limit={temperature > 10}
              value={climate}
              click={this.changeClimate}
            />
          </div>

          <TeslaWheels value={wheels} changeWheelSize={this.changeWheelSize} />
        </div>
        <div className="tesla-battery__notice">
          <p>
            The actual amount of range that you experience will vary based on
            your particular use conditions. See how particular use conditions
            may affect your range in our simulation model.
          </p>
          <p>
            Vehicle range may vary depending on the vehicle configuration,
            battery age and condition, driving style and operating,
            environmental and climate conditions.
          </p>
        </div>
      </form>
    );
  }
}
