// Importa las bibliotecas necesarias
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';

// Crea un punto de entrada para la aplicación y renderiza la aplicación dentro del proveedor de Redux
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación envuelta en React.StrictMode para activar el modo estricto de React
root.render(
  <React.StrictMode>
    {/* Utiliza el componente Provider de react-redux para envolver toda la aplicación */}
    <Provider store={store}>
      {/* Renderiza el componente principal de la aplicación */}
      <App />
    </Provider>
  </React.StrictMode>
);