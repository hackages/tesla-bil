import React, { Component } from "react";
import teslaService from "./tesla-battery.service";
import { initialData } from "../mocks/data";
import { TeslaCarComponent } from "../components/TeslaCarComponent";
import TeslaStatsComponent from "../components/TeslaStatsComponent";

export class TeslaBattery extends Component {
  state = initialData;

  onBlurSpeed = () => {
    // TODO: On Speed blur, set the focus to false
    this.setState({ speed: { ...this.state.speed, focused: false } });
  };

  onBlurTemperature = () => {
    // TODO: On Temperature blur, set the focus to false
    this.setState({
      temperature: { ...this.state.temperature, focused: false },
    });
  };

  onFocusSpeed = () => {
    // TODO: On Speed focus, set the focus to true
    this.setState({ speed: { ...this.state.speed, focused: true } });
  };

  onFocusTemperature = () => {
    // TODO: On Temperature focus, set the focus to true
    this.setState({
      temperature: { ...this.state.temperature, focused: true },
    });
  };

  incrementSpeed = () => {
    // TODO: If the speed's value is less than the max speed then increase the speed's value by the speed.step
    const { speed } = this.state;
    if (speed.value < speed.max) {
      this.setState({
        speed: { ...this.state.speed, value: speed.value + speed.step },
      });
    }
  };
  incrementTemperature = () => {
    // TODO: If the temperature's value is less than the max temperature then increase the temperature's value by the temperature.step
    const { temperature } = this.state;
    if (temperature.value < temperature.max) {
      this.setState({
        temperature: {
          ...this.state.temperature,
          value: temperature.value + temperature.step,
        },
      });
    }
  };

  decrementSpeed = () => {
    // TODO: If the speed's value is higher than the min speed then decrease the speed's value by the speed.step
    const { speed } = this.state;
    if (speed.value > speed.min) {
      this.setState({
        speed: { ...this.state.speed, value: speed.value - speed.step },
      });
    }
  };

  decrementTemperature = () => {
    // TODO: If the temperature's value is higher than the min temperature then decrease the temperature's value by the temperature.step
    const { temperature } = this.state;
    if (temperature.value > temperature.min) {
      this.setState({
        temperature: {
          ...this.state.temperature,
          value: temperature.value - temperature.step,
        },
      });
    }
  };

  changeClimate = () => {
    // TODO: Swith the value on(true) and off(false)
    this.setState({
      climate: { ...this.state.climate, value: !this.state.climate.value },
    });
  };

  onBlurClimate = () => {
    // TODO: On Climate blur, set the focus to false
    this.setState({ climate: { ...this.state.climate, focused: false } });
  };

  onFocusClimate = () => {
    // TODO: On Climate focus, set the focus to true
    this.setState({ climate: { ...this.state.climate, focused: true } });
  };

  onBlurWheels = () => {
    // TODO: On Wheels blur, set the focus to null
    this.setState({ wheels: { ...this.state.wheels, focused: null } });
  };

  changeWheelSize = (size) => {
    // TODO: On Wheels change size, assign the new value to the wheels' value
    this.setState({ wheels: { ...this.state.wheels, value: size } });
  };

  onFocusWheels = (size) => {
    // TODO: On Wheels focus, assign the size to the focused property of the wheels' object
    this.setState({ wheels: { ...this.state.wheels, focused: size } });
  };

  componentDidMount = () => {
    // TODO: When the app starts, get the
    this.setState({ metrics: teslaService.getModelData() });
  };

