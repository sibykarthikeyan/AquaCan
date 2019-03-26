import React,{Component} from 'react';
import axios from 'axios';

class Dashboard extends Component {

    delete = () => {
        axios.get('http://localhost:4000/signUp/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err=>console.log("Got err while delete ",err))
    }
    render() {
      return (
          <tr>
            <td>
              {this.props.obj.userName}
            </td>
            <td>
              {this.props.obj.emailId}
            </td>
            <td>
              {this.props.obj.mobileNumber}
            </td>
            <td>
              <button className="btn btn-primary">Edit</button>
            </td>
            <td>
              <button className="btn btn-danger" onClick={this.delete}>Delete</button>
            </td>
          </tr>
      );
    }
  }
  
  export default Dashboard;