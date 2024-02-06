import { useContext } from 'react';
import './../App.scss';
//import { deleteTokenAndLogOut } from './../store/api';
import AuthContext from './../AuthContext';
import Button from 'react-bootstrap/Button';

function Header() {
    const auth = useContext(AuthContext);
    return (
        <div className="userInfo d-flex justify-content-end align-items-end align-self-end">
            <div className="email">{auth.user.email}</div>
            <Button type="submit" onClick={auth.logoutHandler}>
                Log out
            </Button>
        </div>
    );
}

export default Header;
