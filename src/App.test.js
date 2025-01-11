import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";
import ThemeManager from "./Context";

jest.mock("./MainMenu", () => () => <div>MainMenu Component</div>);
jest.mock("./Game", () => () => <div>Game Component</div>);
jest.mock("./Common/CircularLoader", () => () => <div>Loading...</div>);

describe("App", () => {
  test("renders MainMenu component for the root route", async () => {
    render(
      
        <ThemeManager>
          <App />
        </ThemeManager>
      
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const mainMenuElement = await screen.findByText("MainMenu Component");
    expect(mainMenuElement).toBeInTheDocument();
  });

  test("renders Game component for the /game route", async () => {
    window.history.pushState({}, "Game Page", "/game");

    render(
      
        <ThemeManager>
          <App />
        </ThemeManager>
     
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const gameElement = await screen.findByText("Game Component");
    expect(gameElement).toBeInTheDocument();
  });
});
