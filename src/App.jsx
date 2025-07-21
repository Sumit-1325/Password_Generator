import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const PasswordRef = useRef(null);

  const copyPasswordToClickboard = () => {
    PasswordRef.current.select();
    navigator.clipboard.writeText(password);
  };

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPassword(password);
  }, [numberAllowed, charAllowed, length, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, charAllowed, length, passwordGenerator]);

  return (
    <div className="w-fit mx-auto shadow-md rounded-lg px-4 py-6 my-10 text-2xl text-orange-500 bg-gray-500">
      <p className="text-white text-4xl text-center mb-4">Password Generator</p>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 w-content">
        <input
          type="text"
          value={password}
          placeholder="Password"
          className="outline-none w-full py-1 px-3 bg-amber-50 text-blue-900"
          readOnly
          ref={PasswordRef}
        />
        <button
          className="outline-none bg-blue-400 text-white px-3 py-1 shrink-0 rounded hover:bg-blue-600 active:bg-blue-700"
          onClick={copyPasswordToClickboard}
        >
          Copy
        </button>
      </div>

      <div className="flex text-white mb-4">
        <div className="flex items-center mr-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center mx-2"></div>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label htmlFor="numberInput">Numbers</label>
        <div className="flex items-center mx-2">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
