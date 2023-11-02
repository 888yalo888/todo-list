import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const TODO_LIST_MOCKS = [
  {
    id: 1,
    title: "Walk the dog",
  },
  {
    id: 2,
    title: "Do the dishes",
  },
];

function App() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState(TODO_LIST_MOCKS);

  const newItemTitleChange = ({ target: { value } }) => {
    setTitle(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newItem = { id: uuid(), title };

    setItems([...items, newItem]);
  };

  return (
    <div className="App">
      <form>
        <input value={title} onChange={newItemTitleChange} />
        <button type="submit" onClick={submitHandler}>
          Add
        </button>
      </form>

      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
