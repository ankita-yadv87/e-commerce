import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getProductDetails, clearErrors } from '../../actions/productAction';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader"
import { addItemsToCart } from "../../actions/cartAction";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import ReviewCard from "./ReviewCard";


const ProductDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();
    const [quantity, setquantity] = useState(1);
    console.log(quantity, "shhhh");
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const decreaseQuantity = () => {
        if (quantity === 1) return;

        setquantity(quantity - 1);
    }

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        setquantity(quantity + 1);
    }


    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        // if (reviewError) {
        //   alert.error(reviewError);
        //   dispatch(clearErrors());
        // }

        // if (success) {
        //   alert.success("Review Submitted Successfully");
        //   dispatch({ type: NEW_REVIEW_RESET });
        // }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="ProductDetails mx-4">
                        <div>
                            {/* <Carousel> */}
                            {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        style={{ width: '30rem', height: '30rem' }}
                                        key={i}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                            {/* </Carousel> */}
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

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

                </>
            )}
        </>
    );
}

export default ProductDetails