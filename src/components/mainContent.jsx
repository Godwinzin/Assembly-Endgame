import { useState,useMemo,useEffect } from "react"
import { languages, getRandomWord } from "../languages"
import Status from "./status"
import clsx from "clsx"
import { getFarewellMessage } from "../farewells"
import Confetti from "canvas-confetti"
import Timer from "./Timer"

export default function MainContent() {
    const [word, setWord] = useState(() => getRandomWord())
    const [guessedLetter, setGuessedletter] = useState([])
    const [hasTimedOut, setHasTimedOut] = useState(false)

    const wrongGuessCount = guessedLetter.filter(
        letter => !word.includes(letter)
    ).length

    const maxAttempts = languages.length-1
    const remainingAttempts= maxAttempts - wrongGuessCount
    const isGameOver = wrongGuessCount >= maxAttempts || hasTimedOut

    const isGameWon = word
        .toLowerCase()
        .split("")
        .every(letter => guessedLetter.includes(letter))

    const isGameEnded = isGameWon || isGameOver
    const lastEliminatedLanguage = wrongGuessCount > 0 
        ? languages[wrongGuessCount - 1] 
        : null
    
    const farewellMessage = useMemo(() => {
    return lastEliminatedLanguage 
        ? getFarewellMessage(lastEliminatedLanguage.name) 
        : ""
        }, [lastEliminatedLanguage])

    function addGuessedLetter(letter) {
        if (isGameEnded) return

        setGuessedletter(prev => 
            prev.includes(letter) ? prev : [...prev, letter]
        )
    }

    function startNewGame() {
        setWord(getRandomWord())
        setGuessedletter([])
        setHasTimedOut(false)
    }

    const lang = languages.map((language, index) => {
        const isLost = index < wrongGuessCount||(hasTimedOut && language.name !== "Assembly")
        return (
            <div 
                key={language.name} 
               className={clsx("language",
                 { 
                    lost: isLost 
                })}
                style={{ 
                    color: language.color, 
                    backgroundColor: language.backgroundColor 
                }}
            >
                {language.name}
            </div>
        )
    })

    const currentWord = word.split("").map((lett, index) => {
        const isGuessed = guessedLetter.includes(lett.toLowerCase())
    
        const shouldReveal = isGuessed || isGameOver

        return (
            <span key={index}>
                {shouldReveal ? lett.toUpperCase() : ""}
            </span>
        )
    })

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const keyboardButtons = alphabet.split("").map(letter => {
        const isGuessed = guessedLetter.includes(letter)
        const isCorrect = isGuessed && word.toLowerCase().includes(letter)
        const isWrong = isGuessed && !word.toLowerCase().includes(letter)

        const className = clsx("keyboard-btn", {
            correct: isCorrect,
            wrong: isWrong
    })

        return (
            <button 
                key={letter} 
                className={className}
                disabled={isGuessed || isGameEnded}
                aria-disabled={isGuessed || isGameEnded}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })
    //  Trigger confetti when isGameWon becomes true
    useEffect(() => {
        if (isGameWon) {
            Confetti({
                particleCount: 500,
                spread: 160,
                startVelocity:45,
                // origin: { y: 0.6 }
            })
        }
    }, [isGameWon])

    return (
        <main className={clsx({ "game-over": isGameOver })}>
            <header>
                <h1>Assembly:Endgame</h1>
                <p>
                    Guess the word within {maxAttempts} attempts to keep the programming world safe from assembly
                </p>
                <div className="game-stats">
                    <p className="attempts">
                        Attempts Remaining: <span>{remainingAttempts}</span>
                    </p>
                    {/* Added the Timer component here */}
                    <Timer 
                        isGameEnded={isGameEnded} 
                        isRunning={guessedLetter.length > 0 && !isGameEnded} 
                        startNewGameKey={word} 
                        onTimeUp={() => {
                            
                            setHasTimedOut(true)
                        }}
                    />
                </div>
            </header>

            <section className="status-section" aria-live="polite" role="status">
                <Status 
                isGameWon={isGameWon} 
                isGameOver={isGameOver} 
                farewellMessage={farewellMessage}
                hasTimedOut={hasTimedOut}
            />
            </section>
            <section className="languages">
                {lang}
            </section>

            <section className="word">
                {currentWord}
            </section>

            <section className="keyboard">
                {keyboardButtons}
            </section>

            {isGameEnded && <button className="new-game-btn" onClick={startNewGame}>
                New Game
            </button>}
        </main>
    )
}