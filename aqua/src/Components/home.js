import React,{Component} from 'react';
import axios from 'axios';
import Dashboard from './dashboard';

class Home extends Component {
    state = {
        userList:[]
    };
    componentDidMount = () => {
        axios.get('http://localhost:4000/signUp')
            .then(res => {
                this.setState({ userList: res.data });
            })
            .catch(function(error){
                console.log("error while get User list ",error);
            })
    }

    tabRow () {
        return this.state.userList.map(function(object,i){
            return <Dashboard obj={object} key={i}/>;
        });
    }
    render () {
        return (
            <div>
            <h3 align="center">Aqua User List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email ID</th>
                    <th>Mobile Number</th>
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                { this.tabRow() }
                </tbody>
            </table>
            </div>
        )
    }
}

export default Home;