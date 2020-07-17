import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Amplify from "aws-amplify";
import awsConfig from "./awsConfig.json";
import * as serviceWorker from "./serviceWorker";
import "bulma/css/bulma.css";

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
