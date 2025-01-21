import LoaderPage from "Common/CircularLoader"; // Using alias for Common directory
import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SvgIcons from "./Common/Assets";
import { ChangeTheme } from "./Context";
import store from "./Store";

// Optimize error handling in lazyWithRetry:
// Implemented retry mechanism with exponential backoff
// More graceful handling of loading failures
// Limited number of retries before forcing a reload.
const lazyWithRetry = (componentImport) => {
  const maxRetries = 2;
  return lazy(async () => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await componentImport();
      } catch (error) {
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    }
    console.error(lastError);
    return window.location.reload();
  });
};

// Add preloading function
// Added preloading strategy to fetch components in the background after initial render
// This improves subsequent navigation performance as components are already cached
const preloadComponents = () => {
  const preloadMainMenu = () => import("./MainMenu");
  const preloadGame = () => import("./Game");

  // Preload after initial render
  setTimeout(() => {
    preloadMainMenu();
    preloadGame();
  }, 1000);
};

const MainMenu = lazyWithRetry(() => import("./MainMenu"));
const Game = lazyWithRetry(() => import("./Game"));

const ThemeToggleButton = React.memo(({ isThemeDark, setIsThemeDark }) => (
  <button
    className="clean-btn toggleButton"
    type="button"
    title={`Switch between dark and light mode (currently ${
      isThemeDark ? "dark" : "light"
    } mode)`}
    aria-label={`Switch between dark and light mode (currently ${
      isThemeDark ? "dark" : "light"
    } mode)`}
    aria-live="polite"
    aria-pressed={isThemeDark}
    style={{ color: isThemeDark ? "white" : "plum" }}
    onClick={() => setIsThemeDark(!isThemeDark)}
  >
    {isThemeDark ? SvgIcons.SvgDarkMode() : SvgIcons.SvgLightMode()}
  </button>
));
function App() {
  const { isThemeDark, setIsThemeDark } = ChangeTheme();

  // Call preload function after initial render
  React.useEffect(() => {
    preloadComponents(); // Triggered after initial render
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeToggleButton
          isThemeDark={isThemeDark}
          setIsThemeDark={setIsThemeDark}
        />
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

/**
 * 
Without preloading: Components are only loaded when the user navigates to their route

With preloading: Components start loading in the background shortly after initial page load

This means when a user clicks to navigate, the component is already downloaded or in progress
 */
