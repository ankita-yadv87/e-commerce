import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <>
            <form className="d-flex" role="search" onSubmit={searchSubmitHandler}>
                <input className="form-control me-2" type="search" placeholder="Search a Product ..." aria-label="Search" onChange={(e) => setKeyword(e.target.value)} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </>
    );
};

export default Search;
