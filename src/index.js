import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();
ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
