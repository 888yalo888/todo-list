import axios from 'axios';
import './App.scss';
import { useCallback, useLayoutEffect, useState } from 'react';
import Item from './Item';

//let tokenStored = null;

// Component

console.log('process.env', process.env, axios.defaults);

// App

function App() {
    const [items, setItems] = useState([]);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newEmail, setNewEmail] = useState();
    const [newPassword, setNewPassword] = useState();
    const [user, setUser] = useState(null);
    const [userIsLoading, setUserIsLoading] = useState(false);
    const [errorText, setErrorText] = useState();

    // Server request
    const getItems = useCallback(async () => {
        const { data: items } = await axios.get(`api/todolist/tasks`);
        //const items = response.data;

        setItems(items);
    }, []);

    const getUserHandler = useCallback(async () => {
        setUserIsLoading(true);

        const { data: user } = await axios.get(`api/user`); // destructure from response

        setUser(user);
        setUserIsLoading(false);
    }, []);

    useLayoutEffect(() => {
        const token = sessionStorage.getItem('token');

        if (token) {
            getUserHandler();

            getItems();
        }
    }, []);

    //Handlers

    const addHandler = async (event) => {
        event.preventDefault();

        const newItem = {
            title: newItemTitle,
        };

        setNewItemTitle(`Hi I'm a new title`);

        setNewItemTitle((newItemTitle) => 'Decription: ' + newItemTitle);

        await axios.post(`api/todolist/add-new-task`, newItem);

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

        try {
            const res = await axios.post('api/login', loginData);

            console.log('res.data.token', res.data, res);

            sessionStorage.setItem('token', res.data);

            axios.defaults.headers.token = res.data;

            getUserHandler();

            getItems();
        } catch (error) {
            const {
                response: { data: errorText },
            } = error;

            setErrorText(errorText);

            console.log('error', errorText);
        }
    };

    // Sign up logic

    const signupHandler = async (event) => {
        event.preventDefault();

        const loginData = {
            email: newEmail,
            password: newPassword,
        };

        // axios
        //     .post(`api/signup`, loginData)
        //     .then(({ data: token }) => {
        //         sessionStorage.setItem('token', token);

        //         axios.defaults.headers.token = sessionStorage.getItem('token');

        //         getUserHandler();

        //         getItems();
        //     })
        //     .catch((error) => {
        //         console.log('error', error);
        //     })
        //     .finally(() => {
        //         console.log('finally');
        //     });

        try {
            const { data: token } = await axios.post(`api/signup`, loginData);

            sessionStorage.setItem('token', token);

            axios.defaults.headers.token = sessionStorage.getItem('token');

            getUserHandler();

            getItems();
        } catch (error) {
            const {
                response: { data: errorText },
            } = error;

            setErrorText(errorText);

            console.log('error', errorText);
        } finally {
            console.log('finally');
        }
    };

    //Log out logic

    const logoutHandler = async () => {
        setUser(null);

        sessionStorage.removeItem('token');

        await axios.delete(`api/logout`);
    };

    if (userIsLoading) return null;

    return (
        <div className="app">
            {user ? (
                <>
                    <div className="userInfo">
                        <div className="email">{user?.email}</div>
                        <button type="submit" onClick={logoutHandler}>
                            Log out
                        </button>
                    </div>

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
                <div className="formContainer">
                    <form className="loginForm" onSubmit={loginHandler}>
                        <input
                            className={errorText ? 'error' : undefined}
                            onChange={(event) => {
                                setNewEmail(event.target.value);
                            }}
                            value={newEmail}
                            type="text"
                            placeholder="Enter your email..."
                        />

                        <input
                            className={errorText ? 'error' : undefined}
                            onChange={(event) => {
                                setNewPassword(event.target.value);
                            }}
                            value={newPassword}
                            type="password"
                            placeholder="Enter your password..."
                        />

                        <button type="submit">Log in</button>
                    </form>

                    <form className="signupForm" onSubmit={signupHandler}>
                        <div className="or">or</div>
                        <button type="submit">Sign up</button>
                    </form>

                    {errorText && (
                        <div className="globalError">{errorText}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
