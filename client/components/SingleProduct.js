import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { createSingleOrder } from "../store/singleOrder";
import { createLineItemForLoggedInUser } from "../store/loggedInUserOrders";
import { createLineItem } from "../store/singleOrder";
import Button from 'react-bootstrap/Button';
import axios from 'axios'

const SingleProduct = (props) => {
  const product = props.product;
  const token = window.localStorage.getItem("token");
  const userLineItemNames = props.userLineItemNames;

  const [addedToCart, setAddedToCart] = useState(false)
  const [grayButtonColor, setGrayButtonColor] = useState(false)
  const [liked, setLiked] = useState(false)


  useEffect(() => {
    props.getSingleProduct(props.match.params.productId)
  }, [])
  const handleLiked = async () => {
    setLiked(true)
    const productId = event.target.name
    const token = window.localStorage.getItem('token')
    await axios.post(`/api/likedItems/createProduct/${token}/${productId}`)


  }
  return (
    <div id="single-product" className="column">
      <div id="single-product-detail" className="row">
        <div className="column rm1" key={product.id}>
          <img width="250px" height="250px" src={product.imageUrl} />
          <h1>{product.name}</h1>
          <p>Price: $ {product.price}</p>
          <p>Description: {product.desc}</p>
          <Button
            variant={grayButtonColor ? 'secondary' : "primary"}
            type="button"
            onClick={() => {
              if (token) {
                if (userLineItemNames.includes(product.name)) {
                  window.alert(
                    "This item is already in your cart. Please go to your cart to change the quantity 💚."
                  );
                } else {
                  setAddedToCart(true)
                  setGrayButtonColor(true)
                  props.createLineItemForLoggedInUser(product);
                }
              } else {
                if (props.currentOrder.length === 0) {
                  setAddedToCart(true)
                  setGrayButtonColor(true)
                  props.createSingleOrder(product);
                } else if (
                  props.currentLineItemNames.includes(product.name)
                ) {
                  window.alert(
                    "This item is already in your cart. Please go to your cart to change the quantity 💚."
                  );
                } else {
                  setAddedToCart(true)
                  setGrayButtonColor(true)
                  props.createLineItem(
                    product,
                    props.currentOrder.id
                  );
                }
              }
            }}
          >
            {addedToCart ? 'Added to cart' : 'Add to cart'}
          </Button>
          {/* <div className='height'></div> */}
          <Button onClick={handleLiked} name={product.id}>{liked ? 'Liked' : 'Like'}</Button>
          <br></br>
          <p>{liked ? 'Added to your liked items on your user dashboard!' : ''}</p>
        </div>
      </div>
      <hr />
    </div>
  )
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
    userLineItemNames: state.loggedInUser.map((item) => item.product.name),
    currentOrder: state.singleOrder,
    currentLineItemNames: state.lineItems.map((item) => item.product.name),
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    createLineItemForLoggedInUser: (product) => {
      dispatch(createLineItemForLoggedInUser(product));
    },
    createSingleOrder: (product) => {
      dispatch(createSingleOrder(product));
    },
    createLineItem: (product, orderId) => {
      dispatch(createLineItem(product, orderId));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
