import Home from "./routes/Home";
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Redirect from "./routes/Redirect";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/redirect" element={<Redirect/>} />
      </Routes>
    </Router>
  );
}

export default App;
