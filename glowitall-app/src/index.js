import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';





const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Provider store={store}><App /></Provider>);


