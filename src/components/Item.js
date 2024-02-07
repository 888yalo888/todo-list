import './../App.scss';
import { useContext, useState } from 'react';
import { CloseIcon, DeleteIcon, EditIcon, SaveIcon } from './icons/icons';
import TodoListContext from '../TodoListContext';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Item = (props) => {
    const todo = useContext(TodoListContext);
    const { _id, title } = props;
    const [isEditable, setIsEditable] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const editHandler = () => {
        setIsEditable(true);
    };

    const cancelHandler = () => {
        setIsEditable(false);
    };

    return (
        <ListGroup.Item className="task d-flex flex-row justify-content-end border-top-0 border-end-0 border-start-0">
            {isEditable ? (
                <Form className="editTaskForm d-flex flex-row align-self-start w-100">
                    <Form.Control
                        className="title-input w-100"
                        value={newTitle}
                        onChange={(event) => {
                            setNewTitle(event.target.value);
                        }}
                    ></Form.Control>

                    <Button
                        className="icon btn bg-transparent border-0 "
                        type="submit"
                        onClick={(event) => {
                            event.preventDefault();
                            todo.saveEditedItemHandler(newTitle, _id);
                            setIsEditable(false);
                        }}
                    >
                        <SaveIcon />
                    </Button>

                    <Button
                        className="icon btn bg-transparent border-0"
                        onClick={cancelHandler}
                    >
                        <CloseIcon />
                    </Button>
                </Form>
            ) : (
                <div className="title-container w-100">{title}</div>
            )}

            <Button
                className="icon btn bg-transparent border-0"
                onClick={() => {
                    todo.deleteItemHandler(_id);
                }}
            >
                <DeleteIcon />
            </Button>

            <Button
                className="icon btn bg-transparent border-0"
                onClick={editHandler}
            >
                <EditIcon />
            </Button>
        </ListGroup.Item>
    );
};

export default Item;
