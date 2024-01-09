import axios from 'axios';
import './App.scss';
import { useState } from 'react';
import {
    CloseIcon,
    DeleteIcon,
    EditIcon,
    SaveIcon,
} from './components/icons/icons';

const Item = (props) => {
    const { _id, title, getItems } = props;
    const [isEditable, setIsEditable] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const deleteHandler = async () => {
        await axios.delete(`api/todolist/delete-item/${_id}`);

        await getItems();
    };

    const editHandler = () => {
        setIsEditable(true);
    };

    const saveHandler = async (event) => {
        event.preventDefault();

        const body = { title: newTitle };

        await axios.put(`api/todolist/change-existing-task/${_id}`, body);

        setIsEditable(false);

        await getItems();
    };

    const cancelHandler = () => {
        setIsEditable(false);
    };

    return (
        <li className="task">
            {isEditable ? (
                <form className="editTaskForm">
                    <input
                        value={newTitle}
                        onChange={(event) => {
                            setNewTitle(event.target.value);
                        }}
                    ></input>

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
                title
            )}

            <button className="icon" onClick={deleteHandler}>
                <DeleteIcon />
            </button>

            <button className="icon" onClick={editHandler}>
                <EditIcon />
            </button>
        </li>
    );
};

export default Item;
