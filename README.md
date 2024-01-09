# To-Do App with JavaScript React Node.js/Express and MongoDB/Mongoose

## A fully functional To-Do App with regestration/varification form so you can create your own account.

This is my first project where I incorporated my knoledge of **front-end** and **back-end** and connected them together.

<div style="color:#c5f015">This fully functional To-Do App lets you:</div>

-   **_on front-end:_**

    -   go to https://todo-list-front-end-yxgf.onrender.com/
    -   create your own account
    -   create, edit and delete your todos
    -   log-in/log-out

-   **_on back-end:_**

    -   create this user in the database (I used <span style="color:yellow">Studio 3T as a MongoDB GUI</span>)
    -   create a token for security that is saved in <span style="color:yellow">Session storage</span> and in the database
    -   create, edits and deletes tasks from database
        ![database](./database-collection.JPG)
    -   provide log-in/log-out logic

## Installation

No installation needed because the app is hosted on free hosting website
https://render.com and the database is hosted on https://cloud.mongodb.com

## Running

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
