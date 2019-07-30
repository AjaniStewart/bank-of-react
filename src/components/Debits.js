import React, { Component } from 'react'
import md5 from 'blueimp-md5'
import { Link } from 'react-router-dom'
import './debit.css'

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debitDesc: '',
      debitAmt: ''
    }
  }

  handleChange = event => {
    const inputField = event.target.name;
    const inputValue = event.target.value;

    this.setState({
      [inputField]: inputValue
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let id = md5(this.state.debitDesc + this.state.debitAmt);
    let entry = {
      id: id, 
      description: this.state.debitDesc, 
      amount: parseFloat(this.state.debitAmt),
      date: (new Date()).toISOString()
    }
    this.props.addDebit(entry);
  }

  render() {
    return (
      <div>
        <div>
          <h1>Debits</h1>
          <h3>Account Balance: {this.props.accountBalance}</h3>
          <h3>Total Debits: {this.props.totalDebits}</h3>
        </div>
        <div>
          {
            this.props.debits.map(entry => {
              return (
                <div className="debitEntry" key={entry.id}>
                  <p>Description: {entry.description}</p>
                  <p>Amount: {entry.amount}</p>
                  <p>Date: {entry.date}</p>
                </div>
              );
            })
          }
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="debitDesc">Debit Description</label>
              <input name="debitDesc" type="text" onChange={this.handleChange} value={this.state.debitDesc} placeholder="Describe your transaction"/>
            </div>
            <div>
              <label htmlFor="debitAmt">Debit Amount</label>
              <input name="debitAmt" type="number" onChange={this.handleChange} value={this.state.debitAmt} placeholder="0.00"/>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <Link to="/">Back To Home</Link>
      </div>
    );
  }
}

export default Debits;