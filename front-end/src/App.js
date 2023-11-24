import axios from 'axios';
import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
    CloseIcon,
    DeleteIcon,
    EditIcon,
    SaveIcon,
} from './component/icons/icons';

//Component

const Item = (props) => {
    const { _id, title, getItems } = props;
    const [isEditable, setIsEditable] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const deleteHandler = async () => {
        await axios.delete(
            `http://localhost:8001/api/todolist/delete-item/${_id}`
        );

        await getItems();
    };

    const editHandler = () => {
        setIsEditable(true);
    };

    const saveHandler = async (event) => {
        event.preventDefault();
        const body = { title: newTitle };

        await axios.put(
            `http://localhost:8001/api/todolist/change-existing-task/${_id}`,
            body
        );

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

//App

function App() {
    const [items, setItems] = useState([]);
    const [newItemTitle, setNewItemTitle] = useState('');

    // Server request
    const getItems = async () => {
        const response = await axios.get(
            'http://localhost:8001/api/todolist/get-all-items'
        );

        //console.log(response);

        setItems(response.data);
    };

    useEffect(() => {
        getItems();
    }, []);

    //console.log(newItemTitle);

    //Handlers

    const addHandler = async (event) => {
        event.preventDefault();

        const newItem = {
            title: newItemTitle,
        };

        await axios.post(
            'http://localhost:8001/api/todolist/add-new-task',
            newItem
        );

        console.log(newItem);

        await getItems();

        setNewItemTitle('');
    };

    return (
        <div className="App">
            <div className="todolist">
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

                <ul className="tasks">
                    {items.map((item) => {
                        return (
                            <Item key={item._id} {...item} getItems={getItems} />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
