import React, { Component } from 'react';

class DataInput extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <input type="text" id="datainput" value={this.props.data} />;
  }
}

export default DataInput
