 
import './App.css';
 import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Sidebar } from './components/sidebar/sidebar.js';
import { Navbar } from './components/navbar/navbar.js';
import { Add } from './pages/add/add.js';
import { List } from './pages/list/list.js';
import { Order } from './pages/order/order.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
 

function App() {
    const url = 'http://localhost:4000'
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
    <hr/>
    <div className='app-content'>
        
        <Router> 
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Order url={url}/>}/>
        </Routes>
        </Router>
    </div>
    </div>
  );
}

export default App;
