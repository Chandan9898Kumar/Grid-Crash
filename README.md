# GridCrash - Tic-Tac-Toe Game

## Description

GridCrash is a simple and engaging Tic-Tac-Toe game built with React. The game allows players to compete against each other or against the computer. The project demonstrates the use of modern React features such as hooks, context, and lazy loading, along with a service worker for offline capabilities.

## Features

- Play against another player or the computer
- Responsive design for various screen sizes
- Smooth animations using Framer Motion
- Offline capabilities with a service worker
- State management using Redux Toolkit
- Code splitting and lazy loading for improved performance

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/gridcrash.git
   cd gridcrash

   ```

2. Install the dependencies:

```sh

npm install

```

3. Start the development server:

```sh

npm start

```

4. Open your browser and navigate to http://localhost:3000 to see the application in action.

## Project Structure

```
gridcrash/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── MainMenu.js
│   │   ├── Game.js
│   │   └── ...
│   ├── context/
│   │   └── ThemeManager.js
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.js
│   ├── serviceWorker.js
│   └── ...
├── .babelrc
├── .env
├── .eslintrc.js
├── .gitignore
├── package.json
├── README.md
└── webpack.config.js
```

`Scripts`
**_npm start_**: Starts the development server.
**_npm build_**: Builds the project for production.
**_npm test_**: Runs the test suite.
**_npm eject_**: Ejects the Create React App configuration.

`Technologies Used`

1. React
2. Redux Toolkit
3. React Router
4. Framer Motion
5. Jest and React Testing Library
6. Webpack
7. Babel
