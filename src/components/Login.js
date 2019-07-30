import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  handleChange = e => {
    const updatedUser = {...this.state.user};
    const inputField = e.target.name;
    const inputValue = e.target.value;

    updatedUser[inputField] = inputValue;

    this.setState({user: updatedUser});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.mockLogin(this.state.user);
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile"/>);
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="userName">User Name</label>
            <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.username}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={this.handleChange} value={this.state.user.password}/>
          </div>
          <button>Log In</button>
        </form>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}

export default LogIn;