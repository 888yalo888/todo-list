import axios from 'axios';
import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import {
    CloseIcon,
    DeleteIcon,
    EditIcon,
    SaveIcon,
} from './component/icons/icons';

//let tokenStored = null;

// Component

console.log('process.env', process.env, axios.defaults);

const Item = (props) => {
    const { _id, title, getItems } = props;
    const [isEditable, setIsEditable] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const deleteHandler = async () => {
        await axios.delete(`api/todolist/delete-item/${_id}`, {
            headers: {
                token: sessionStorage.getItem('token'),
            },
        });

        await getItems();
    };

    const editHandler = () => {
        setIsEditable(true);
    };

    const saveHandler = async (event) => {
        event.preventDefault();

        const body = { title: newTitle };

        await axios.put(`api/todolist/change-existing-task/${_id}`, body, {
            headers: {
                token: sessionStorage.getItem('token'),
            },
        });

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
    const [newEmail, setNewEmail] = useState('olga@gmail.com');
    const [newPassword, setNewPassword] = useState('12345');
    const [user, setUser] = useState();

    // Server request
    const getItems = useCallback(async () => {
        const { data: items } = await axios.get(`api/todolist/get-all-items`, {
            headers: {
                token: sessionStorage.getItem('token'),
            },
        });
        //const items = response.data;

        setItems(items);
    }, []);

    const getUserHandler = async () => {
        const { data: user } = await axios.get(`api/user`, {
            headers: {
                token: sessionStorage.getItem('token'),
            },
        });

        setUser(user);
    };

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getUserHandler();

            getItems();
        }
    }, []);

    //console.log(newItemTitle);

    //Handlers

    const addHandler = async (event) => {
        event.preventDefault();

        const newItem = {
            title: newItemTitle,
        };

        await axios.post(`api/todolist/add-new-task`, newItem, {
            headers: {
                token: sessionStorage.getItem('token'),
            },
        });

        console.log(newItem);

        await getItems();

        setNewItemTitle('');
    };

    // Login logic

    // getting a token

    const loginHandler = async (event) => {
        event.preventDefault();

        const loginData = {
            email: newEmail,
            password: newPassword,
        };

        // const response = await axios.post(`api/login`, loginData);
        // const token = response.data; // response from server with token

        const { data: token } = await axios.post(`api/login`, loginData);

        sessionStorage.setItem('token', token);

        console.log('token', token);

        //tokenStored = token;

        // user data request

        getUserHandler();

        getItems();
    };

    return (
        <div className="app">
            {user ? (
                <>
                    <div className="userInfo">{user?.email}</div>
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
                                    <Item
                                        key={item._id}
                                        {...item}
                                        getItems={getItems}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </>
            ) : (
                <form className="loginForm" onSubmit={loginHandler}>
                    <input
                        onChange={(event) => {
                            setNewEmail(event.target.value);
                        }}
                        value={newEmail}
                        type="text"
                        placeholder="Enter your email..."
                    />
                    <input
                        onChange={(event) => {
                            setNewPassword(event.target.value);
                        }}
                        value={newPassword}
                        type="password"
                        placeholder="Enter your password..."
                    />

                    <button type="submit">Log in</button>
                </form>
            )}
        </div>
    );
}

export default App;
