import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./StateProvider";
import { initialState, reducer } from "./Reducer";

ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App className="app" />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
