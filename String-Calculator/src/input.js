import React, { Component } from 'react';
import Button from './button'

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
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

  render(){
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <Button value="Reset" onclick={this.reset} />
      </div>
    )
  }
}

export default Input
