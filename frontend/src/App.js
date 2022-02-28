import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home';
import Auction from './components/auction/auction';
import TopNav from './components/topNav';
import Admin from './components/admin/admin';
import MyAccount from './components/account/myAccount';
import {Route,Routes} from 'react-router-dom';
import React,{ useState } from 'react';


function App() {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auction" element={<Auction />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/myAccount' element={<MyAccount />}/>
      </Routes>
    </div>

  );
}

export default App;
