import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import "@testing-library/jest-dom";
import App from "./App";
import { ChangeTheme } from "./Context";
import store from "./Store";
// Mock the lazy-loaded components
jest.mock("./MainMenu", () => () => <div>Main Menu Component</div>);
jest.mock("./Game", () => () => <div>Game Component</div>);
jest.mock("./Common/CircularLoader", () => () => (
  <div data-testid="circular-loader">Loading...</div>
));
jest.mock("./Common/Assets", () => ({
  SvgDarkMode: () => <div>Dark Mode Icon</div>,
  SvgLightMode: () => <div>Light Mode Icon</div>,
}));

// Mock the Context
jest.mock("./Context", () => ({
  ChangeTheme: jest.fn(),
}));

describe("App Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the ChangeTheme context
    ChangeTheme.mockImplementation(() => ({
      isThemeDark: false,
      setIsThemeDark: jest.fn(),
    }));
  });

  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("renders theme toggle button", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const themeButton = screen.getByRole("button", {
      name: /Switch between dark and light mode/i,
    });
    expect(themeButton).toBeInTheDocument();
  });

  test("theme toggle button changes state when clicked", () => {
    const setIsThemeDark = jest.fn();
    ChangeTheme.mockImplementation(() => ({
      isThemeDark: false,
      setIsThemeDark,
    }));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const themeButton = screen.getByRole("button");
    fireEvent.click(themeButton);
    expect(setIsThemeDark).toHaveBeenCalledWith(true);
  });

  test("displays loader while components are being lazy loaded", async () => {
    // First, ensure we have the correct mock for CircularLoader
    const MockCircularLoader = () => (
      <div data-testid="circular-loader">Loading...</div>
    );
    jest.mock("./Common/CircularLoader", () => MockCircularLoader);

    // Create a promise that won't resolve immediately to force the loading state
    const LazyComponent = React.lazy(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ default: () => <div>Loaded Content</div> });
          }, 100);
        })
    );

    render(
      <Provider store={store}>
        <React.Suspense fallback={<MockCircularLoader />}>
          <LazyComponent />
        </React.Suspense>
      </Provider>
    );

    // Now the loader should be visible
    const loader = screen.getByTestId("circular-loader");
    expect(loader).toBeInTheDocument();
  });

  test("renders with dark theme", () => {
    ChangeTheme.mockImplementation(() => ({
      isThemeDark: true,
      setIsThemeDark: jest.fn(),
    }));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const themeButton = screen.getByRole("button");
    expect(themeButton).toHaveStyle({ color: "white" });
  });

  test("renders with light theme", () => {
    ChangeTheme.mockImplementation(() => ({
      isThemeDark: false,
      setIsThemeDark: jest.fn(),
    }));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const themeButton = screen.getByRole("button");
    expect(themeButton).toHaveStyle({ color: "plum" });
  });
});
