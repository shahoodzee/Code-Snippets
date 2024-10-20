import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GuestRoute from '../src/common/GuestRoute';
import LoggedRoute from '../src/common/LoggedRoute';
import Login from './pages/Login/LogIn';
//import Signup from './pages/Signup/signUp';
import SignUp from './pages/SignUp2/SignUp';
import ResetPassword from './pages/ResetPassword/resetPassword';
import Post from './pages/Page/post';
import Profile from './pages/Profille/profile';
import Dashboard from './pages/Dashboard/dashboard';
import SignIn from './pages/SignIn/signIn';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoggedLayout from './components/layout/loggedLayyout';
import './App.css';
function App() {
  return (

      <Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <Routes>

          <Route path='/' element={<LoggedRoute />}>
            
            <Route 
              path='/post' 
              element={ <LoggedLayout><Post /></LoggedLayout> } 
            />

            <Route 
              path='/profile' 
              element={ <LoggedLayout><Profile /></LoggedLayout> } 
            />

            <Route 
              path='/dashboard' 
              element={ <LoggedLayout><Dashboard /></LoggedLayout> } 
            />
          </Route>

          <Route path='/' element={<GuestRoute />}>

            <Route
              path='/login'
              element={<SignIn />}
            />

            <Route
              path='/signup'
              element={<SignUp />}
            />

            <Route
              path='/reset-password'
              element={<ResetPassword />}
            />
            
          </Route>

        </Routes>
      </Router>
  )
}

export default App