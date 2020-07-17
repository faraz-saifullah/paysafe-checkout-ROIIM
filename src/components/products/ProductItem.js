import React, { Component } from "react";

class ProductItem extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className=" column is-half">
        <div className="box">
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="product"
                />
              </figure>
            </div>
            <div className="media-content">
              <b style={{ textTransform: "capitalize" }}>
                {product.name}{" "}
                <span className="tag is-primary">${product.price}</span>
              </b>
              <div>{product.short_desc}</div>
              {/* Handle Product out of stock scinario */}
              {product.stock > 0 ? (
                <small>{product.stock + " Available"}</small>
              ) : (
                  <small className="has-text-danger">Out Of Stock</small>
                )}
              <div className="is-clearfix">
                <button
                  className="button is-small is-outlined is-primary   is-pulled-right"
                  onClick={() =>
                    this.props.addToCart({
                      id: product.name,
                      product,
                      amount: 1,
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductItem;
