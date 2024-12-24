// Importing React and ReactDOM to render the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the main App component and global styles
import App from './App.jsx';
import './index.css';

// Importing the Provider component from react-redux to connect Redux with React
import { Provider } from 'react-redux';

// Importing the Redux store created in store.js
import store from './store.js';

// Rendering the React application and wrapping it with the Provider component
// The Provider component enables the Redux store to be accessible throughout the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);