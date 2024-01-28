import axios from 'axios';
import './../App.scss';

function Header({ userEmail, onSuccessfulLogout }) {
    const onLogout = async () => {
        sessionStorage.removeItem('token');

        await axios.delete(`api/logout`);
        onSuccessfulLogout();
    };
    return (
        <div className="userInfo">
            <div className="email">{userEmail}</div>
            <button type="submit" onClick={onLogout}>
                Log out
            </button>
        </div>
    );
}

export default Header;
