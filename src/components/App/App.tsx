import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHdd } from '@fortawesome/free-regular-svg-icons';
import { faDatabase, faLock, faToolbox } from '@fortawesome/free-solid-svg-icons';
// import Dashboard from '../Dashboard';
import Footer from '../Footer';
import Header from '../Header';
import Landing from '../Landing';
import styles from './App.module.css';

library.add(faDatabase, faHdd, faLock, faToolbox);
console.dir(library);

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          {/* <Route path="/login">
            <div>login</div>
          </Route> */}
          <Route path="/">
            <>
              <Landing />
              <Footer />
            </>
          </Route>
        </Switch>
        {/* <Header /> */}
        {/* <div className={styles.container}>
          <Dashboard />
          
        </div> */}
      </div>
    </Router>
  );
}

export default App;
