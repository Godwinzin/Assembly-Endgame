import { useState, useEffect } from "react"

export default function Timer({ isGameEnded, isRunning, startNewGameKey, onTimeUp }) {
    const [secondsLeft, setSecondsLeft] = useState(30)

    useEffect(() => {
        setSecondsLeft(30) // Reset timer on new game
    }, [startNewGameKey])

    useEffect(() => {
        if (isGameEnded || !isRunning) return

        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    onTimeUp?.() // Trigger game over when time runs out
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isGameEnded, isRunning, onTimeUp]) // 💡 Removed secondsLeft from here!

    // Format as MM:SS (e.g., 00:59)
    const minutes = Math.floor(secondsLeft / 60)
    const remainingSeconds = secondsLeft % 60
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`

    return (
        <div className="timer-container">
            Time Left: <span>{formattedTime}</span>
        </div>
    )
}