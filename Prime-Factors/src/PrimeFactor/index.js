import React, { Component } from 'react';
var primefactorengine = require('../PrimeFactorEngine');

class PrimeFactor extends React.Component {

  constructor() {
    super();
    this.state = {valueToFactorize: 0};
    this.state = {primefactors: ''};
    this.updateFromGiven = this.updateFromGiven.bind(this);
    this.findprimes = this.findprimes.bind(this);
    this.reset = this.reset.bind(this);
  }

  findprimes() {
    var given = this.state.valueToFactorize;
    this.setState({
      primefactors: primefactorengine.generate(given)
    })
  }

  updateFromGiven(evt) {
    this.setState({
      valueToFactorize: evt.target.value
    });
  }

  reset() {
    this.setState({
      valueToFactorize: 0,
      primefactors: ''
    })
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" id="given" value={this.state.valueToFactorize} onChange={this.updateFromGiven}/>
          <button type="button" id="find" onClick={this.findprimes}>Find Prime Factors</button>
        </div>
        <div>
          <input type="text" id="primefactors" readOnly value={this.state.primefactors}/>
          <button type="button" id="reset" onClick={this.reset}>Reset</button>
        </div>
    </div>
    )
  }
}

export default PrimeFactor
