import React, { useEffect, useState } from 'react'
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import ProductCard from './ProductCard';
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import "./product.css";
import Pagination from "react-js-pagination";
import Loader from "../Loader/Loader"

const Product = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { loading, error, products, productsCount, resultPerPage, filteredProductsCount, } = useSelector((state) => state.products);

  const totalPages = Math.ceil(productsCount / resultPerPage);
  console.log(totalPages)

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  const categories = [
    "Mobile",
    "footwear",
    "Women",
    "utility",
    "jwellery",
    "kids",
    "SmartPhones",
  ];

  return (
    <>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <div className="container py-3">
              <h3>FIND AMAZING PRODUCTS BELOW</h3>
            </div>


            <div className="container">

              <div className='row col-md-8'>
                {products &&
                  products.map((product) => (
                    <ProductCard product={product} />
                  ))}
              </div>

              <div className='row col-md-4 filterBox '>
                <div className="">
                  <Typography>Price</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={10000}
                  />

                  <Typography>Categories</Typography>
                  <ul className="categoryBox">
                    {categories.map((category) => (
                      <li
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>

                  <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                      value={ratings}
                      onChange={(e, newRating) => {
                        setRatings(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                    />
                  </fieldset>
                </div>

              </div>
            </div>





            {resultPerPage <= count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}


          </>
        )
      }
    </>
  )
}

export default Product