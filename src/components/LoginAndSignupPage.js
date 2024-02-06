import { useContext, useState } from 'react';
import '../App.scss';
import AuthContext from './../AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//let tokenStored = null;
// Component
function LoginAndSignupPage() {
    const auth = useContext(AuthContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <div className="login-signup-container d-flex">
            <div className="formContainer d-flex justify-content-center align-items-center">
                <Form className="login-form d-flex flex-column w-100">
                    <Form.Control
                        className={auth.error ? ' is-invalid' : undefined}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                        type="text"
                        placeholder="Enter your email..."
                    />

                    <Form.Control
                        className={auth.error ? 'is-invalid' : undefined}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        value={password}
                        type="password"
                        placeholder="Enter your password..."
                    />
                    <div className="submit-buttons d-flex flex-column justify-content-between">
                        <Button
                            onClick={(event) => {
                                event.preventDefault();
                                auth.loginHandler(email, password);
                            }}
                        >
                            Log in
                        </Button>

                        <div className="or d-flex align-self-center">or</div>
                        <Button
                            variant="secondary"
                            onClick={(event) => {
                                event.preventDefault();
                                auth.signupHandler(email, password);
                            }}
                        >
                            Sign up
                        </Button>
                    </div>
                    {auth.error && (
                        <div className="globalError text-danger">
                            {auth.error}
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}

export default LoginAndSignupPage;
