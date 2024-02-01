import { useContext } from 'react';
import './App.scss';
import { LoginAndSignupPage, Header, TodoList } from './components/index';
import AuthContext from './AuthContext';
import { TodoListProvider } from './TodoListContext';

function App() {
    const auth = useContext(AuthContext);
    return (
        <div className="app">
            {!auth.user ? (
                <LoginAndSignupPage />
            ) : (
                <TodoListProvider>
                    <Header />
                    <TodoList />
                </TodoListProvider>
            )}
        </div>
    );
}

export default App;
