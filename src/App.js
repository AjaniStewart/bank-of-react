import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import LogIn from './components/Login'
import axios from 'axios'


class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99'
      },
      debits: [],
      credits: [],
      debitTotal: 0,
      creditTotal: 0,
    }
    this.calculateAccountBalance = this.calculateAccountBalance.bind(this);
    this.fetchAccountData = this.fetchAccountData.bind(this);
  }

  calculateAccountBalance() {
    let total_debit = this.state.debits.reduce((x,y) => x + y.amount, 0);
    let total_credit = this.state.credits.reduce((x,y) => x + y.amount, 0);
    let total = total_credit - total_debit;
    
    this.setState({
      accountBalance: total.toFixed(2),
      creditTotal: total_credit,
      debitTotal: total_debit
    });
  }

  fetchAccountData() {
    axios.get("https://moj-api.herokuapp.com/credits")
    .then(response => this.setState({credits: response.data}))
    .then(() => axios.get("https://moj-api.herokuapp.com/debits")
          .then(response => this.setState({debits: response.data}))).catch(err => console.log(err)).then(() => this.calculateAccountBalance());
  }

  componentDidMount() {
    this.fetchAccountData();
  }

  mockLogin = logInInfo => {
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({
      currentUser: newUser
    });
  }

  render() {
    const HomeComponent = () => <Home accountBalance={this.state.accountBalance} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal}/>;
    const UserProfileComponent = () => <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />;
    const LogInComponent = () => <LogIn user={this.state.currentUser} mockLogin={this.mockLogin} {...this.props}/>

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
        </Switch>
      </Router>
      
    );
  }
}

export default App;
