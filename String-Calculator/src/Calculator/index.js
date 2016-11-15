import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataInput from '../DataInput'
import MyButton from '../MyButton'

class Calculator extends React.Component {

  render(){
    return (
        <div>
          <DataInput value={'0'}/>
          <Answer />
          <MyButton value={'Add'}/>
        </div>
    )
  }
}

export default Calculator;
