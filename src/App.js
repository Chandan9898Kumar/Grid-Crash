import LoaderPage from "Common/CircularLoader"; // Using alias for Common directory
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import store from "./Store";
const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error(error);
      return window.location.reload();
    }
  });

const MainMenu = lazyWithRetry(() => import("./MainMenu"));
const Game = lazyWithRetry(() => import("./Game"));
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<LoaderPage />}>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
