import "./App.css";
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoaderPage from "./Common/CircularLoader";

const MainMenu = lazy(() => import("./MainMenu"));
const Game = lazy(() => import("./Game"));
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
