import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataInput from '../DataInput';
import MyButton from '../MyButton';
import Answer from '../Answer';
import StringCalculator from '../StringCalculator';

class Calculator extends React.Component {

  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {sum: 0};
    this.state = {valuesToCalculate: ''};
  }

  handleClick (evt) {
    var inputToCalculate = this.state.valuesToCalculate;
    var sum = StringCalculator.Add(inputToCalculate);
    this.setState({
      sum: sum
    });
  }

  handleChange (evt) {
    this.setState({
      valuesToCalculate: evt.target.value
    });
  }

  reset () {
    this.setState({
      valuesToCalculate: '',
      sum: 0
    });
  }

  render(){
    return (
      <div>
        <div>
          <input type="text" id="datainput" value={this.state.valuesToCalculate} onChange={this.handleChange}/>
          <button type="button" id="reset" onClick={this.reset}>Reset</button>
        </div>
        <div>
          <Answer data={this.state.sum}/>
          <button type="button" id="add" onClick={this.handleClick}>Add</button>
        </div>
      </div>
    )
  }
}

export default Calculator;
