import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
// import MailOutlineIcon from "@material-ui/icons-material/MailOutline";
// import FaceIcon from "@material-ui/icons-material/Face";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom';
import MetaData from "../layout/MetaData";
import ProfilePic from "./profilepic.png";


const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    let navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    //const [avatar, setAvatar] = useState();
    //const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        //myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    };

    //   const updateProfileDataChange = (e) => {
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //       if (reader.readyState === 2) {
    //         setAvatarPreview(reader.result);
    //         setAvatar(reader.result);
    //       }
    //     };

    //     reader.readAsDataURL(e.target.files[0]);
    //   };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            //setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());

            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated]);


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Update Profile" />
                    <div className='container mt-5' style={{ height: "8rem", width: "50rem" }}>
                        <div className="card-body p-3" style={{ border: "1px solid" }}  >
                            <form onSubmit={updateProfileSubmit}>
                                <p className="text-left h3 fw-bold mb-3 mt-2">Update Your Profile</p>
                                <div className="mb-3" >
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="name" className="form-control" autoComplete="username"  name="name" value={name}
                                        onChange={(e) => setName(e.target.value)} />

                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" autoComplete="username" id="email" name="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />


                                    <button type="submit" className='btn btn-dark mt-3 btn-sm'>submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default UpdateProfile