import React,{Component} from 'react';
import axios from 'axios';

class Edit extends Component {

    componentDidMount = () => {
        
        let userId = this.props.match.params.id;
        console.log("-siby-",userId);
        axios.get('http://localhost:4000/signUp/edit/'+this.props.match.params.id)
        .then(response => {
            console.log("web edit res",response.data.userName);
            this.props.fields.userName = response.data.userName;
            this.props.fields.emailId = response.data.emailId;
            this.props.fields.mobileNumber = response.data.mobileNumber;
            this.setState({ 
                userName: response.data.userName, 
                emailId: response.data.emailId,
                mobileNumber: response.data.mobileNumber 
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    render () {
        return (
            <div className="App">
                <div id="main-registration-container">
                    <div id="register">
                    <br/>
                    <h5>SignUP Update Form</h5>
                    <br/>
                        <form method="post"  name="userRegistrationForm" onSubmit={this.props.onUpdate}>

                        <label>Name</label>
                        <input type="text" name="userName" value={this.props.fields.userName} onChange={this.props.onChange}/>
                        <div className="errorMsg">{this.props.errors.userName}</div>
                        
                        <label>Email ID:</label>
                        <input type="text" name="emailId" value={this.props.fields.emailId} onChange={this.props.onChange}/>
                        <div className="errorMsg">{this.props.errors.emailId}</div>
                        
                        <label>Mobile No:</label>
                        <input type="text" name="mobileNumber" value={this.props.fields.mobileNumber} onChange={this.props.onChange}/>
                        <div className="errorMsg">{this.props.errors.mobileNumber}</div>
                        
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

export default Edit;