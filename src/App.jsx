import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Spin } from "./pages/spin";
import { Team } from "./pages/team";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Spin />
        </Route>
        <Route exact path="/team">
          <Team />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
