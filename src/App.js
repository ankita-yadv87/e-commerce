import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Product from './components/product/Product';
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Profile from './components/user/Profile';
import ForgetPwd from './components/user/ForgetPwd';
import UpdateProfile from './components/user/UpdateProfile';
import ResetPwd from './components/user/ResetPwd';
import Cart from './components/cart/Cart';
import MyOrders from './components/orders/MyOrders';
import Shipping from './components/cart/Shipping';
import OrderSuccess from './components/cart/OrderSuccess';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderDetails from './components/orders/OrderDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Payment from './components/cart/Payment';
import Dashboard from '@mui/icons-material/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



function App() {


  // const [stripeApiKey, setStripeApiKey] = useState("");
  // const dispatch = useDispatch();

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

  // useEffect(() => {
  //   getStripeApiKey();
  // }, []);

  return (

    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>

          <Route path="/cart" element={<Cart/>}/>
          <Route path='/shipping' element={<Shipping/>}/>
          <Route path="/orders" element={<MyOrders/>}/>
          <Route path="/success" element={<OrderSuccess/>}/>
          <Route path="/order/confirm" element={<ConfirmOrder/>}/>
          <Route path='/order/:id' element={<OrderDetails/>}/>
          <Route/>
          
          <Route path='/process/payment' element={<Payment/>}/>
   

          {/* <Route element={window.location.pathname === "/process/payment" ? null : NotFound}/> */}

          <Route path="/forget-password" element={<ForgetPwd/>}/>
          <Route path='/forget-password/reset-password' element={<ResetPwd/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/my-profile" element={<Profile/>}/>
          <Route path="/update-profile" element={<UpdateProfile/>}/>

          <Route path="/products" element={<Product/>}/>
          <Route path="/products/:keyword" element={<Product/>}/>
          <Route path="/products/product/:id" element={<ProductDetails/>} />
          <Route path="/products/:keyword/product/:id" element={<ProductDetails/>}/>

          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/products" element={<ProductList/>}/>
          <Route path="/admin/product" element={<NewProduct/>} />
          <Route path="/admin/product/:id" element={<UpdateProduct/>}/>
          <Route path="/admin/orders" element={<OrderList/>}/>
          <Route path="/admin/order/:id" element={<ProcessOrder/>}/>
          <Route path="/admin/users" element={<UsersList/>}/>
          <Route path="/admin/user/:id" element={<UpdateUser/>}/>
          <Route path="/admin/reviews" element={<ProductReviews/>}/>
        
          </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
