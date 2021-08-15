import './App.css';
import SignIn from './components/SignIn';
import Packages from './components/Packages';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";


export default function App() {

  return (
    <div className="App">

      <Router>
        <Redirect from="/" to="signIn" />

        <Route name="signIn" path="/signIn">
          <SignIn />
        </Route>
        <Route path="/packages">
          <Packages />
        </Route>
      </Router>
    </div>

  );
}

