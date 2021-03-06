import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })  
  }
  
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:4000/business/login', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      email: '',
      password: ''
    })
    this.props.history.push('/');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Login</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Email ID:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      />
                </div>
                
                <div className="form-group">
                    <input type="submit" 
                      value="Login" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}