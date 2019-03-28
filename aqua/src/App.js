import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router,Route,Link,Switch } from 'react-router-dom';
import axios from 'axios';
import SignUp from './Components/signUp';
import Login from './Components/login';
import Edit from './Components/edit';
import Home from './Components/home';


class App extends Component {
  state = {
    fields:{},
    errors:{},
    loginFields:{},
    loginErrors:{}
  };
  
  handleChange = event => {
    console.log("-siby handle event",event.target);
    let formFields = event.target;
    let fields = this.state.fields;
    fields[formFields.name] = formFields.value;
    this.setState({fields});
  };

  handleRegister = formValue => {
    formValue.preventDefault();
    let data = this.state.fields;
    console.log("siby form value",JSON.stringify(data,undefined,4));
    if(this.validateSignUpForm()){
      let fields = {};
      fields["userName"] = "";
      fields["emailId"] = "";
      fields["mobileNumber"] = "";
      fields["password"] = "";

      axios.post('http://localhost:4000/signUp/add',data)
        .then(res => console.log("axios add response",res.data));
      this.setState({fields});
      
    alert ("submitted succesfully");
    }
   
  };

  handleUpdate = formValue => {
    formValue.preventDefault();
    let data = this.state.fields;
    console.log("siby form value update",JSON.stringify(data,undefined,4));
    if(this.validateSignUpForm()){
      let fields = {};
      fields["userName"] = "";
      fields["emailId"] = "";
      fields["mobileNumber"] = "";
      fields["password"] = "";

           
      axios.post('http://localhost:4000/signUp/update/'+this.props.match.params.id, data)
        .then(res => console.log("axios update resp",res.data));
        this.setState({fields});
    alert ("Updated succesfully");
    }
   
  };

  handleLogin = loginValue => {
    loginValue.preventDefault();
    let data = this.state.loginFields;
    console.log("siby loginFields value",JSON.stringify(data,undefined,4));
   // if(this.validateLoginForm){
      let loginFields = {};
      loginFields["mobileNumber"] = "";
      loginFields["password"] = "";
      this.setState({loginFields});
     
    //}
    alert ("Login submitted succesfully");
  };

 

  validateSignUpForm() {
    let fields = this.state.fields;
    let errors = {};
    let isValid = true;
    if(!fields["userName"]){
      isValid = false;
      errors["userName"] = "Plz enter username";
    }
    if(typeof fields["userName"] !== "undefined"){
      if(!fields["userName"].match(/^[a-zA-Z]*$/)){
        isValid = false;
        errors["userName"] = "Plz enter only alphabetic character";
      }
    }

    if(!fields["emailId"]){
      isValid = false;
      errors["emailId"] = "Plz enter emailid";
    } 
    if (typeof fields["emailId"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailId"])) {
        isValid = false;
        errors["emailId"] = "Please enter valid email-ID.";
      }
    }

    if(!fields["mobileNumber"]){
      isValid = false;
      errors["mobileNumber"] = "Plz enter mobile number";
    }
    if(typeof fields["mobileNumber"] !== "undefined"){
      if(!fields["mobileNumber"].match(/^[0-9]{10}$/)){
        isValid = false;
        errors["mobileNumber"] = "Plz enter valid mobile number";
      }
    }

    if (!fields["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }
    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        isValid = false;
        errors["password"] = "Please enter secure and strong password.";
      }
    }
    
    this.setState({errors:errors});
    return isValid;
  }

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/'>Aqua</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                {/**<li className="nav-item">
                  <Link to='/' className="nav-link">Home</Link>
                  </li> */}
                <li className="nav-item">
                  <Link to='/signUp' className="nav-link">SignUp</Link>
                </li>
                <li className="nav-item">
                  <Link to='/login' className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          
          <Switch>
            <Route exact path='/' 
              render={
                () => <Home/>
              }
            />
            <Route exact path='/signUp' 
              render={ () => <SignUp 
                onChange={this.handleChange}
                fields = {this.state.fields} 
                errors = {this.state.errors}
                onRegister = {this.handleRegister}
                />}
            />
            <Route path='/edit/:id' 
              render = { (props) => <Edit
                {...props}
                onChange={this.handleChange}
                fields = {this.state.fields} 
                errors = {this.state.errors}
                onUpdate = {this.handleUpdate}
              />}
            />
            <Route path='/login' 
              render = { () => <Login
                onChange={this.handleChange}
                fields = {this.state.loginFields} 
                errors = {this.state.loginErrors}
                onRegister = {this.handleLogin}
              />}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
