//import axios from 'axios';
import { useContext, useState } from 'react';
import AuthContext from './../AuthContext';

//let tokenStored = null;
// Component
function LoginAndSignupPage() {
    const auth = useContext(AuthContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <div className="formContainer">
            <form
                className="loginForm"
                onSubmit={(event) => {
                    event.preventDefault();
                    auth.loginHandler(email, password);
                }}
            >
                <input
                    className={auth.error ? 'error' : undefined}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    value={email}
                    type="text"
                    placeholder="Enter your email..."
                />

                <input
                    className={auth.error ? 'error' : undefined}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    value={password}
                    type="password"
                    placeholder="Enter your password..."
                />

                <button type="submit">Log in</button>
            </form>

            <form
                className="signupForm"
                onSubmit={(event) => {
                    event.preventDefault();
                    auth.signupHandler(email, password);
                }}
            >
                <div className="or">or</div>
                <button type="submit">Sign up</button>
            </form>

            {auth.error && <div className="globalError">{auth.error}</div>}
        </div>
    );
}

export default LoginAndSignupPage;
