import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import rootSaga from './store/sagas'
import { store, persistor, sagaMiddleware } from './store';
import { PersistGate } from 'redux-persist/integration/react';

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
                <ToastContainer />
            </PersistGate>
        </Provider>
    </BrowserRouter>, document.getElementById('root')
);

// const app = (
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//             <ToastContainer />
//         </BrowserRouter>
//     </Provider>
// );

// ReactDOM.render(app, document.getElementById('root'));
// serviceWorker.unregister();
