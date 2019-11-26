import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class Child extends Component {
  render() {
    return <div>hello react webpack</div>
  }
}

// ReactDom.render(<App/>, document.getElementById("app"));