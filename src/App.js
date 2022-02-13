import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home';
import Auction from './components/auction';
import {Route,Routes} from 'react-router-dom'
import TopNav from './components/topNav';

function App() {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auction" element={<Auction />}/>
      </Routes>
    </div>

  );
}

export default App;
