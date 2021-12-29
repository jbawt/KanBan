import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useUserContext } from './context/userProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './components/auth/AuthPage';
import NavBar from './components/nav/NavBar';
import Home from './components/Home/Home';
import Project from './components/project/Project';
import ChangePassword from './components/profile/ChangePassword';

function App() {

  const userInfo = useUserContext();

  return (
    <Router>

      <NavBar />
      <ToastContainer />

      <Switch>

        <Route exact path="/home">
          { userInfo.loggedIn && <Home /> }
        </Route>

        <Route exact path="/project">
          <Project />
        </Route>

        <Route exact path="/change-password">
          <ChangePassword />
        </Route>

        <Route exact path="/">
          <AuthPage />
        </Route>


      </Switch>
    </Router>
  );
}

export default App;
