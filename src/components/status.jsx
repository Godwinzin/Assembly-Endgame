export default function Status({ isGameWon, isGameOver,farewellMessage,hasTimedOut}) {
    if (isGameWon) {
        return (
            <section className="status won">
                <h2>You won!</h2>
                <p>Well Done</p>
            </section>
        )
    }

    if (hasTimedOut) {
        return (
            <section className="status lost">
                <h2>Timed Out!</h2>
                <p>You lost! Better start learning Assembly</p>
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
    
    if (farewellMessage) {
        return (
            <section className="status farewell">
                <p>{farewellMessage}</p>
            </section>
        )
    }

   return <section className="status placeholder" aria-hidden="true"></section>
}