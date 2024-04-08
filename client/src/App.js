
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Banner from './Banner';
import Dashboard from './Dashboard/Dashboard';
import About from './About';
import Contact from './Contact';




function App() {
  return (
  <BrowserRouter>
  
  <Banner/>
  <Routes>
  
  <Route exact path="/register" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/home" element={<Home/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/contact" element={<Contact/>}/>
  </Routes>
  
  </BrowserRouter>
  )
}


export default App;
