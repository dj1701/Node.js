import React, { Component } from 'react';
import MyButton from '../MyButton'

class DataInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange (evt) {
    this.setState({
      value: evt.target.value
    });
  }

  reset () {
    this.setState({
      value: "0"
    });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <MyButton value="Reset" onClick={this.reset} />
      </div>
    );
  }
}

export default DataInput
