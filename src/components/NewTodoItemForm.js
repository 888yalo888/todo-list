import { useContext, useState } from 'react';
import TodoListContext from '../TodoListContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function NewTodoItemForm() {
    const todo = useContext(TodoListContext);

    const [newItemTitle, setNewItemTitle] = useState();

    return (
        <Form className="addTaskForm d-flex flex-row">
            <Form.Control
                className="input"
                value={newItemTitle}
                onChange={(event) => {
                    setNewItemTitle(event.target.value);
                }}
            ></Form.Control>

            <Button
                className="todo-form-button"
                type="submit"
                onClick={(event) => {
                    event.preventDefault();
                    todo.addItemHandler(newItemTitle);
                    setNewItemTitle('');
                }}
            >
                Add
            </Button>
        </Form>
    );
}

export default NewTodoItemForm;
