import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './components/pages/Home';
import Add from './components/pages/Add';
import Contact from './components/pages/Contact';
import Navbar from './components/layouts/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/add' component={Add} />
          <Route exact path='/contact' component={Contact} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
