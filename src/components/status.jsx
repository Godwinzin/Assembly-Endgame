export default function Status({ isGameWon, isGameOver}) {
    if (isGameWon) {
        return (
            <section className="status won">
                <h2>You won!</h2>
                <p>Well Done</p>
            </section>
        )
    }

    if (isGameOver) {
        return (
            <section className="status lost">
                <h2>Game over!</h2>
                <p>You lost! Better start learning Assembly</p>
            </section>
        )
    }

    return null
}