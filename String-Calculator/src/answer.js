import React, { Component } from 'react';
import Input from './input.js'

class Answer extends Component {

  handleChange: function(evt) {
    this.setState({
      value: evt.target.value
    });
  },

  render(){
    return (
        <input type="text" value={this.state.value} onChange={this.handleChange} />
    )
  }
}

export default Answer
