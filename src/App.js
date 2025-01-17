import LoaderPage from "Common/CircularLoader"; // Using alias for Common directory
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SvgIcons from "./Common/Assets";
import { ChangeTheme } from "./Context";
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
  const { isThemeDark, setIsThemeDark } = ChangeTheme();
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <button
          className="clean-btn toggleButton_MMFG"
          type="button"
          title="Switch between dark and light mode (currently light mode)"
          aria-label="Switch between dark and light mode (currently light mode)"
          aria-live="polite"
          aria-pressed="false"
          onClick={() => setIsThemeDark(!isThemeDark)}
        >
          {isThemeDark ? SvgIcons.SvgDarkMode() : SvgIcons.SvgLightMode()}
        </button> */}
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
