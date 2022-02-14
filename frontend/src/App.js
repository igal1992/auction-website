import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home';
import Auction from './components/auction';
import TopNav from './components/topNav';
import Admin from './components/admin';
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auction" element={<Auction />}/>
        <Route path='/admin' element={<Admin />}/>
      </Routes>
    </div>

  );
}

export default App;
