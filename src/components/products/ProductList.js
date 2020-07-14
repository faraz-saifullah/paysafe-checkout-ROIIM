import React, { Fragment, Component } from "react";
import ProductItem from "./ProductItem";
import withContext from "../../withContext";

class ProductList extends Component {
  render() {
    const { products } = this.props.context;
    return (
      <Fragment>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">Our Products</h4>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="column columns is-multiline">
            {products && products.length ? (
              products.map((product, index) => (
                <ProductItem
                  product={product}
                  key={index}
                  addToCart={this.props.context.addToCart}
                />
              ))
            ) : (
              <div className="column">
                <span className="title has-text-grey-light">
                  No product found!
                </span>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withContext(ProductList);
