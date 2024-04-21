
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Register/Signup';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login/Login';
import Banner from './Banner';
import Dashboard from './Dashboard/Dashboard';
import Contact from './Contact';
import Rides from './Rides/Rides';
import Home from './Home';
import Technicians from './Technicians/Technicians';










function App() {
  return (
  <BrowserRouter>
  
  <Banner/>
  <Routes>
  
  <Route exact path="/register" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/home" element={<Home/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/rides" element={<Rides/>}/>
  <Route path="/technicians" element={<Technicians/>}/>
 
  
  

  
 
 
  

  
  </Routes>
  
  </BrowserRouter>
  )
}


export default App;
