import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

function App() {
    const [title, setTitle] = useState('');
    const [items, setItems] = useState([]);

    const getData = useCallback(async () => {
        const response = await fetch(
            'http://localhost:8001/api/todolist/get-all-items',
            {
                method: 'GET',
            }
        );

        const data = await response.json();
        console.log('new todo', response, data);

        setItems(data);
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const newItemTitleChange = ({ target: { value } }) => {
        setTitle(value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const newItem = { id: uuid(), title };

        await fetch(
            'http://localhost:8001/api/todolist/add-new-task',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            }
        );

        await getData();

        setTitle('');
    };

    const deleteHandler = async (id) => {
        await fetch(
            'http://localhost:8001/api/todolist/delete-item',
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            }
        );
      
      await getData();
    };

    useEffect(() => {
        console.log('Component was mounted');
    }, []);

    useEffect(() => {
        console.log('Component was updated title', items);
    }, [items]);

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
                    return (
                        <li key={item.id}>
                            {item.title}
                            <button
                                onClick={() => {
                                    deleteHandler(item.id);
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;
