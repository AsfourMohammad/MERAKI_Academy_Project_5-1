import React, { useContext, useState, useEffect } from "react";
import { useNavigate,Link  } from "react-router-dom";
import "./style.css";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { BsCurrencyDollar } from "react-icons/bs";
import{addCart} from "../../redux/reducer/cart"
import {GrDeliver} from 'react-icons/gr'
const ProductInfo=()=>{
const [info,setInfo]=useState([])
  const { productId } = useSelector((state) => {
    return {
      productId: state.product.productId,
 
    };
  });
console.log(productId)
 const Navigate=useNavigate();
  const dispatch=useDispatch();

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState();
  const UserIdStorage = localStorage.getItem("userId")

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

//create function  getAllProductById


useEffect(()=>{
  axios.get(`http://localhost:5000/product/get/${productId}`)
  .then((result) => {
      setMessage("Success");
      setInfo(result.data.result)
       console.log(result.data.result)
       console.log(info)

    })
    .catch((err) => {
       setMessage(err.response.data.message);
    });
},[])   
  
 

 


return(
  <>
  <div className="div_img">
      <img src={info.image}></img> 
      </div>
    <div className="productInfoMain">
    
    <p className="p_name_des">{"category Item : "+info.category}</p>
    <p className="p_name_des">{"Name Item :  "+info.name}</p>
    <p className="p_name_des">{info.description}</p>
    <p className="p_name_des">{"Price "+"JD "+info.price}.00</p>
    <div className="but_part1">
      <button className="buttom_info" onClick={()=>{
        Navigate("/home")
        console.log("home")
      }}>Back</button>
      <button className="buttom_info" onClick={()=>{
        console.log(info.id)
        createNewCartByUser(info.id)
      }}>Add To Cart</button>
    </div>
    
    </div>
    <div className="main_left">
      <div className="main_left1">
        <p className="p_icons_left"><GrDeliver></GrDeliver></p>
        <p>DELIVERY INFO</p>
        <p>From then, delivery is generally within 2-10 days, depending on your location</p>
        </div>
      <div className="main_left1"> <p className="p_icons_left"><BsCurrencyDollar></BsCurrencyDollar></p>
        <p>30 DAYS RETURNS</p>
        <p>Not the right fit? No worries. We'll arrange pick up and a full refund within 7 days including the delivery fee.</p></div>
    </div>
    </>
)
};





























export default ProductInfo;