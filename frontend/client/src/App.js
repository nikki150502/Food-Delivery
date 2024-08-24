import './App.css';
import { Navbar } from './comoponents/navbar/navbar.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import {Footer} from  './comoponents/footer/footer.js'
 
import { PlaceOrder} from './pages/placeholder/placeOrder.js';
import {AppDownload} from "./comoponents/appDownload/appDownload.js"
import { useState } from 'react';
import { Login } from './comoponents/login/login.js';
import { Verify } from './pages/verify/verify.js';
 

function App() {
const [showLogin, setShowLogin] = useState("")

  return (
    <>

    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
      <div className="App">
         
        <Router>
        <Navbar setShowLogin={setShowLogin}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path='/verify' element={<Verify/>}/>
             
          </Routes>
        </Router>
      </div>
    
      <AppDownload/>
      <Footer />
      
    </>
  );
}

export default App;
