import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Homepage from "./pages/HomeScreen.jsx";
import Home from "./pages/Home.js";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pagenotfound from "./pages/Pagenotfound";
import Createproduct from "./Createproduct.js";
import Alldata from "./Alldata.js";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './pages/PrivateRoute.jsx';
import Cart from './Cart.js';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/all" element={<Homepage />} /> */}
          
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/alldata" element={<Alldata/>} />
          <Route path="/addproduct" element={<Createproduct/>} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path='' element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
