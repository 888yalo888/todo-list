import axios from 'axios';
import './App.scss';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { LoginAndSignupPage, Header, TodoList } from './components/index';
import { getUser } from './store/api';

// App

function App() {
    const [user, setUser] = useState(null);
    const [userIsLoading, setUserIsLoading] = useState(false);

    // const getUserHandler = useCallback(async () => {
    //     setUserIsLoading(true);

    //     // const { data: user } = await axios.get(`api/user`); // destructure from response

    //     const user = await getUser();

    //     setUser(user);
    //     setUserIsLoading(false);
    // }, []);

    const loadUser = useCallback(() => {
        //
        setUserIsLoading(true);
        (async () => {
            const user = await getUser();
            setUser(user);
        })();
    }, []);

    useEffect(() => {
        // зразу викликається цей юзефект, коли я завантажую сторінку

        const token = sessionStorage.getItem('token');
        if (token) {
            loadUser();
        }
    }, []);

    const onSuccessfulLogout = () => {
        setUser(null);
    };

    const onSuccess = () => {
        loadUser();
    };

    //if (userIsLoading) return null;

    return (
        <div className="app">
            {!user ? (
                <LoginAndSignupPage onTokenSuccessfullyEquired={onSuccess} />
            ) : (
                <>
                    <Header
                        userEmail={user?.email}
                        onSuccessfulLogout={onSuccessfulLogout}
                    />
                    <TodoList />
                </>
            )}
        </div>
    );
}

export default App;
