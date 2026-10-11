export const languages = [
  { name: "HTML", backgroundColor: "#E44D26", color: "#FFFFFF" },
  { name: "CSS", backgroundColor: "#1572B6", color: "#FFFFFF" },
  { name: "JavaScript", backgroundColor: "#F7DF1E", color: "#000000" },
  { name: "React", backgroundColor: "#61DAFB", color: "#000000" },
  { name: "TypeScript", backgroundColor: "#3178C6", color: "#FFFFFF" },
  { name: "Node.js", backgroundColor: "#339933", color: "#FFFFFF" },
  { name: "Python", backgroundColor: "#3776AB", color: "#FFFFFF" },
  { name: "Ruby", backgroundColor: "#CC342D", color: "#FFFFFF" },
  { name: "Assembly", backgroundColor: "#4E5D6C", color: "#FFFFFF" }
];

export const words = [
    "reacts", // (adjusted to 6 letters to fit your layout)
    "states",
    "effect",
    "object",
    "number",
    "string",
    "border",
    "margin",
    "render",
    "output",
    "source",
    "thirty",
    "binary",
    "coding",
    "syntax",
    "server",
    "client",
    "cookie",
    "router",
    "branch",
    "commit",
    "deploy",
    "styles",
    "script",
    "import",
    "export",
    "plugin"
]

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}