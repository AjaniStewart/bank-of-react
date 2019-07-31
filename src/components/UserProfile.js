import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class UserProfile extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <div className="main">
          <h1>User Profile</h1>

          <div>Username: {this.props.userName}</div> <br />
          <div>Member Since: {this.props.memberSince}</div><br />
          <Link to="/">Back to Home</Link>
        </div>
      );
    } else {
      return (<Redirect to="/login"/>);
    }
  }
}

export default UserProfile;