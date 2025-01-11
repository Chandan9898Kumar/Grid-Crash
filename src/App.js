import "./App.css";
import React, { Suspense, lazy } from "react";
// import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoaderPage from "Common/CircularLoader";  // Using alias for Common directory

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
    <BrowserRouter>
      <Suspense fallback={<LoaderPage />}>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
