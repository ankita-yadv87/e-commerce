const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");


// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// //getting all product
// exports.getAllProducts = catchAsyncError(async (req, res) => {

//   const resultPerPage = 4;
//   const productsCount = await Product.countDocuments();
//   //const totalPages = Math.ceil(productsCount/resultPerPage);


//   //this apifeature is used for sending query for searching keywords functionality
//   const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);;

//   // let products = await apiFeature.query;

//   //let 

//   // apiFeature

//   const products = await apiFeature.query;
//   let filteredProductsCount = products.length;

//   //const products = await Product.find(); is not required because
//   //ApiFeatures(Product.find(), req.query) is returning the same
//   //writting multiple statements can cause trouble

//   res.status(200).json({
//     success: true,
//     products,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount,
//     //totalPages,
//   });
// });
// Get All Product

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter().pagination(resultPerPage);

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  //apiFeature.pagination(resultPerPage);

  //products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  };
  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//deleting product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "product has been removed"
  });
});


//getting single product detail
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) {
    // {return (res.status(500).json({
    //     success: false,
    //     message: "product not found",}
    //we need to write above code for error handling if we had not made errorhandler function

    return next(new ErrorHandler("Product not found", 404));

  };
  res.status(200).json({
    success: true,
    product,
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (x) => x.user.toString() === req.user._id.toString()
  );

  //checking if user who is logged in has already reviewed or not
  //if already reviewd  then we'll update the review to db
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      //req.user._id. means the user which is logged in 
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating),
          (rev.comment = comment);
      }
    });
  } else {
    //if first time reviewing then we'll push that review to array
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});



