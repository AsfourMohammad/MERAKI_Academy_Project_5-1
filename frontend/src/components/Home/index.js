import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProductId, setProducts } from "../../redux/reducer/product";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import{addCart} from "../../redux/reducer/cart"
//===============================================================

const Home = () => {
  
  const { products } = useSelector((state) => {
    return {
      products: state.product.products,
    };
  });
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [max, setMax] = useState(100);
  const [min, setMin] = useState(0);
  const category = ["meat", "bread", "Yougart", "Fruits", "Vigtables", "Juice"];
  //===============================================================
  const getAllProducts = () => {
    axios
      .get(`http://localhost:5000/product/page/${count}`)
      .then((result) => {
        dispatch(setProducts(result.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProductByCategory = (str) => {
    axios
      .get(`http://localhost:5000/product/category/${str}`)
      .then((result) => {
        setMessage("Success");
        dispatch(setProducts(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UserIdStorage = localStorage.getItem("userId")
  console.log(UserIdStorage)
const createNewCartByUser=(id)=>{
  axios
      .post(`http://localhost:5000/cart`,{
        user_id:UserIdStorage,
        product_id:id,
        quantity:1
      })
     .then((result)=>{
      console.log(result)
      dispatch(addCart(result.data.result));
     })
     .catch((err)=>{
      console.log(err)

     })
}
  const getAllProductBySearch = (str) => {
    axios
      .get(`http://localhost:5000/product/${min}/${max}`)
      .then((result) => {
        setMessage("Success");
        dispatch(setProducts(result.data.products));
      })
      .catch((err) => {
        setMessage(err);
      });
  };

  //===============================================================

  useEffect(() => {
    getAllProducts();
  }, [count]);

  useEffect(() => {
    getAllProductBySearch();
  }, [min, max]);
 
  //===============================================================
const [hide,setHide]=useState(true)
  return (
    <>
      <div className="categorys">
        <div
          className="category"
          onClick={(e) => {
           getAllProducts();
          }}
        >
          <p className="category1" onClick={(e)=>{
            console.log(e.target.className)
            setHide(true)
          }}>All</p>
        </div>
        {category?.map((category, index) => (
          <div key={index} className="category">
            <div
              className="category"
              onClick={(e) => {
                getAllProductByCategory(e.target.innerHTML);
               
              }}
            >
              <p onClick={()=>{
                setHide(false)
              }}>{category}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="filterbar">
          <p className="p_price">Price Range</p>
          <p className="p_price">From</p>
          <input
            className="input_range"
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="100"
            placeholder="here"
            value={min}
            onChange={(e) => {
              setMin(e.target.value)
              setHide(false)
              ;
            }}
          ></input>
          <p className="input_max_min1">{"JD "+min}</p>
          <p className="p_price">to</p>

          <input
            className="input_range"
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="100"
            placeholder="here"
            value={max}
            onChange={(e) => {
              setMax(e.target.value)
              setHide(false)
              ;
            }}
          ></input>
          <p className="input_max_min1">{"JD "+max}</p>
        </div>
        <div className="products">
          {products?.map((product, index) => (
            <div key={index} className="product" onClick={() => {}}>
              <div>
                <img
                  className="product_image"
                  src={product.image}
                  onClick={() => {
                    dispatch(setProductId(product.id));
                    navigate("/productInfo");
                  }}
                />
              </div>
              <div className="product_details">
                <div className="details_component">{product.name}</div>
                <div className="details_component">{"JD " + product.price}.00</div>
                <div className="div_but">
                  <button className="but_cart_view" onClick={(e)=>{
                   if(e.target.className =="but_cart_view"){
                    e.target.className="active1"
                     
                   }
                    
                    createNewCartByUser(product.id)
                  }}> Cart</button>
                  <button className="but_cart_view" onClick={()=>{
                     dispatch(setProductId(product.id));
                     navigate("/productInfo");
                  }}>View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="div_move">
        {hide&&<button
          className="but_11"
          onClick={() => {
            setCount(count - 12);
          }}
        >
          <AiFillLeftCircle></AiFillLeftCircle>
        </button>}
       {hide&& <button
          className="but_22"
          onClick={() => {
            setCount(count + 12);
          }}
        >
          <AiFillRightCircle></AiFillRightCircle>
        </button>}
      </div>
    </>
  );
};

export default Home;
