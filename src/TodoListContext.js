import { createContext, useCallback, useEffect, useState } from 'react';
import { getItems, addItem, deleteItem, saveItem } from './store/api';

const TodoListContext = createContext();

export function TodoListProvider(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            await updateItemsHandler();
        })();
    }, []);

    const updateItemsHandler = useCallback(async () => {
        const items = await getItems(); // []
        setItems(items); // []
    }, []);

    const addItemHandler = useCallback(async (title) => {
        await addItem(title);

        updateItemsHandler();
    }, []);

    const deleteItemHandler = useCallback(async (id) => {
        await deleteItem(id);

        await updateItemsHandler();
    }, []);

    const saveEditedItemHandler = useCallback(async (title, id) => {
        await saveItem(title, id);

        await updateItemsHandler();
    }, []);

    return (
        <TodoListContext.Provider
            value={{
                items,
                addItemHandler,
                deleteItemHandler,
                saveEditedItemHandler,
            }}
        >
            {props.children}
        </TodoListContext.Provider>
    );
}

export default TodoListContext;
