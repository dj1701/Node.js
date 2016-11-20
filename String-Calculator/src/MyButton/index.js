import React, { Component } from 'react';

class MyButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return <button type="button">{this.props.text}</button>
  }
}

export default MyButton
