import React, { Component, Fragment } from "react";
import withContext from "../../withContext";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import axios from "axios";
import { validateRegisterInput } from "./Validation";

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
      error: "",
    };
  }

  createPaysafeUser = async () => {
    try {
      const user = await axios.post(
        "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001/users",
        {
          username: this.state.username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phone: this.state.phone,
          email: this.state.email,
          day: this.state.day,
          month: this.state.month,
          year: this.state.year,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return user.data;
    } catch (err) {
      return err;
    }
  };

  createCognitoUser = async (userData, username, email, password) => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
          "custom:paysafe_id": `${userData.id}`,
          "custom:firstName": `${userData.firstName}`,
          "custom:lastName": `${userData.lastName}`,
          "custom:phone": `${userData.phone}`,
          "custom:day": `${userData.dateOfBirth.day}`,
          "custom:month": `${userData.dateOfBirth.month}`,
          "custom:year": `${userData.dateOfBirth.year}`,
        },
      });
    } catch (err) {
      return err;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateRegisterInput(this.state);
    this.setState({
      error: validationError,
    });
    const { username, email, password } = this.state;
    try {
      if (!validationError) {
        const userData = await this.createPaysafeUser();
        if (userData && userData.id) {
          this.createCognitoUser(userData, username, email, password).then(
            () => {
              alert(
                "User created successfully!\nPlease check your email for confirmation link and then Log In!"
              );
            }
          );
          this.props.history.push("/login");
        } else {
          this.setState({
            error: "Username already exists",
          });
        }
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
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
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                value={this.state.firstName}
                onChange={this.onFormInputChange}
                id="firstName"
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                value={this.state.lastName}
                onChange={this.onFormInputChange}
                id="lastName"
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                value={this.state.email}
                onChange={this.onFormInputChange}
                id="email"
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "25%" }}>
              <InputLabel htmlFor="phone">Phone Number</InputLabel>
              <Input
                value={this.state.phone}
                onChange={this.onFormInputChange}
                id="phone"
              />
            </FormControl>
            <br />
            <FormControl style={{ width: "8.3%" }}>
              <InputLabel htmlFor="day">Day</InputLabel>
              <Input
                value={this.state.day}
                onChange={this.onFormInputChange}
                id="day"
              />
            </FormControl>
            <FormControl style={{ width: "8.3%" }}>
              <InputLabel htmlFor="month">Month</InputLabel>
              <Input
                value={this.state.month}
                onChange={this.onFormInputChange}
                id="month"
              />
            </FormControl>
            <FormControl style={{ width: "8.3%" }}>
              <InputLabel htmlFor="year">Year</InputLabel>
              <Input
                value={this.state.year}
                onChange={this.onFormInputChange}
                id="year"
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
              />
            </FormControl>
            <br />
            {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )}
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
