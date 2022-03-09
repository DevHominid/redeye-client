import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHdd } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faDatabase,
  faLock,
  faToolbox,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../app/hooks';
import { fetchServicesFromStorage } from '../../common/StorageUtils';
import { setServices } from '../../slices/services';
import Dashboard from '../Dashboard';
import Footer from '../../features/footer';
import Header from '../../features/header';
import Landing from '../Landing';
import Login from '../Login';
import styles from './App.module.css';

library.add(
  faBars,
  faDatabase,
  faHdd,
  faLock,
  faToolbox,
  faTrashAlt
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setServices(fetchServicesFromStorage()));
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route path="/services">
            <div className={styles.container}>
              <Header />
              <Dashboard />
            </div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <>
              <Landing />
              <Footer />
            </>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
