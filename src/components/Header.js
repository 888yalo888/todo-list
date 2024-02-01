import { useContext } from 'react';
import './../App.scss';
//import { deleteTokenAndLogOut } from './../store/api';
import AuthContext from './../AuthContext';

function Header() {
    const auth = useContext(AuthContext);
    return (
        <div className="userInfo">
            <div className="email">{auth.user.email}</div>
            <button type="submit" onClick={auth.logout}>
                Log out
            </button>
        </div>
    );
}

export default Header;
