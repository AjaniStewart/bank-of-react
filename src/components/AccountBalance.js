import React, { Component } from 'react'

class AccountBalance extends Component {
  render() {
    return (
      <div>
        <h3>Debit Total: {this.props.debitTotal}</h3>
        <h3>Credit Total: {this.props.creditTotal}</h3>
        <h3>Account Balance: {this.props.accountBalance}</h3>
      </div>
      
    );
  }
}

export default AccountBalance;