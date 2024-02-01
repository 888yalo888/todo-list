import { createContext, useCallback, useEffect, useState } from 'react';
import { delay } from './delay';
import axios from 'axios';
import { getItems, addItem, deleteItem, saveItem } from './store/api';

const TodoListContext = createContext();

export function TodoListProvider(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            await updateItems();
        })();
    }, []);

    const updateItems = async () => {
        const items = await getItems(); // []
        setItems(items); // []
    };

    const addHandler = async (newItemTitle) => {
        await addItem(newItemTitle);

        updateItems();
    };

    const deleteHandler = async (_id) => {
        await deleteItem(_id);

        await updateItems();
    };

    const saveHandler = async (newTitle, _id) => {
        await saveItem(newTitle, _id);

        await updateItems();
    };

    return (
        <TodoListContext.Provider
            value={{
                updateItems,
                addHandler,
                items,
                deleteHandler,
                saveHandler,
            }}
        >
            {props.children}
        </TodoListContext.Provider>
    );
}

export default TodoListContext;
