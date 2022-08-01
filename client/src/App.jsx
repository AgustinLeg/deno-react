import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [colors, setColors] = useState(["aa"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const [errorInput, setErrorInput] = useState(false);

  useEffect(() => {
    const getColors = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const { data } = await axios.get("http://localhost:8080/api/colors");
        setColors(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getColors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.length) return;
    try {
      const body = { color: input };
      await axios.post(
        "http://localhost:8080/api/colors",
        JSON.stringify(body)
      );
      setColors([...colors, input]);
    } catch (error) {
      setErrorInput(true);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <h1>Nuevo Color</h1>
        <input
          type="text"
          className="input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setErrorInput(false);
          }}
        />
        {errorInput && (
          <span>Ups! no se pudo agregar este color, intenta con otro</span>
        )}
        <button type="submit">Agregar color</button>
      </form>
      <div>
        <h1>Lista de colores</h1>
        {isLoading && !error && <span>Cargando...</span>}
        {error && <p>Hay un error al obtener los colores</p>}
        <ul className="lista">
          {!colors.length && (
            <span>No hay colores, comienza agregando uno!</span>
          )}
          {!error &&
            colors.map((color) => (
              <li key={color} style={{ color }} className="color">
                {color}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
