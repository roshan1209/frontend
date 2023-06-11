import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './index.css';
import App from './App';
import Insert from './Insert/Insert';
import Update from './Update/Update';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/insertpage' element={<Insert/>}/>
      <Route path='/updatepage/:ID' element={<Update/>}/>
    </Routes>
  </BrowserRouter>
);


