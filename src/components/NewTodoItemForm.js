import axios from 'axios';
import { useState } from 'react';

export function NewTodoItemForm({ getItems }) {
    const [newItemTitle, setNewItemTitle] = useState();

    const addHandler = async (event) => {
        event.preventDefault();

        const newItem = {
            title: newItemTitle,
        };

        await axios.post(`api/todolist/add-new-task`, newItem);

        setNewItemTitle('');

        getItems();
    };

    return (
        <form className="addTaskForm">
            <input
                className="input"
                value={newItemTitle}
                onChange={(event) => {
                    setNewItemTitle(event.target.value);
                }}
            ></input>

            <button type="submit" onClick={addHandler}>
                Add
            </button>
        </form>
    );
}

export default NewTodoItemForm;
