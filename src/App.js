import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Content />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
