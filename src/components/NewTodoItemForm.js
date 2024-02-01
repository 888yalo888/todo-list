import { useContext, useState } from 'react';
import TodoListContext from '../TodoListContext';

export function NewTodoItemForm({ onItemAdded }) {
    const todo = useContext(TodoListContext);

    const [newItemTitle, setNewItemTitle] = useState();

    return (
        <form className="addTaskForm">
            <input
                className="input"
                value={newItemTitle}
                onChange={(event) => {
                    setNewItemTitle(event.target.value);
                }}
            ></input>

            <button
                type="submit"
                onClick={(event) => {
                    event.preventDefault();
                    todo.addItemsHandler(newItemTitle);
                    setNewItemTitle('');
                }}
            >
                Add
            </button>
        </form>
    );
}

export default NewTodoItemForm;
