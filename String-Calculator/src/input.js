import React, { Component } from 'react';
import Button from './button.js'

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange: function(evt) {
    this.setState({
      value: evt.target.value
    });
  },

  reset: function() {
    this.setState({
      value: "0"
    });
  },

  render(){
    return (
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <Button value="Reset" onclick={this.reset} />
    )
  }
}

export default Input
