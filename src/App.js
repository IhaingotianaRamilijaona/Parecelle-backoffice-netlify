import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import  TerrainNonValide from './pages/TerrainNonValide';
import Cultures from './pages/Cultures';
import CultureFormulaire from './pages/CultureFormulaire';
import Login from './pages/Login';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/terrain-nonValide" element={< TerrainNonValide />} />    
            <Route path="/cultures" element={< Cultures />} />   
            <Route path="/" element={< Login />} />    
        </Routes>
    </Router>
  );
}

export default App;