  render = () => {
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
      return <div>....Fetch Data from the backend</div>;
    }
    return (
      <form className="tesla-battery">
        <h1>{title}</h1>

        {/* TeslaCarComponent */}
        <TeslaCarComponent speed={speed} wheels={wheels}></TeslaCarComponent>
        {/* End TeslaCarComponent */}

        {/* TeslaStatsComponent */}
        <TeslaStatsComponent
          models={models}
          metrics={metrics}
          climate={climate}
          speed={speed}
          wheels={wheels}
          temperature={temperature}
        ></TeslaStatsComponent>
        {/* End TeslaStatsComponent */}

        <div className="tesla-controls cf">
          {/* TeslaCounterComponent for speed */}
          <div className="tesla-counter">
            <p className="tesla-counter__title">Speed</p>
            <div className="tesla-counter__container cf">
              <div
                className="tesla-counter__item"
                tabIndex="0"
                onBlur={this.onBlurSpeed}
                onFocus={this.onFocusSpeed}
              >
                <p className="tesla-counter__number">
                  {speed.value}
                  <span>mph</span>
                </p>
                <div className="tesla-counter__controls" tabIndex="-1">
                  <button
                    tabIndex="-1"
                    type="button"
                    onClick={this.incrementSpeed}
                    disabled={speed.value === speed.max}
                  />
                  <button
                    tabIndex="-1"
                    type="button"
                    onClick={this.decrementSpeed}
                    disabled={speed.value === speed.min}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End TeslaCounterComponent for speed */}
          <div className="tesla-climate cf">
            {/* TeslaCounterComponent for outside temperature */}
            <div className="tesla-counter">
              <p className="tesla-counter__title">Outside Temperature</p>
              <div className="tesla-counter__container cf">
                <div
                  className="tesla-counter__item"
                  tabIndex="0"
                  onBlur={this.onBlurTemperature}
                  onFocus={this.onFocusTemperature}
                >
                  <p className="tesla-counter__number">
                    {temperature.value}
                    <span>°</span>
                  </p>
                  <div className="tesla-counter__controls" tabIndex="-1">
                    <button
                      tabIndex="-1"
                      type="button"
                      onClick={this.incrementTemperature}
                      disabled={temperature.value === temperature.max}
                    />
                    <button
                      tabIndex="-1"
                      type="button"
                      onClick={this.decrementTemperature}
                      disabled={temperature.value === temperature.min}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* End TeslaCounterComponent for outside temperature */}

            {/* TeslaClimateComponent */}
            <div>
              <label
                className={`tesla-climate__item ${
                  !(temperature.value > 10) ? "tesla-heat " : " "
                }${climate.value ? "tesla-climate__item--active " : " "}${
                  climate.focused === climate.value
                    ? "tesla-climate__item--focused"
                    : ""
                }`}
              >
                <p className="heat">
                  {temperature.value > 10 ? "ac" : "heat"}{" "}
                  {climate.value ? "on" : "off"}
                </p>
                <i className="tesla-climate__icon" />
                <input
                  type="checkbox"
                  name="climate"
                  defaultChecked={climate.value}
                  onClick={this.changeClimate}
                  onBlur={this.onBlurClimate}
                  onFocus={this.onFocusClimate}
                />
              </label>
            </div>
            {/* End TeslaClimateComponent */}
          </div>

          {/* TeslaWheelsComponent */}
          <div className="tesla-wheels">
            <p className="tesla-wheels__title">Wheels</p>
            <div className="tesla-wheels__container cf">
              {wheels.sizes.map((size) => (
                <label
                  key={size}
                  className={`${
                    wheels.value === size ? "tesla-wheels__item--active " : " "
                  }${
                    wheels.focused === size
                      ? "tesla-wheels__item--focused "
                      : " "
                  }tesla-wheels__item tesla-wheels__item--${size}`}
                >
                  <input
                    type="radio"
                    name="wheelsize"
                    value={size}
                    onBlur={this.onBlurWheels}
                    onClick={() => this.changeWheelSize(size)}
                    onFocus={() => this.onFocusWheels(size)}
                    defaultChecked={wheels.value === size}
                  />
                  <p>{size}"</p>
                </label>
              ))}
            </div>
          </div>
          {/* End TeslaWheelsComponent */}
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
  };
}
