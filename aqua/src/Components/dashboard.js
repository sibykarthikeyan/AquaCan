import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
              <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
            </td>
            <td>
              <button className="btn btn-danger" onClick={this.delete}>Delete</button>
            </td>
          </tr>
      );
    }
  }
  
  export default Dashboard;