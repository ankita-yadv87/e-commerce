import React, { useState,useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword,clearErrors} from '../../actions/userAction';
import Loader from '../Loader/Loader';

const ResetPwd = () => {
    const { error, success,message, loading ,token} = useSelector(
        (state) => state.forgotPassword
    );
    const [credentials, setCredentials] = useState({ password: "", confirmpassword: "" })

    const dispatch = useDispatch();
    const alert= useAlert();
    console.log("token12",token);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("jija",credentials.password, credentials.confirmpassword)
        dispatch(resetPassword(token, credentials.password, credentials.confirmpassword));
        //navigate('/products');
    }

    useEffect(() => {
        if (error) {
            console.log("jija",credentials.password, credentials.confirmpassword);
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message){
            console.log("jiji",token);
            console.log("jija",credentials.password, credentials.confirmpassword)
            alert.success("pwd reseted successfully");
            console.log("pwd reseted successfully");
        }
        
    }, [dispatch, error, alert,message])

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
                                            <label htmlFor="email" className="form-label">Enter New Password</label>
                                            <input type="password" className="form-control" autoComplete='new-password' name="password" value={credentials.password}
                                                onChange={onChange} />
                                            <label htmlFor="email" className="form-label">Re-enter Password</label>
                                            <input type="password" className="form-control" autoComplete='confim-password' name="confirmpassword" value={credentials.confirmpassword}
                                                onChange={onChange} />

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

export default ResetPwd