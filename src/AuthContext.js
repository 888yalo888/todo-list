import { createContext, useCallback, useEffect, useState } from 'react';
import { getUser } from './store/api';
import { delay } from './delay';
import axios from 'axios';
import { login, logOut, signup } from './store/api';

const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    const [userIsLoading, setUserIsLoading] = useState(false);
    const [error, setError] = useState();

    const loadUser = useCallback(() => {
        setUserIsLoading(true);

        (async () => {
            try {
                await delay(2000);
                const user = await getUser();
                setUser(user);
            } catch (error) {
                console.log(error);
            } finally {
                setUserIsLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            loadUser();
        }
    }, []);

    const setSession = async (token) => {
        try {
            sessionStorage.setItem('token', token);

            axios.defaults.headers.token = token;

            loadUser();
        } catch (error) {
            const errorText = error.response.data;

            setError(errorText);

            console.log('error', errorText);
        }
    };

    const loginHandler = async (email, password) => {
        try {
            const token = await login(email, password);

            await setSession(token);
        } catch (error) {
            const errorText = error.response.data;

            setError(errorText);
        }
    };

    const signupHandler = async (email, password) => {
        try {
            const token = await signup(email, password);

            await setSession(token);
        } catch (error) {
            const errorText = error.response.data;

            setError(errorText);
        }
    };

    const logout = async () => {
        await logOut();
        sessionStorage.removeItem('token');
        axios.defaults.headers.token = null;

        setUser(null);
    };

    if (userIsLoading) return <h1>user is loading</h1>;

    return (
        <AuthContext.Provider
            value={{
                user,
                userIsLoading,
                loginHandler,
                logout,
                signupHandler,
                error,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
