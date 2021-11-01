import './App.css';
import About from './Components/About';
import Home from './Components/Home'
import Navbar from './Components/Navbar';
import Alert from './Components/Alert';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from './Context/Notes/NoteState';
import { useState } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      message: message,
      type: type
    })
    
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <Signup/>
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
