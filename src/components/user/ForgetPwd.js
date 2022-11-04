import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotPassword, clearErrors } from '../../actions/userAction'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader"
import { json } from 'body-parser';

const ForgetPwd = () => {

    const { error, message, loading, success,token } = useSelector(
        (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");
    let navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const myForm = new FormData();

        // myForm.set("email", email);
        
        dispatch(forgotPassword({email}));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message){
            alert.success(message);
        }
        if(success){
            console.log("ank",token)
            navigate('/forget-password/reset-password');
        }
        
    }, [dispatch, error, alert,message, success])

    return (
        <>
            {
                loading ? (
                    <Loader />)
                    : (
                        <>
                            <div className='container mt-5' style={{ height: "8rem", width: "50rem" }}>
                                <div className="card-body p-3" style={{ border: "1px solid" }}  >
                                    <form onSubmit={handleSubmit}>
                                        <p className="text-left h3 fw-bold mb-3 mt-2">Forget Password</p>
                                        <div className="mb-3" >
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="email" name="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)} />

                                            <button type="submit" className='btn btn-dark mt-3 btn-sm'>submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    )
            }
        </>

    )
}

export default ForgetPwd