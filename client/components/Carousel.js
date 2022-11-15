import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store/products";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getProducts();
  }
  //   <div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
  //  padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
  //  border-radius: 8px; will-change: transform;">
  //   <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
  //     src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFR_VjM3qA&#x2F;view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  //   </iframe>
  // </div>
  // <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFR_VjM3qA&#x2F;view?utm_content=DAFR_VjM3qA&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Green and Peach Botanic Room Minimalist Desktop Wallpaper</a> by Nadia Khristean Music

  render() {
    return (
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://marketplace.canva.com/EAEub36J910/1/0/1600w/canva-green-and-brown-watercolor-plant-quote-desktop-wallpaper-4p30bxBtvkk.jpg
"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.wallpapersafari.com/94/25/1WYjcp.jpg
"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://marketplace.canva.com/EAEub3WxgaM/1/0/1600w/canva-boho-watercolor-plant-quote-desktop-wallpaper-eVdYpAFxye4.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // username: state.auth.username,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapState, mapDispatch)(Carousel);
