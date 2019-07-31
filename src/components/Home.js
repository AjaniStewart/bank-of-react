import React, { Component } from 'react'
import AccountBalance from './AccountBalance'
import { Link, Redirect } from 'react-router-dom'
import './Home.css'

class Home extends Component {

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          <img src="https://howtodoanythingblog.files.wordpress.com/2013/04/bank-3d-icon-12912421-copy2.jpg" alt="bank"/>
          <h1>Bank of React</h1>

          <Link to="/userProfile">User Profile</Link><br />
          <Link to="/debits">Debits</Link><br />
          <Link to="/credits">Credits</Link>
          <AccountBalance accountBalance={this.props.accountBalance} debitTotal={this.props.debitTotal} creditTotal={this.props.creditTotal} loggedIn={this.props.loggedIn}/>
        </div>
      );
    } else {
      return(<Redirect to="/login"/>);
    }
  }
}

export default Home;  