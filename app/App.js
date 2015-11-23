import React from 'react';
import styles from './App.css';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({
  title: ['title']
})
class App extends React.Component {
  render() {
    return (
      <h1>
        {this.props.title}
      </h1>
    );
  }
}

export default App;
