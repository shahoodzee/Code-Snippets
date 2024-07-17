import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
          <Route path = "/Dashboard" element={<Dashboard />}></Route>
          <Route path = "/Post" element={<Post />}></Route>
          <Route path = "/Profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
