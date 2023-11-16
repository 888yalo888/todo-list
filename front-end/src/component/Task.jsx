import axios from 'axios';
import { useState } from 'react';

const Task = (props) => {
    const { id, title, getAllTasksItems } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editableTaskName, setEditableTaskName] = useState();

    const deleteHandler = async () => {
        await axios.delete(
            `http://localhost:8001/api/todolist/delete-item/${id}`
        );

        await getAllTasksItems();
    };

    const updateHandler = async (event) => {
        event.preventDefault();

        const newItem = { title: editableTaskName };

        await axios.put(
            `http://localhost:8001/api/todolist/change-existing-task/${id}`,
            newItem
        );

        await getAllTasksItems();

        setIsEditing(null);
    };

    const editHandler = () => {
        setIsEditing(id);

        setEditableTaskName(title);
    };

    const changeHandler = (event) => {
        setEditableTaskName(event.target.value);
    };

    const cancelHandler = () => {
        setIsEditing(null);
    };

    return (
        <li className='task'>
            {isEditing ? (
                <form>
                    <input value={editableTaskName} onChange={changeHandler} />

                    <button type="submit" onClick={updateHandler}>
                        save
                    </button>

                    <button onClick={cancelHandler}>cancel</button>
                </form>
            ) : (
                title
            )}

            {isEditing ? null : (
                <button onClick={editHandler}>✎</button>
            )}

            <button
                onClick={deleteHandler}
            >
                X
            </button>
        </li>
    );
};

export default Task;
