import express from 'express';
import cors from 'cors';

const TODO_LIST_MOCKS = [
    {
        id: '1',
        title: 'Walk the dog',
    },
    {
        id: '2',
        title: 'Do the dishes',
    },
    {
        id: '3',
        title: 'Walk on the street',
    },
];

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/todolist/get-all-items', (_request, response) => {
    response.send(TODO_LIST_MOCKS);
});

app.post('/api/todolist/add-new-task', (request, response) => {
    console.log('/api/todolist/add-new-task POST', request.body);

    TODO_LIST_MOCKS.push(request.body);

    response.send();
});

app.delete('/api/todolist/delete-item/:id', (request, response) => {
    console.log('/api/todolist/delete-item DELETE', request.params.id);

    const index = TODO_LIST_MOCKS.findIndex((task) => {
        return task.id === request.params.id;
    });

    if (index !== -1) {
        TODO_LIST_MOCKS.splice(index, 1);

        response.send('Ok');
    } else {
        response.status(400).send('Error');
    }
});

app.put('/api/todolist/change-existing-task/:id', (request, response) => {
    console.log('/api/todolist/change-existing-task PUT', request.params.id);

    const index = TODO_LIST_MOCKS.findIndex((task) => {
        return task.id === request.params.id;
    });

    if (index !== -1) {
        TODO_LIST_MOCKS[index].title = request.body.title

        response.send('Ok');
    } else {
        response.status(400).send('Error');
    }
});

app.listen(8001, () => {
    console.log('Server is running');
});
