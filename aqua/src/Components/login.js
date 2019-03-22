import React,{Component} from 'react';

class Login extends Component {
    render () {
        return (
            <div className="App">
                <div id="main-registration-container">
                    <div id="register">
                    <br/>
                    <h5>Login Form</h5>
                    <br/>
                        <form method="post"  name="userRegistrationForm" onSubmit={this.props.onRegister}>

                        <label>Mobile No:</label>
                        <input type="text" name="mobileno" value={this.props.fields.mobileno} onChange={this.props.onChange}/>
                        <div className="errorMsg">{this.props.errors.mobileno}</div>
                        
                        <label>Password</label>
                        <input type="password" name="password" value={this.props.fields.password} onChange={this.props.onChange}/>
                        <div className="errorMsg">{this.props.errors.password}</div>
                        
                        <button className="btn btn-primary btn-sm m-2">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;