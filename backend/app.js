const express = require("express");
const app  = express();
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error")



app.use(express.json());
app.use(cookieParser());



// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
//const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);

app.use("/api/v1",user);

app.use("/api/v1", order);

//app.use("/api/v1", payment);



//middleware for error
app.use(errorMiddleware);

module.exports=app;