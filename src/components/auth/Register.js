import React, { Component, Fragment } from "react";
import withContext from "../../withContext";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: "",
      password: "",
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      day: "",
      month: "",
      year: "",
    };
  }

  createPaysafeUser = async () => {
    try {
      const user = await axios.post("http://localhost:3001/users", {
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        email: this.state.email,
        day: this.state.day,
        month: this.state.month,
        year: this.state.year,
      })
      return user.data;
    } catch (err) {
      return err;
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    try {
      const userData = await this.createPaysafeUser();
      if (userData && userData.id) {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email: email,
            'custom:paysafe_id': `${userData.id}`,
            'custom:firstName': `${userData.firstName}`,
            'custom:lastName': `${userData.lastName}`,
            'custom:phone': `${userData.phone}`,
            'custom:day': `${userData.dateOfBirth.day}`,
            'custom:month': `${userData.dateOfBirth.month}`,
            'custom:year': `${userData.dateOfBirth.year}`,
          },
        });
        alert(
          "User created successfully! Please check your email for confirmation link and Log In!"
        );
        this.props.history.push("/login");
      } else {
        alert('Failed to create user. Try Again!')
      }
    } catch (error) {
      console.log(error);
    }
  };

  onFormInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return !this.props.context.user ? (
      <Fragment>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Register</h4>
          </div>
        </div>
        <br />
        <br />
        <center>
          <form onSubmit={this.handleSubmit}>
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                value={this.state.username}
                onChange={this.onFormInputChange}
                id="username"
                required
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                value={this.state.firstName}
                onChange={this.onFormInputChange}
                id="firstName"
                required
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                value={this.state.lastName}
                onChange={this.onFormInputChange}
                id="lastName"
                required
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                value={this.state.email}
                onChange={this.onFormInputChange}
                id="email"
                type="email"
                required
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="phone">Phone Number</InputLabel>
              <Input
                value={this.state.phone}
                onChange={this.onFormInputChange}
                id="phone"
                required
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "8.3%" }}>
              <InputLabel htmlFor="day">Day</InputLabel>
              <Input
                value={this.state.day}
                onChange={this.onFormInputChange}
                id="day"
                required
              />
            </FormControl>
            <FormControl style={{ width: "8.3%" }}>
              <InputLabel htmlFor="month">Month</InputLabel>
              <Input
                value={this.state.month}
                onChange={this.onFormInputChange}
                id="month"
                required
              />
            </FormControl>
            <FormControl style={{ width: "8.3%" }}>
              <InputLabel htmlFor="year">Year</InputLabel>
              <Input
                value={this.state.year}
                onChange={this.onFormInputChange}
                id="year"
                required
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                value={this.state.password}
                onChange={this.onFormInputChange}
                id="password"
                type="password"
                required
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                value={this.state.confirmPassword}
                onChange={this.onFormInputChange}
                id="confirmPassword"
                type="password"
                required
              />
            </FormControl>
            <br />
            <br />
            <button type="submit" className="button is-primary is-medium">
              Register
            </button>
          </form>
        </center>
      </Fragment>
    ) : (
        <Redirect to="/products" />
      );
  }
}

export default withContext(Register);
