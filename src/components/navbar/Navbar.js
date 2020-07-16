import React, { Component } from "react";
import { Link } from "react-router-dom";
import withContext from "../../withContext";

class Navbar extends Component {
  componentWillMount() {
    this.setState({
      user: this.props.context.user,
      cart: this.props.context.cart,
    });
  }

  render() {
    return (
      <nav
        className="navbar container"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <b className="navbar-item is-size-4 ">E-Commerce</b>
        </div>
        <div className={`navbar-menu`}>
          <Link to="/products" className="navbar-item">
            Products
          </Link>
          {/* {this.props.context.user && this.props.context.user.accessLevel < 1 && (
            <Link to="/add-product" className="navbar-item">
              Add Product
            </Link>
          )} */}
          <Link to="/cart" className="navbar-item">
            Cart
            <span className="tag is-primary" style={{ marginLeft: "5px" }}>
              {Object.keys(this.props.context.cart).length}
            </span>
          </Link>
          {!this.props.context.user ? (
            <>
              <Link to="/login" className="navbar-item">
                Login
              </Link>
              <Link to="/register" className="navbar-item">
                Register
              </Link>
            </>
          ) : (
            <a
              href="/"
              className="navbar-item"
              onClick={this.props.context.logout}
            >
              Logout
            </a>
          )}
        </div>
      </nav>
    );
  }
}

export default withContext(Navbar);
