import axios from 'axios';

export const getItems = async () => {
    const { data: items } = await axios.get(`api/todolist/tasks`);

    return items;
};

export const getUser = async () => {
    const { data: user } = await axios.get(`api/user`); // destructure from response

    return user;
};

export const addItem = async (newItemTitle) => {
    const newItem = {
        title: newItemTitle,
    };
    await axios.post(`api/todolist/add-new-task`, newItem);
};
