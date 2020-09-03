import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [book, setBook] = useState([]);
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  const showPersonsList = async () => {
    const { data } = await axios.get("/api/persons");
    setBook(data);
  };

  useEffect(() => {
    showPersonsList();
  }, []);

  const handleDelete = (e) => {
    axios.delete(`/api/persons/${e.target.id}`);
    showPersonsList();
  };

  const handleSubmit = async () => {
    const inputArr = document.querySelectorAll("input");
    inputArr.forEach((input) => (input.value = ""));
    const { data } = await axios.get("/api/persons");
    const exist = data.find((person) => person.name === name);
    exist
      ? await axios.put(`/api/persons/${exist.id}`, {
          name,
          number,
        })
      : await axios.post("/api/persons", {
          name,
          number,
        });
    showPersonsList();
  };

  return (
    <div className="App">
      <h1>Phone Book</h1>
      <ul>
        {book.map((item) => (
          <li>
            {item.name} {item.number}{" "}
            <button id={item.id} onClick={handleDelete}>
              delete
            </button>
          </li>
        ))}
      </ul>

      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name..."
      />
      <input
        onChange={(e) => setNumber(e.target.value)}
        type="text"
        placeholder="Number..."
      />
      <button type="submit" onClick={() => handleSubmit()}>
        Submit
      </button>
    </div>
  );
}

export default App;
