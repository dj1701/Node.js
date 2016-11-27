import React, { Component } from 'react';

class Answer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <input type="text" id="answer" value={this.props.data}/>
  }
}

export default Answer
