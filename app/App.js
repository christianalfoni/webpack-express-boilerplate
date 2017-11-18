import React from 'react';
import styles from './App.css';
import imgContent from '../assets/whatever.jpg';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app}>
        <img src={imgContent} />
        <p>bar</p>
      </div>
    );
  }
}
