import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class AccountBalance extends Component {
  render() {
    if(this.props.loggedIn){
      return (
        <div>
          <h3>Debit Total: {this.props.debitTotal}</h3>
          <h3>Credit Total: {this.props.creditTotal}</h3>
          <h3>Account Balance: {this.props.accountBalance}</h3>
        </div>
        
      );
    } else {
      return (<Redirect to="/login"/>);
    }
  }
}

export default AccountBalance;