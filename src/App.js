import './App.css';
import About from './Components/About';
import Home from './Components/Home'
import Navbar from './Components/Navbar';
import Alert from './Components/Alert';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from './Context/Notes/NoteState';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="This is an amazing alert"/>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
