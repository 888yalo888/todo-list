import { createContext, useEffect, useState } from 'react';
import { getItems, addItem, deleteItem, saveItem } from './store/api';

const TodoListContext = createContext();

export function TodoListProvider(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            await updateItemsHandler();
        })();
    }, []);

    const updateItemsHandler = async () => {
        const items = await getItems(); // []
        setItems(items); // []
    };

    const addItemsHandler = async (newItemTitle) => {
        await addItem(newItemTitle);

        updateItemsHandler();
    };

    const deleteItemsHandler = async (_id) => {
        await deleteItem(_id);

        await updateItemsHandler();
    };

    const saveItemsHandler = async (newTitle, _id) => {
        await saveItem(newTitle, _id);

        await updateItemsHandler();
    };

    return (
        <TodoListContext.Provider
            value={{
                items,
                updateItemsHandler,
                addItemsHandler,
                deleteItemsHandler,
                saveItemsHandler,
            }}
        >
            {props.children}
        </TodoListContext.Provider>
    );
}

export default TodoListContext;
