import React, { Component } from 'react'

class AccountBalance extends Component {
  render() {
    return (
      <div>
        <h2>Debit Total: {this.props.debitTotal}</h2>
        <h2>Credit Total: {this.props.creditTotal}</h2>
        <h2>Account Balance: {this.props.accountBalance}</h2>
      </div>
      
    );
  }
}

export default AccountBalance;