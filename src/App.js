import Navbar from "./components/Navbar";
import Posts from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./components/Create";
import PostDet from "./components/PostDet";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path = "/">
              <Posts/>
            </Route>
            <Route exact path = "/create">
              <Create/>
            </Route>
            <Route exact path = "/posts/:id">
              <PostDet/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
