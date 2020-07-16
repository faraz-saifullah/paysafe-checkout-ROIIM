import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import withContext from "../../withContext";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import config from "../../paysafeConfig.json";
import Helper from "./Helper";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: {
        name: "",
        street: "",
        street2: "",
        city: "",
        zip: "",
        country: "",
        state: "",
      },
    };
    this.baseState = this.state;
  }

  paysafeCheckOut = async (totalAmout) => {
    const helper = new Helper();
    const setupInput = helper.prepareSetupInput(this.state.formInput, totalAmout);
    window.paysafe.checkout.setup(
      `${config.credentials.public.base64}`,
      setupInput,
      helper.callBackFunction,
      helper.closeCallBack
    );
    const status = await helper.paymentStatus;
    if (status.status === "success") {
      this.props.context.clearCart();
      this.props.history.push("/");
      //TODO: Display Success and failure information of a different page
    }
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.src = config.paysafeCheckoutSDKSource;
    script.async = true;
    document.body.appendChild(script);
  }

  handleCheckout = async (event) => {
    event.preventDefault();
    const { cart } = this.props.context;
    if (Object.keys(cart).length === 0 && cart.constructor === Object) {
      alert("You have an empty cart! Please add products to cart.");
      this.props.history.push("/products");
      return;
    }
    let totalAmout = 0;
    for (let cartItem in cart) {
      totalAmout += cart[cartItem].product.price;
    }
    this.paysafeCheckOut(totalAmout);
    this.setState(this.baseState);
  };

  onFornInputChange = (event) => {
    const changedInput = { ...this.state.formInput };
    changedInput[event.target.id] = event.target.value;
    this.setState({
      formInput: changedInput,
    });
  };

  render() {
    return (
      <center>
        <h1>Billing Details</h1>
        <form onSubmit={(event) => this.handleCheckout(event)}>
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              value={this.state.formInput.name}
              onChange={this.onFornInputChange}
              id="name"
              required
            />
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="street">Address Street</InputLabel>
            <Input
              value={this.state.formInput.street}
              onChange={this.onFornInputChange}
              id="street"
              required
            />
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="street2">Address Street 2</InputLabel>
            <Input
              value={this.state.formInput.street2}
              onChange={this.onFornInputChange}
              id="street2"
            />
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="city">City</InputLabel>
            <Input
              value={this.state.formInput.city}
              onChange={this.onFornInputChange}
              id="city"
              required
            />
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="zip">Zip Code</InputLabel>
            <Input
              value={this.state.formInput.zip}
              onChange={this.onFornInputChange}
              id="zip"
              required
            />
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="state">State Code</InputLabel>
            <Input
              value={this.state.formInput.state}
              onChange={this.onFornInputChange}
              id="state"
              required
            />
          </FormControl>
          <br />
          <FormControl style={{ width: "25%" }}>
            <InputLabel htmlFor="countryzip">Country Code</InputLabel>
            <Input
              value={this.state.formInput.country}
              onChange={this.onFornInputChange}
              id="country"
              required
            />
          </FormControl>
          <br />
          <br />
          <button type="submit" className="button is-primary is-medium">
            Proceed To Payment
          </button>
        </form>
      </center>
    );
  }
}

export default withContext(Checkout);
