const farewellMessages = [
    (name) => `Farewell, ${name}`,
    (name) => `RIP ${name}, you served us well`,
    (name) => `Adios ${name}!`,
    (name) => `Oh no, not ${name}!`,
    (name) => `We'll miss you, ${name}`,
    (name) => `${name} has left the chat`,
    (name) => `Gone but not forgotten, ${name}`,
]

export function getFarewellMessage(languageName) {
    const randomIndex = Math.floor(Math.random() * farewellMessages.length)
    return farewellMessages[randomIndex](languageName)
}