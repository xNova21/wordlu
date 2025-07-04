import { useEffect, useState } from "react";
import { words } from "../assets/words"; // Assuming words.js is in the public folder
export default function Game() {
  const [keyboard, setKeyboard] = useState({
    q: "",
    w: "",
    e: "",
    r: "",
    t: "",
    y: "",
    u: "",
    i: "",
    o: "",
    p: "",
    a: "",
    s: "",
    d: "",
    f: "",
    g: "",
    h: "",
    j: "",
    k: "",
    l: "",
    ñ: "",
    z: "",
    x: "",
    c: "",
    v: "",
    b: "",
    n: "",
    m: "",
  });
  const [goodWord, setGoodWord] = useState({ word: "", counter: {} });

  const [message, setMessage] = useState({
    message: "",
    class: "",
  });

  const [attempts, setAttempts] = useState([]);

  const [currentAttempt, setCurrentAttempt] = useState([]);

  const [resultColors, setResultColors] = useState([]);

  const [newGame, setNewGame] = useState(false);

  const handleChange = (value) => {
    setCurrentAttempt((prev) => {
      if (prev.length < 5) {
        const newAttempt = [...prev, value];
        return newAttempt;
      }
      return prev;
    });
  };

  const handleDelete = () => {
    setCurrentAttempt((prev) => {
      if (prev.length > 0) {
        const newAttempt = [...prev];
        newAttempt.pop();
        return newAttempt;
      }
      return prev;
    });
  };

  const handleEnter = () => {
    // Insufficient attempt length check
    if (currentAttempt.length < 5) {
      setMessage({
        message: "Debes ingresar 5 letras",
        class: "text-red-500 text-center",
      });
      setTimeout(() => {
        setMessage({ message: "", class: "" });
      }, 2000);
      return;
    }
    // Check if the current attempt is a valid word
    if (!words.includes(currentAttempt.join(""))) {
      setMessage({
        message: "Palabra no válida",
        class: "text-red-500 text-center",
      });
      setTimeout(() => {
        setMessage({ message: "", class: "" });
      }, 2000);
      return;
    }

    // Check if the current attempt matches the good word
    if (currentAttempt.join("") === goodWord.word) {
      setNewGame(true);
      setMessage({
        message: "¡Felicidades! Has acertado la palabra.",
        class: "text-green-500 text-center",
      });
      setAttempts((prev) => [...prev, currentAttempt]);
      setCurrentAttempt("");
      setKeyboard((prev) => {
        const newKeyboard = { ...prev };
        currentAttempt.forEach((letter, index) => {
          if (goodWord.word[index] === letter) {
            newKeyboard[letter] = "bg-green-500";
          } else if (goodWord.word.includes(letter) && !newKeyboard[letter]) {
            newKeyboard[letter] = "bg-yellow-500";
          } else if (!goodWord.word.includes(letter) && !newKeyboard[letter]) {
            newKeyboard[letter] = "bg-gray-500";
          }
        });
        return newKeyboard;
      });
      setResultColors((prev) => {
        const newColors = [...prev];
        newColors.push(Array(5).fill("bg-green-500"));
        return newColors;
      });
      return;
    }
    let colors = Array(5).fill("bg-gray-500");
    let counter = { ...goodWord.counter };
    let newKeyboard = { ...keyboard };
    for (let i = 0; i < 5; i++) {
      if (currentAttempt[i] === goodWord.word[i]) {
        colors[i] = "bg-green-500";
        counter[currentAttempt[i]]--;
        newKeyboard[currentAttempt[i]] = "bg-green-500";
      } else if (!goodWord.word.includes(currentAttempt[i])) {
        newKeyboard[currentAttempt[i]] = "bg-gray-500";
      }
    }
    for (let i = 0; i < 5; i++) {
      if (
        goodWord.word.includes(currentAttempt[i]) &&
        counter[currentAttempt[i]] > 0 &&
        colors[i] !== "bg-green-500"
      ) {
        colors[i] = "bg-yellow-500";
        counter[currentAttempt[i]]--;
        newKeyboard[currentAttempt[i]] = "bg-yellow-500";
      }
    }
    // If the word is not found, set the keyboard color to
    // Process the current attempt
    setResultColors((prev) => {
      const newColors = [...prev];
      newColors.push(colors);
      return newColors;
    });
    setKeyboard(newKeyboard);
    const newAttempts = [...attempts];
    newAttempts.push(currentAttempt);
    setAttempts(newAttempts);
    setCurrentAttempt("");

    // Check if the game is over
    if (newAttempts.length >= 6) {
      setNewGame(true);
      setMessage({
        message: `Juego terminado. La palabra era: ${goodWord.word}`,
        class: "text-red-500 text-center",
      });
    }
  };

  const getNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    let counter = {};
    for (let letter of randomWord) {
      counter[letter] = (counter[letter] || 0) + 1;
    }
    setGoodWord({ word: randomWord, counter: counter });
    setAttempts([]);
    setCurrentAttempt("");
    setNewGame(false);

    setKeyboard((prev) => {
      const newKeyboard = { ...prev };
      Object.keys(newKeyboard).forEach((key) => {
        newKeyboard[key] = "";
      });
      return newKeyboard;
    });
    setMessage({ message: "", class: "" });
  };

  useEffect(() => {
    // Initialize the game state
    getNewGame();
  }, []);

  return (
    <>
      <section
        id={"game"}
        data-section={"game"}
        className={`flex flex-col content-center flex-1 max-w-screen`}
      >
        <h1 className="text-2xl font-bold text-center mb-4 mt-10 text-black dark:text-white">
          WORDLU INFINITE (ES)
        </h1>
        <p className={`h-8 ${message?.class}`}>{message?.message}</p>
        {/* grid */}
        <div className="grid grid-rows-6 grid-cols-5 gap-2 w-full max-w-lg mx-auto font-bold uppercase">
          {Array.from({ length: 30 }).map((_, idx) => {
            const row = Math.floor(idx / 5);
            const col = idx % 5;
            const value =
              row < attempts.length
                ? attempts[row][col]
                : row === attempts.length
                ? currentAttempt[col]
                : "";
            return (
              <span
                key={idx}
                className={`border-2 border-gray-900 aspect-square flex items-center justify-center text-center text-black dark:text-white text-[clamp(1.2rem,4vw,2.5rem)] ${
                  resultColors[row] ? `${resultColors[row][col]} flip` : ""
                }`}
              >
                {value ? value : ""}
              </span>
            );
          })}
        </div>
        {/* teclado */}
        {!newGame ? (
          <div className="grid gap-2 grid-cols-10 mt-4  w-full max-w-xl  mx-auto">
            {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
              (letter) => (
                <button
                  key={letter}
                  className={`bg-[#e4d8d8] text-black uppercase aspect-square min-h-8 ${
                    keyboard[letter] ? `${keyboard[letter]} flip` : ""
                  }`}
                  value={letter}
                  onClick={() => {
                    handleChange(letter);
                  }}
                >
                  {letter}
                </button>
              )
            )}
            {["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"].map(
              (letter) => (
                <button
                  key={letter}
                  className={`bg-[#e4d8d8] text-black uppercase aspect-square min-h-8 ${
                    keyboard[letter] ? `${keyboard[letter]} flip` : ""
                  }`}
                  onClick={() => {
                    handleChange(letter);
                  }}
                >
                  {letter}
                </button>
              )
            )}
            <button
              className="bg-[#e4d8d8] text-black uppercase"
              onClick={handleDelete}
            >
              Del
            </button>
            {["z", "x", "c", "v", "b", "n", "m"].map((letter) => (
              <button
                key={letter}
                className={`bg-[#e4d8d8] text-black uppercase aspect-square min-h-8 ${
                  keyboard[letter] ? `${keyboard[letter]} flip` : ""
                }`}
                onClick={() => {
                  handleChange(letter);
                }}
              >
                {letter}
              </button>
            ))}
            <button
              className="bg-[#e4d8d8] text-black uppercase col-span-2"
              onClick={handleEnter}
            >
              Enter
            </button>
          </div>
        ) : (
          <div className="text-center text-green-500 font-bold mt-4">
            <p>
              {" "}
              ¡Juego terminado! Haz click en "Nuevo Juego" para comenzar de
              nuevo.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={getNewGame}
            >
              Nuevo Juego
            </button>
          </div>
        )}
      </section>
    </>
  );
}
