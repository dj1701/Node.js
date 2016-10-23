import React, { Component } from 'react';
import Input from './input'
import Button from './Button'
import calculator from './StringCalculator'

class Calculator extends Component {

  render(){
    return (
        <div>
          <Input value={'0'}/>
          <Answer />
          <Button value={'Add'}/>
        <div/>
    )
  }
}

export default Calculator
