import React, {useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, clearErrors } from '../../actions/userAction'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";


const Login = (props) => {

    
    const { isAuthenticated, user, error } = useSelector((state) => state.user);
    let navigate = useNavigate();
    const alert = useAlert();

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    
    const dispatch=useDispatch();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(credentials.email, credentials.password));
        //navigate('/products');
    }

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isAuthenticated) {
            alert.show("loggedin successfully");
            navigate('/products')
        }
        
      }, [dispatch, error, alert, navigate, isAuthenticated]);
    

    return (
        <>

            <div className="container mt-5 " style={{height:"8rem", width:"50rem"}}>
                <div className="row d-flex justify-content-center align-items-center"  >
                    <div className="col-lg-12 col-xl-11" >
                        <div className='card text-dark'>
                            <div className="card-body p-2.5" style={{ border: "1px solid" }}  >
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 " >

                                        <p className="text-left h3 fw-bold mb-3 mt-2">Login</p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3" >
                                                <label htmlFor="email" className="form-label">Email address</label>
                                                <input type="email" className="form-control" value={credentials.email} autoComplete="username" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" value={credentials.password} autoComplete="current-password" onChange={onChange} name="password" id="password" />
                                            </div>

                                            <button type="submit" className="btn btn-dark btn-sm">Submit</button>
                                            <Link type="button" className="btn btn-outline-dark btn-sm mx-2" to="/forget-password">Forget Password</Link>
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

export default Login