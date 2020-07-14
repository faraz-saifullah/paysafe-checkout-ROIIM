import React, { Fragment, Component } from "react";
import withContext from "../../withContext";
import CartItem from "./CartItem";

class Cart extends Component {
  render() {
    const { cart } = this.props.context;
    const cartKeys = Object.keys(cart || {});
    return (
      <Fragment>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">My Cart</h4>
          </div>
        </div>
        <br />
        <div className="container">
          {cartKeys.length ? (
            <div className="column columns is-multiline">
              {cartKeys.map((key) => (
                <CartItem
                  cartKey={key}
                  key={key}
                  cartItem={cart[key]}
                  removeFromCart={this.props.context.removeFromCart}
                />
              ))}
              <div className="column is-12 is-clearfix">
                <br />
                <div className="is-pulled-right">
                  <button
                    onClick={this.props.context.clearCart}
                    className="button is-warning "
                  >
                    Clear cart
                  </button>{" "}
                  <button
                    className="button is-success"
                    onClick={this.props.context.checkout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="column">
              <div className="title has-text-grey-light">No item in cart!</div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default withContext(Cart);
