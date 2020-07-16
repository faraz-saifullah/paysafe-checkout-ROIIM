import React, { Component, Fragment } from "react";
import withContext from "../../withContext";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value, error: "" });

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    try {
      const user = await Auth.signIn({
        username,
        password,
      });
      this.props.context.login(user.attributes);
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
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
