import { Item } from './index';
import NewTodoItemForm from './NewTodoItemForm';
import { useContext } from 'react';
import TodoListContext from '../TodoListContext';
import ListGroup from 'react-bootstrap/ListGroup';

function TodoList() {
    const todo = useContext(TodoListContext);

    return (
        <div className="todolist d-flex flex-column mx-auto">
            <NewTodoItemForm />

            <ListGroup className="tasks-container">
                {todo.items?.map((item) => {
                    return <Item key={item._id} {...item} />;
                })}
            </ListGroup>
        </div>
    );
}

export default TodoList;
