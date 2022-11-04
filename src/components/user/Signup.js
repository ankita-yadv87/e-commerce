import React, { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { register, clearErrors } from '../../actions/userAction'

const Signup = (props) => {

  const { isAuthenticated, error } = useSelector((state) => state.user);
  let navigate = useNavigate();
  const alert = useAlert();

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  //let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(credentials.name, credentials.email, credentials.password));
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value, })
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      alert.show("registered successfully")
      navigate('/products')
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  return (
    <>

      <div className="container mt-4 " style={{ height: "8rem", width: "50rem" }}>
        <div className="row d-flex justify-content-center align-items-center " >
          <div className="col-lg-12 col-xl-11">
            <div className='card text-dark'>
              <div className="card-body p-2.5" style={{ border: "1px solid" }} >
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-left h3 fw-bold mb-3 mt-2">Sign up</p>

                    <form onSubmit={handleSubmit} autoComplete="off">

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                          <input type="text" id="form3Example1c" className="form-control" name='name' onChange={onChange} value={credentials.name} />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          <input type="email" id="form3Example3c" className="form-control" name='email' placeholder='example@gmail.com' onChange={onChange} value={credentials.email} />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                          <input type="password" id="form3Example4c" className="form-control" name='password' onChange={onChange} value={credentials.password} />
                        </div>
                      </div>


                      <div className="d-flex justify-content-left mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-outline-dark btn-sm" >Register</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;