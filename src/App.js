import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";
import ProductList from "./components/products/ProductList";
import Cart from "./components/cart/Cart";
import { Auth } from "aws-amplify";
import Context from "./Context";
import Navbar from "./components/navbar/Navbar";
import Checkout from "./components/checkout/Checkout";
import Register from "./components/auth/Register";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    //Initial state of the application
    this.state = {
      user: null,
      cart: {},
      products: [],
    };

    this.routerRef = React.createRef();
  }

  //When user logs in the user object of application's state is set
  login = (user) => {
    if (user) {
      this.setState({ user });
    }
  };

  //When user logs out the cart is cleared and
  //user is redirected to main landing page
  logout = (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.setState({ user: null });
      this.clearCart();
      this.routerRef.current.history.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  //Add products to cart and store the information in localstorage
  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  //Checkout to payment
  checkout = () => {
    this.routerRef.current.history.push("/checkout");
  };

  //Remove items from crat and update the local storage
  //as well as application state
  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  //Remove all the elements from cart
  clearCart = () => {
    let cart = {};
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  //Load products fromm database on Component Mount
  //Also if any user was authenticated get his details
  //Update user and product details after finishing the async call
  async componentDidMount() {
    axios
      .get(
        "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001/products",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
        let products = response.data.data;
        this.setState({ products });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          products: [],
        });
      });
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user) this.setState({ user: user.attributes });
      })
      .catch(() => {
        this.setState({
          user: null,
        });
      });
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : {};
    this.setState({ cart });
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          logout: this.logout,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
