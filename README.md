# Assembly: Endgame 

**Assembly: Endgame** is a word-guessing game built with React. The mission is simple: guess the secret programming term letter-by-letter within 9 attempts to prevent the world from falling back to Assembly language!

---

## Features

- **Dynamic Word Bank:** Randomly selects 6-letter (or shorter) programming & tech terms.
- **Language Elimination:** Every wrong guess "kills" one of the 9 programming languages with a 💀 indicator.
- **Visual Feedback:** 
  - On-screen keyboard keys highlight **green** for correct guesses and **red** for incorrect ones.
  - Interactive status banner displays win/loss states.
- **Game State Protection:** Keyboard buttons disable automatically upon game completion or duplicate selection.
- **Clean Codebase:** Leverages `clsx` for conditional CSS class management and modular components like `<Status />`.

---

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** CSS3 (Flexbox/Grid, CSS Variables)
- **Utilities:** [`clsx`](https://www.npmjs.com/package/clsx)

---

<!-- ## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/assembly-endgame.git](https://github.com/your-username/assembly-endgame.git)
   cd assembly-endgame -->