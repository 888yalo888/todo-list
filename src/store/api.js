import axios from 'axios';

export const getItems = async () => {
    const { data: items } = await axios.get(`tasks`);

    return items;
};

export const getUser = async () => {
    const { data: user } = await axios.get(`/users/current`); // destructure from response

    return user;
};

export const login = async (email, password) => {
    const { data: token } = await axios.post('auth/login', {
        email,
        password,
    });

    return token;
};

export const signup = async (email, password) => {
    const { data: token } = await axios.post('auth/signup', {
        email,
        password,
    });

    return token;
};
export const addItem = async (newItemTitle) => {
    const newItem = {
        title: newItemTitle,
    };
    await axios.post(`tasks`, newItem);
};

export const logOut = async () => {
    await axios.delete(`auth/logout`);
};

export const saveItem = async (newTitle, _id) => {
    const body = { title: newTitle };

    await axios.put(`tasks/${_id}`, body);
};

export const deleteItem = async (_id) => {
    await axios.delete(`tasks/${_id}`);
};
