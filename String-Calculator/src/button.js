import React, { Component } from 'react';

class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleClick: function(evt) {
    this.setState({
      value: evt.target.value
    });
  },

  render(){
    return (
        <button type="button" value={this.state.value} onclick={this.handleChange} />
    )
  }
}

export default Button
