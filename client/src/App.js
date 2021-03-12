import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
