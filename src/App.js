import './App.css';
import Home from './components/home';
import Admin from './components/admin';
import Stats from './components/stats';
import {Route,Routes} from 'react-router-dom'
import TopNav from './components/topNav';

function App() {
  return (
    <div>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/stats" element={<Stats />}/>
      </Routes>
    </div>

  );
}

export default App;
