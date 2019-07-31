import React, { Component } from 'react'
import md5 from 'blueimp-md5'
import { Link, Redirect } from 'react-router-dom'
import './credit.css'

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditDesc: '',
      creditAmt: ''
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
    let id = md5(this.state.creditDesc + this.state.creditAmt);
    let entry = {
      id: id, 
      description: this.state.creditDesc, 
      amount: parseFloat(this.state.creditAmt),
      date: (new Date()).toISOString()
    }
    this.props.addCredit(entry);
  }

  render() {
    if (this.props.loggedIn) {

      return (
        <div>
          <div>
            <h1>Credits</h1>
            <h3>Account Balance: {this.props.accountBalance}</h3>
            <h3>Total Credits: {this.props.totalCredits}</h3>
          </div>
          <div>
            {
              this.props.credits.map(entry => {
                return (
                  <div className="creditEntry" key={entry.id}>
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
                <label htmlFor="creditDesc">Credit Description</label>
                <input name="creditDesc" type="text" onChange={this.handleChange} value={this.state.creditDesc} placeholder="Describe your transaction"/>
              </div>
              <div>
                <label htmlFor="creditAmt">Credit Amount</label>
                <input name="creditAmt" type="number" onChange={this.handleChange} value={this.state.creditAmt} placeholder="0.00"/>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <Link to="/">Back To Home</Link>
        </div>
      );
    } else {
      return (<Redirect to="/login"/>);
    }
  }
}

export default Credits;