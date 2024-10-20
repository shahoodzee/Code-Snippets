import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoggedLayout from './components/layout/LoggedLayout';
import { RotatingLines } from 'react-loader-spinner';


// Stylesheets for date-range picker
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// Stylesheets for date picker
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


// pages
import Logout from './pages/logout/Logout';
import Notifications from './pages/notifications/Notifications';
import ProjectsList from './pages/projects-list/ProjectsList';
import ProjectDetails from './pages/project-details/ProjectDetails';
import TaskDetails from './pages/task-details/TaskDetails';
import CreateProject from './pages/create-project/CreateProject';
import Signin from './pages/signin/Signin';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import ResetPassword from './pages/reset-password/ResetPassword';
import LoggedRoute from './common/LoggedRoute';
import GuestRoute from './common/GuestRoute';
import Signup from './pages/signup/Signup';
import EditProfile from './pages/edit-profile/EditProfile';
import UsersList from './pages/users-list/UsersList';
import CreateUser from './pages/create-user/CreateUser';



function App() {
  const loader = useSelector(state => state.loader.active)
  return (
    <Router>
      {loader && (
      <div className='fixed inset-0 flex justify-center items-center bg-overlay-light z-50'>
        <RotatingLines
          visible={true}
          height="75"
          width="75"
          strokeColor='#003DA5'
          strokeWidth="3"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      )}
      <Routes>
        {/* Logged Routes */}
        {/* <Route path='/'> */}
        <Route path='/' element={<LoggedRoute />}>
          <Route
            path='/'
            element={<LoggedLayout>
              <ProjectsList/>
            </LoggedLayout>}
          />
          <Route
            path='/notifications'
            element={<LoggedLayout>
              <Notifications/>
            </LoggedLayout>}
          />
          <Route
            path='/edit-profile'
            element={<LoggedLayout>
              <EditProfile />
            </LoggedLayout>}
          />
          <Route
            path='/project-details'
            element={<LoggedLayout>
              <ProjectDetails/>
            </LoggedLayout>}
          />
          <Route
            path='/task-details'
            element={<LoggedLayout>
              <TaskDetails/>
            </LoggedLayout>}
          />
          <Route
            path='/create-project'
            element={<LoggedLayout>
              <CreateProject/>
            </LoggedLayout>}
          />
          <Route
            path='/user-list'
            element={<LoggedLayout>
              <UsersList/>
            </LoggedLayout>}
          />
          <Route
            path='/create-user'
            element={<LoggedLayout>
              <CreateUser/>
            </LoggedLayout>}
          />
        </Route>


        {/* Guest Routes */}
        <Route
          path='/logout'
          element={<Logout />}
        />
        <Route path='/' element={<GuestRoute />}>
          <Route
            path='/signin'
            element={<Signin />}
          />
          <Route
            path='/signup'
            element={<Signup />}
          />
          <Route
            path='/forgot-password'
            element={<ForgotPassword />}
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
