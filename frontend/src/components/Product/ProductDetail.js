import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductDetail.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
import ReviewCard from "./ReviewCard.js";
import Loader from "../../components/Layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
// import { NEW_REVIEW_RESET } from "../constants/productConstant";

import { NEW_REVIEW_RESET } from "../../constants/productConstant";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  console.log(id);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReviewReducer
  );
  // const userl= JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    size: "large",
    readOnly: true,
    value: product.ratings,
    precision: 0.5,
  };
  const form = {
    rating: "",
    comment: "",
    productId: "",
  };

  console.log(product.reviews);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [formm, setFormm] = useState(form);
  const [showZoom, setShowZoom] = useState(true);
  const [idx, setIdx] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity, navigate));
    alert.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const handleChange = (e) => {
    setFormm({
      ...formm,
      [e.target.name]: e.target.value,
    });
  };

  const [showMagnify, setShowMagnify] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseEnter = (index) => {
    setShowMagnify(true);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setShowMagnify(false);
  };

  const reviewSubmitHandler = () => {
    console.log("form");
    console.log(formm);

    // console.log(userl);
    // console.log(userl._id);

    // setFormm({
    //   ...formm,
    //   ["rating"]: ratings,
    //   ["comment"]: comments,
    //   ["productId"]: prdid,
    // });
    formm.productId = id;
    dispatch(newReview(formm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}--SHOPSTUDIO`} />
          <div className="ProductDetails">
            <div className="div1">
              <Carousel
                width={"20vmax"}
                autoFocus={true}
                autoPlay={true}
                infiniteLoop={true}
                transitionTime={500}
                showThumbs={false}
                className="carousel"
                interval={4900}
              >
                {product.image &&
                  product.image.map((item, i) => (
                    <div key={item.id} onMouseEnter={() => handleMouseEnter(i)}>
                      <img
                        className="CarouselImage"
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            {showMagnify && (
              <div className="magnify-container">
                <div className="mag" onMouseLeave={handleMouseLeave}>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Product image",
                        isFluidWidth: false,
                        src: product.image[activeIndex].url,
                        width: 300,
                        height: 300,
                      },
                      largeImage: {
                        src: product.image[activeIndex].url,
                        width: 1200,
                        height: 1800,
                      },
                    }}
                  />
                </div>
              </div>
            )}

            <div className="div2">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numberofReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:&nbsp;
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                value={formm.rating}
                name="rating"
                size="large"
                onChange={handleChange}
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={formm.comment}
                name="comment"
                onChange={handleChange}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
