import React, { Component, Fragment } from "react";
import withContext from "../../withContext";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";
import { validateLoginInput } from "./Validation";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      isLoggingIn: false,
    };
  }
  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value, error: "" });

  handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateLoginInput(this.state);
    this.setState({
      error: validationError,
    });
    const { username, password } = this.state;
    try {
      if (!validationError) {
        this.setState({ isLoggingIn: true });
        const user = await Auth.signIn({
          username,
          password,
        });
        this.props.context.login(user.attributes);
        this.props.history.push("/");
      }
    } catch (error) {
      this.setState({
        error: error.message,
        isLoggingIn: false,
      });
    }
  };

  render() {
    return !this.props.context.user ? (
      <Fragment>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">User Name: </label>
              <input
                className="input"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Password: </label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )}
            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
                onClick={this.handleSubmit}
                disabled={this.state.isLoggingIn}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
        <Redirect to="/products" />
      );
  }
}

export default withContext(Login);
