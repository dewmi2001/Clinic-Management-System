import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';


import Register from './pages/Register';
import Profile from './pages/Profile';




import  Antd from 'antd';
import React from 'react';
import './stylesheets/alignments.css';
import './stylesheets/sizes.css';
import './stylesheets/theme.css';
import './stylesheets/customer-components.css'
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from "react-redux";
import Loader from "./components/Loader";


function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    
      <div>
        {loading && <Loader />}

  <BrowserRouter>
  <Routes>
    
    <Route exact path='/' element={<ProtectedRoute><Home /> </ProtectedRoute> }/>
    <Route exact path='/profile' element={<ProtectedRoute><Profile /> </ProtectedRoute> }/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
   
  
    

  </Routes>
  </BrowserRouter>
   
  

 </div>

  );
}

export default App;
