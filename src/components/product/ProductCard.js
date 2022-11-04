import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  const options = {
    edit: false,
    //value: 2.5,
    isHalf: true,
    value: product.ratings,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato"
    // readOnly: true,
    // precision: 0.5,
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center col-md-4'>
        <Link to={`product/${product._id}`}>
          <div className="card" style={{ width: '200px'}}>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0'
            }
            }>
              <span className="badge rounded-pill bg-danger">new</span>
            </div>
            <img src={product.images[0].url} className="card-img-top" alt={product.name} style={{height:"200px",width:"200px"}}/>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <ReactStars {...options} /><span>(256 Reviews)</span>
              <p className="card-text">{`₹${product.price}`}</p>
            </div>
          </div>

        </Link>
    </div>

    </>
  )
}

export default ProductCard