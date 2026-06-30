import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const onRedirectCallback = (appState) => {
  window.location.replace(appState?.returnTo || "/app");
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-zot4kk3hoskmk6k4.us.auth0.com"
        clientId="W7PocqFJikBAroCMfxvcCHXtZhl5Agvk"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://resumeforge-api",
          scope: "openid profile email",
        }}
        onRedirectCallback={onRedirectCallback}
        cacheLocation="localstorage"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);