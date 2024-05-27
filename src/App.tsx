
import './index.css'
import Signup from './page/Signup/Signup'
import LoginForm from './page/Login/Login';
import Dashboard from './page/dashboard/Dashboard';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Signup/>}
          />
          <Route
            path="/login"
            element={<LoginForm />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
