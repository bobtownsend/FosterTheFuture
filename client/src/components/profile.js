import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import { connect } from "react-redux";
import * as actions from "../actions";

class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authentiticated: false
    }
  }

  ComponentWillMount(){
    let auth = localStorage.getItem('authenticated');
    if (auth == true){
this.setState({authentiticated: true});
console.log(this.props);
    }
  }
componentDidMount(){
  console.log(this.props);
}

handleFormSubmit(){
  console.log(this.props);
  //Call action creator to sign up the user
  let fullName= this.refs.fullName.value;
  let phoneNumber= this.refs.phoneNumber.value;

  let email= this.refs.email.value;

  let oldEmail = localStorage.getItem('userEmail');
  console.log(oldEmail);
  console.log(fullName);
  console.log(email);
  console.log(phoneNumber);
  this.props.editUser(oldEmail, email, fullName, phoneNumber);
  console.log('editUser function initiated');

}
  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <div>
            <Navbar />
          </div>
          <div>
            <form className="profileSignIn">
              <fieldset className="form-group">
                <label>Full Name</label>
                <input
                  ref="fullName"
                  className="form-control"
                  placeholder="Enter Full Name"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Email</label>
                <input
                  ref="email"
                  className="form-control"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Phone Number</label>
                <input
                  ref="phoneNumber"
                  className="form-control"
                  placeholder="phoneNumber"
                />
              </fieldset>
              <button onClick={this.handleFormSubmit.bind(this)} className = "btn btn-primary"> submit</button>
            </form>
          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps =  (state) => {
  return {state: state}
}
export default connect(mapStateToProps, actions)(profile);
