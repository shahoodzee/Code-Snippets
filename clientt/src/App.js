import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Auth from './pages/Auth';


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="/Post" element={<Post />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
