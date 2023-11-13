import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

function App() {
    const [title, setTitle] = useState('');
    const [items, setItems] = useState([]);
    const [editableItemId, setEditableItemId] = useState(null);
    const [editableTaskName, setEditableTaskName] = useState();

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

    const editHandler = (id, title) => {
        return () => {
            setEditableItemId(id);

            setEditableTaskName(title);
        };
    };

    useEffect(() => {
        getData();
    }, []);

    const newItemTitleChange = ({ target: { value } }) => {
        setTitle(value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const newItem = { id: uuid(), title };

        await fetch('http://localhost:8001/api/todolist/add-new-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        });

        await getData();

        setTitle('');
    };

    const deleteHandler = async (id) => {
        await fetch(`http://localhost:8001/api/todolist/delete-item/${id}`, {
            method: 'DELETE',
        });

        await getData();
    };

    const changeHandler = (event) => {
        setEditableTaskName(event.target.value);
    };

    const saveHandler = (id) => {
        return async () => {
            const newItem = { title: editableTaskName };

            await fetch(
                `http://localhost:8001/api/todolist/change-existing-task/${id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem),
                }
            );

            await getData();

            setEditableItemId(null);
        };
    };

    const cancelHandler = () => {
        setEditableItemId(null);
    };

    // useEffect(() => {
    //     console.log('Component was mounted');
    // }, []);

    // useEffect(() => {
    //     console.log('Component was updated title', items);
    // }, [items]);

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
                    const isEditing = editableItemId === item.id;

                    return (
                        <li key={item.id}>
                            {isEditing ? (
                                <>
                                    <input
                                        value={editableTaskName}
                                        onChange={changeHandler}
                                    />

                                    <button onClick={saveHandler(item.id)}>
                                        save
                                    </button>

                                    <button onClick={cancelHandler}>
                                        cancel
                                    </button>
                                </>
                            ) : (
                                item.title
                            )}

                            {isEditing ? null : (
                                <button
                                    onClick={editHandler(item.id, item.title)}
                                >
                                    ✎
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    deleteHandler(item.id);
                                }}
                            >
                                X
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;
