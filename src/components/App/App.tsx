import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHdd } from '@fortawesome/free-regular-svg-icons';
import { faBars, faDatabase, faLock, faToolbox } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../Dashboard';
import Footer from '../Footer';
import Header from '../Header';
import Landing from '../Landing';
import Login from '../Login';
import styles from './App.module.css';

library.add(
  faBars,
  faDatabase,
  faHdd,
  faLock,
  faToolbox
);
console.dir(library);

function App() {
  return (
    <Router>
      <div className={styles.App}>
        {/* <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <>
              <Landing />
              <Footer />
            </>
          </Route>
        </Switch> */}
        <div className={styles.container}>
          <Header />
          <Dashboard />
        </div>
      </div>
    </Router>
  );
}

export default App;
