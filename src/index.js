import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
const title = "Tesla Ranger";

function handler() {
  return "function";
}
ReactDOM.render(App({ title, handler }), document.getElementById("root"));
registerServiceWorker();
