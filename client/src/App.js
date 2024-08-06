import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';


const clientId = '806635105131-mt4ahi7522okg6h209mc3cq3tbeatb85.apps.googleusercontent.com';
function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
        <Router>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="/Post" element={<Post />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
