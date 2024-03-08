import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from 'react-redux';
import store from './../src/store/store/index';
import toast, { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
        <Toaster
          position="bottom-center"
          reverseOrder={true}
        />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
