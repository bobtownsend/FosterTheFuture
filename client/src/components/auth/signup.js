import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import ReactFilestack from 'filestack-react';
import Test from '../filestack.js';
import Footer from "../footer";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillUpdate(nextProps) {
    if (this.props.authenticated) {
      localStorage.setItem("userEmail", this.props.values.email);
      this.context.router.history.push("/");
    }
  }
  handleFormSubmit(event) {
    event.preventDefault();
    // Call action creator to sign up the user
    let firstName= this.refs.firstName.value;
    let lastName= this.refs.lastName.value;

    let email= this.refs.email.value;

    let password= this.refs.password.value;
    let phoneNumber = this.refs.phoneNumber.value;
    
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(phoneNumber);
    this.props.signupUser(firstName, lastName, email, password, phoneNumber);

    console.log(this.props.values);
    localStorage.setItem("userEmail", this.props.values.email);
    this.context.router.history.push("/profile");
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
 
  render() {
    const {
      handleSubmit,
      fields: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        passwordConfirm
      }
    } = this.props;

    return (
      <div className="tg-login__wrapper">
        <Test />
        <form className="signUp">
          <fieldset className="form-group">
            <label>First Name</label>
            <input
            ref="firstName"
              className="form-control"
              
              placeholder="Enter First Name"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              ref="lastName"
              placeholder="Enter Last Name"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Phone Number</label>
            <input className='form-control' ref="phoneNumber" placeholder='Enter Phone Number'/>
            </fieldset>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input className='form-control' ref="email" placeholder='Enter email' />
          {email.touched && email.error && <div className='error'>{email.error}</div>}        
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input className='form-control' ref="password" type='password' placeholder='Enter password' />
          {password.touched && password.error && <div className='error'>{password.error}</div>}
        </fieldset>
        <fieldset className='form-group'>
          <label>Confirm Password:</label>
          <input className='form-control' {...passwordConfirm} type='password' placeholder='Enter password again' />
          {passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>}          
        </fieldset>
        {this.renderAlert()}
        
      
      {/* <button action='submit' className='btn btn-primary'>Upload Photo!</button> */}
      <button onClick={this.handleFormSubmit.bind(this)} action='submit' className='btn btn-primary'>Sign up!</button>
     <br></br>
     <br></br>
     <br></br>
      </form>
      <div><Footer /></div>
      </div>
      
      
    );
  }
}
function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = "Please enter an email";
  }
  if (!formProps.password) {
    errors.password = "Please enter a password";
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }
  return errors;
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
export default reduxForm(
  {
    form: "signup",
    fields: ["email", "password", "passwordConfirm"],
    validate
  },
  mapStateToProps,
  actions
)(Signup);
