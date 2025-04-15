# 💣 React Minesweeper

A classic Minesweeper game built with React and Bootstrap. Customize the number of mines, reveal cells, flag suspected bombs, and beat the clock!

[🚀 Try the Live Demo](#) | [📸 View Screenshots](./public/screenshoot)

---

## 🎮 Features

- **Classic Minesweeper Gameplay**: Reveal cells, flag mines, and avoid explosions.
- **Customizable Mine Count**: Set the number of mines (1–99) for varied difficulty.
- **Interactive Timer**: Starts on first click, with pause/resume functionality.
- **Right-Click Flagging**: Easily mark suspected mines with a right-click.
- **Win/Lose Feedback**: Visual indicators for victory or defeat.
- **Responsive Design**: Play seamlessly on desktop or mobile with Bootstrap.
- **Restart Option**: Reset the game to try again.

---

## 📦 Tech Stack

- **React** (^18.x) with hooks (`useState`, `useEffect`, `useRef`)
- **Bootstrap** (^5.x) for responsive styling
- **JavaScript** (ES6+) for game logic

---

## ⚙️ Setup & Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/react-minesweeper.git
cd react-minesweeper
```

### 2.Install dependencies

```
npm install
```

### 3. Start the dev server

```
npm start
```

## 🔧 Customization

- **Board Size & Mines**: Modify App.js to adjust the grid size (e.g., rows and cols) or mine limits
- **Styling**: Override Bootstrap styles in src/index.css or add custom CSS.
- **Assets**: Replace mine, flag, or win icons in public/assets/ (e.g., bomb.png, flag.png).

## 📸 UI Preview

![screenshot](./public/images/bomb.jpg)
![Gameplay Demo](./screenshots/demo.gif)

## 🚧 Future Improvements

- Add difficulty presets (e.g., Beginner, Intermediate, Expert).
- Implement a high-score system with local storage.
- Enhance animations for cell reveals and explosions.
- Add sound effects for clicks and game events.
