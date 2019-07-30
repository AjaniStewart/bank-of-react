import React, { Component } from 'react'
import AccountBalance from './AccountBalance'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <img src="https://howtodoanythingblog.files.wordpress.com/2013/04/bank-3d-icon-12912421-copy2.jpg" alt="bank"/>
        <h1>Bank of React</h1>

        <Link to="/userProfile">User Profile</Link><br />
        <Link to="/debits">Debits</Link><br />
        <Link to="/credits">Credits</Link>

        <AccountBalance accountBalance={this.props.accountBalance} debitTotal={this.props.debitTotal} creditTotal={this.props.creditTotal}/>
      </div>
    );
  }
}

export default Home;  