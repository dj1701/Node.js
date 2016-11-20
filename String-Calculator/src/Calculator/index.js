import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataInput from '../DataInput';
import MyButton from '../MyButton';
import Answer from '../Answer';

class Calculator extends React.Component {

  render(){
    return (
        <div>
          <DataInput value={'0'}/>
          <MyButton value={'Add'}/>
          <Answer/>
        </div>
    )
  }
}

export default Calculator;
