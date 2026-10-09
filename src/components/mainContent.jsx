import { useState,useMemo } from "react"
import { languages, getRandomWord } from "../languages"
import Status from "./status"
import clsx from "clsx"
import { getFarewellMessage } from "../farewells"

export default function MainContent() {
    const [word, setWord] = useState(() => getRandomWord())
    const [guessedLetter, setGuessedletter] = useState([])

    const wrongGuessCount = guessedLetter.filter(
        letter => !word.includes(letter)
    ).length

    const maxAttempts = languages.length-1
    const remainingAttempts= maxAttempts - wrongGuessCount
    const isGameOver = wrongGuessCount >= maxAttempts

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
    }

    const lang = languages.map((language, index) => {
        const isLost = index < wrongGuessCount
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
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    return (
        <main>
            <header>
                <h1>Assembly:Endgame</h1>
                <p>
                    Guess the word within {maxAttempts} attempts to keep the programming world safe from assembly
                </p>
                <p className="attempts">
                    Attempts Remaining: <span>{remainingAttempts}</span>
                </p>
            </header>

            <Status 
                isGameWon={isGameWon} 
                isGameOver={isGameOver} 
                farewellMessage={farewellMessage}
            />

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