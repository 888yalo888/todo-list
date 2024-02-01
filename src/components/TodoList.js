import { Item } from './index';
import NewTodoItemForm from './NewTodoItemForm';
import { useContext } from 'react';
import TodoListContext from '../TodoListContext';

function TodoList() {
    const todo = useContext(TodoListContext);

    return (
        <div className="todolist">
            <NewTodoItemForm />

            <ul className="tasks">
                {todo.items?.map((item) => {
                    return <Item key={item._id} {...item} />;
                })}
            </ul>
        </div>
    );
}

export default TodoList;
