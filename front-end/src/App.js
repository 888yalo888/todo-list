import axios from 'axios';
import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Task from './component/Task';

function App() {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [items, setItems] = useState([]);

    // ===================   API

    // 1 version

    // const getAllItems = useCallback(async () => {
    //     const response = await fetch(
    //         'http://localhost:8001/api/todolist/get-all-items',
    //         {
    //             method: 'GET',
    //         }
    //     );

    //     const data = await response.json();

    //     console.log('new todo', response, data);

    //     setItems(data);
    // }, []);

    // const createTaskHandler = async (event) => {
    //     event.preventDefault();

    //     const newItem = { id: uuid(), newTaskTitle };

    //     await fetch('http://localhost:8001/api/todolist/add-new-task', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newItem),
    //     });

    //     await getAllItems();

    //     setNewTaskTitle('');
    // };

    // const deleteHandler = async (id) => {
    //     await fetch(`http://localhost:8001/api/todolist/delete-item/${id}`, {
    //         method: 'DELETE',
    //     });

    //     await getAllTasksItems();
    // };

    // const updateHandler = (id) => {
    //     return async () => {
    //         const newItem = { newTaskTitle: editableTaskName };

    //         await fetch(
    //             `http://localhost:8001/api/todolist/change-existing-task/${id}`,
    //             {
    //                 method: 'PUT',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify(newItem),
    //             }
    //         );

    //         await getAllTasksItems();

    //         setEditableItemId(null);
    //     };
    // };

    // 2 version

    const newItemTitleChange = ({ target: { value } }) => {
        setNewTaskTitle(value);
    };

    const getAllTasksItems = useCallback(async () => {
        const response = await axios.get(
            'http://localhost:8001/api/todolist/get-all-items'
        );

        console.log('new todo', response.data);

        setItems(response.data);
    }, []);

    const createTaskHandler = async (event) => {
        event.preventDefault();

        const newItem = { id: uuid(), newTaskTitle };

        await axios.post(
            'http://localhost:8001/api/todolist/add-new-task',
            newItem
        );

        await getAllTasksItems();

        setNewTaskTitle('');
    };

    //  ============= Handler functions

    useEffect(() => {
        getAllTasksItems();
    }, []);

    // useEffect(() => {
    //     console.log('Component was mounted');
    // }, []);

    // useEffect(() => {
    //     console.log('Component was updated newTaskTitle', items);
    // }, [items]);

    return (
        <div className="App">
            <div className="todolist">
                <form className='addTaksForm'>
                    <input
                        className="input"
                        value={newTaskTitle}
                        onChange={newItemTitleChange}
                        placeholder='Create a new task...'
                    />

                    <button type="submit" onClick={createTaskHandler}>
                        Add
                    </button>
                </form>

                <br />

                <ul className="tasks">
                    {items.map((item) => {
                        return (
                            <Task
                                key={item.id}
                                {...item}
                                refreshItems={getAllTasksItems}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
