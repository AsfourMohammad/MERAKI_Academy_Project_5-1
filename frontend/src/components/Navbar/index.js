import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { setProducts } from "../../redux/reducer/product";
import { setUserId } from "../../redux/reducer/auth";
import { useSelector, useDispatch } from "react-redux";

//===============================================================

const NavBar = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("true");
  const [findMe, setFindMe] = useState("");
  let user = "Ahmad";
  let isLoggedIn = true;

  const { userId, /*2isLoggedIn,*/ products } = useSelector((state) => {
    return {
      userId: state.auth.userId,
      // isLoggedIn: state.auth.isLoggedIn,
      products: state.product.products,
    };
  });

  const getProductsBySearch = () => {
    axios
      .get(`http://localhost:5000/product/search?search=${findMe}`)
      .then((result) => {
        setMessage("Success");
        dispatch(setProducts(result.data.result));
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };


  //===============================================================

  return (
    <>
      <div className="NavBar">
        {isLoggedIn ? (
          <>
            <div className="black_header">
              <p>Welcome {userId}</p>{" "}
            </div>
            <div className="Navbar_Link">
              <div className="link">
                <img
                  className="logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA9JLwYrxicQ2ZLA7XDINTzPasrI-5sx6onA&usqp=CAU"
                />
              </div>

              <div className="link">
                <input
                  className="searchBar"
                  placeholder="Looking For Something ?"
                  onChange={(e) => {
                    setFindMe(e.target.value);
                  }}
                ></input>
                <button
                  className="search_Button"
                  onClick={() => {
                    getProductsBySearch();
                  }}
                >
                  Search
                </button>
              </div>
              <div className="link">
                <Link className="Link" to="">
                  Cart
                </Link>
              </div>
              <div className="link">
                <Link className="Link" to="">
                  Wish List
                </Link>
              </div>
              <div>
                <button className="logout">Logout</button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NavBar;
