import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddContact from "./components/AddContact";
import AllContacts from './components/AllContacts';
import EditContact from "./components/EditContact";
import NotFound from './components/NotFound';
import NavBar from "./components/NavBar";

function App() {

  return (
    <BrowserRouter>
    <NavBar/>

    <Routes>
      <Route path = "/" element ={<AllContacts/>} />
      <Route path = "/add" element ={<AddContact/>} />
      <Route path = "/edit/:id" element ={<EditContact/>} />
      <Route path="*" element ={<NotFound/> } />

    </Routes>
    </BrowserRouter>
    
  )

}

export default App;