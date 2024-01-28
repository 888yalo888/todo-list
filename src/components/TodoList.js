import { Item } from './index';
import NewTodoItemForm from './NewTodoItemForm';
import { useEffect, useState } from 'react';
import { getItems } from '../store/api';

function TodoList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const items = await getItems();
            setItems(items);
        })();
    }, []);

    return (
        <div className="todolist">
            <NewTodoItemForm getItems={getItems} />

            <ul className="tasks">
                {items.map((item) => {
                    return (
                        <Item key={item._id} {...item} getItems={getItems} />
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;
