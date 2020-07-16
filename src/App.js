import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";
import ProductList from "./components/products/ProductList";
import AddProduct from "./components/addProduct/AddProduct";
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
    this.state = {
      user: null,
      cart: {},
      products: [],
    };

    this.routerRef = React.createRef();
  }

  login = (user) => {
    if (user) {
      this.setState({ user });
    }
  };

  logout = (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.setState({ user: null });
    } catch (err) {
      console.error(err.message);
    }
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    this.setState({ products }, () => callback && callback());
  };

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

  checkout = () => {
    this.routerRef.current.history.push("/checkout");
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  async componentDidMount() {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        let products = response.data.data;
        this.setState({ products });
      })
      .catch(() => {
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
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
