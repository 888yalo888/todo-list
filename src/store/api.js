import axios from 'axios';

export const getItems = async () => {
    const { data: items } = await axios.get(`api/todolist/tasks`);

    return items;
};

export const getUser = async () => {
    const { data: user } = await axios.get(`api/user`); // destructure from response

    return user;
};

export const login = async (email, password) => {
    const { data: token } = await axios.post('api/login', {
        email,
        password,
    });

    return token;
};

export const signup = async (email, password) => {
    const { data: token } = await axios.post('api/signup', {
        email,
        password,
    });

    return token;
};
export const addItem = async (newItemTitle) => {
    const newItem = {
        title: newItemTitle,
    };
    await axios.post(`api/todolist/add-new-task`, newItem);
};

export const logOut = async () => {
    await axios.delete(`api/logout`);
};

export const saveItem = async (newTitle, _id) => {
    const body = { title: newTitle };

    await axios.put(`api/todolist/change-existing-task/${_id}`, body);
};

export const deleteItem = async (_id) => {
    await axios.delete(`api/todolist/delete-item/${_id}`);
};
