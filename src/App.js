import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import LogIn from './components/Login'
import axios from 'axios'
import Credits from './components/Credits'
import Debits from './components/Debits'


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

  addNewDebit = (newEntry) => {
    const debits = this.state.debits;
    debits.push(newEntry);
    this.setState({debits: debits});
    this.calculateAccountBalance();
  }

  addNewCredit = (newEntry) => {
    const credits = this.state.credits;
    credits.push(newEntry);
    this.setState({credits: credits});
    this.calculateAccountBalance();
  }

  render() {
    const HomeComponent = () => <Home accountBalance={this.state.accountBalance} debitTotal={this.state.debitTotal} creditTotal={this.state.creditTotal}/>;
    const UserProfileComponent = () => <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />;
    const LogInComponent = () => <LogIn user={this.state.currentUser} mockLogin={this.mockLogin} {...this.props}/>
    const CreditsViewComponent = () => <Credits credits={this.state.credits} addCredit={this.addNewCredit} totalCredits={this.state.creditTotal} accountBalance={this.state.accountBalance}/>
    const DebitsViewComponent = () => <Debits debits={this.state.debits} addDebit={this.addNewDebit} totalDebits={this.state.debitTotal} accountBalance={this.state.accountBalance}/>

    return (
      <Router>
        <Switch>
          <Route exact path="/" basename="/bank-of-react" render={HomeComponent}/>
          <Route exact path="/userProfile" basename="/bank-of-react" render={UserProfileComponent}/>
          <Route exact path="/login" basename="/bank-of-react" render={LogInComponent}/>
          <Route exact path="/credits" basename="/bank-of-react" render={CreditsViewComponent}/>
          <Route exact path="/debits" basename="/bank-of-react" render={DebitsViewComponent}/>
        </Switch>
      </Router>
      
    );
  }
}

export default App;
