import axios from 'axios';
import { useState } from 'react';
import { CloseIcon, DeleteIcon, EditIcon, SaveIcon } from './icons/icons';

const Task = (props) => {
    const { id, title, refreshItems } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editableTaskName, setEditableTaskName] = useState(title);

    const deleteHandler = async () => {
        await axios.delete(
            `http://localhost:8001/api/todolist/delete-item/${id}`
        );

        await refreshItems();
    };

    const saveHandler = async (event) => {
        event.preventDefault();

        const newItem = { title: editableTaskName };

        await axios.put(
            `http://localhost:8001/api/todolist/change-existing-task/${id}`,
            newItem
        );

        await refreshItems();

        setIsEditing(null);
    };

    const editHandler = () => {
        setIsEditing(true);
    };

    const changeHandler = (event) => {
        setEditableTaskName(event.target.value);
    };

    const cancelHandler = () => {
        setIsEditing(null);
    };

    return (
        <li className="task">
            {isEditing ? (
                <form className="editTaskForm">
                    <input
                        value={editableTaskName}
                        onChange={changeHandler}
                        onBlur={saveHandler}
                    />

                    <button
                        className="icon"
                        type="submit"
                        onClick={saveHandler}
                    >
                        <SaveIcon />
                    </button>

                    <button className="icon" onClick={cancelHandler}>
                        <CloseIcon />
                    </button>
                </form>
            ) : (
                <p className="title">{title}</p>
            )}

            {isEditing ? null : (
                <button className="icon" onClick={editHandler}>
                    <EditIcon />
                </button>
            )}

            <button className="icon" onClick={deleteHandler}>
                <DeleteIcon />
            </button>
        </li>
    );
};

export default Task;
