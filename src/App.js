import './App.css';
import About from './Components/About';
import Home from './Components/Home'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from './Context/NoteState';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </NoteState>
  );
}

export default App;
