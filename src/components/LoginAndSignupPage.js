import axios from 'axios';
import { useState } from 'react';

//let tokenStored = null;
// Component
function LoginAndSignupPage({ onTokenSuccessfullyEquired }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const getUserTokenAndSetSession = async (endpoint) => {
        try {
            const { data: token } = await axios.post(endpoint, {
                email,
                password,
            });

            sessionStorage.setItem('token', token);

            axios.defaults.headers.token = token;

            onTokenSuccessfullyEquired();
        } catch (error) {
            //const { response: { data: errorText }, } = error;
            const errorText = error.response.data;

            setError(errorText);

            console.log('error', errorText);
        }
    };

    const loginHandler = async (event) => {
        event.preventDefault();

        await getUserTokenAndSetSession('api/login');
    };

    const signupHandler = async (event) => {
        event.preventDefault();

        await getUserTokenAndSetSession('api/signup');
    };

    return (
        <div className="formContainer">
            <form className="loginForm" onSubmit={loginHandler}>
                <input
                    className={error ? 'error' : undefined}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    value={email}
                    type="text"
                    placeholder="Enter your email..."
                />

                <input
                    className={error ? 'error' : undefined}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    value={password}
                    type="password"
                    placeholder="Enter your password..."
                />

                <button type="submit">Log in</button>
            </form>

            <form className="signupForm" onSubmit={signupHandler}>
                <div className="or">or</div>
                <button type="submit">Sign up</button>
            </form>

            {error && <div className="globalError">{error}</div>}
        </div>
    );
}

export default LoginAndSignupPage;
