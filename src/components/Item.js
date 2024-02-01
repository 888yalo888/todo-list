import './../App.scss';
import { useContext, useState } from 'react';
import { CloseIcon, DeleteIcon, EditIcon, SaveIcon } from './icons/icons';
import { saveItem, deleteItem } from './../store/api';
import TodoListContext from '../TodoListContext';

const Item = (props) => {
    const todo = useContext(TodoListContext);
    const { _id, title } = props;
    const [isEditable, setIsEditable] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const editHandler = () => {
        setIsEditable(true);
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
                        onClick={(event) => {
                            event.preventDefault();
                            todo.saveItemsHandler(newTitle, _id);
                            setIsEditable(false);
                        }}
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

            <button
                className="icon"
                onClick={() => {
                    todo.deleteItemsHandler(_id);
                }}
            >
                <DeleteIcon />
            </button>

            <button className="icon" onClick={editHandler}>
                <EditIcon />
            </button>
        </li>
    );
};

export default Item;
