import React from 'react';
import Dashboard from '../Dashboard';
import Header from '../Header';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.container}>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
