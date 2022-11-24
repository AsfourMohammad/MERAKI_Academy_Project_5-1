import React, { useContext, useState } from "react";
import "./style.css";
import axios from "axios";
import Navbar_b_token from "../Navbar_b_token/indes";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

// =================================================================

const Register = () => {
  //   const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Location, setLocation] = useState("");
  const [mobile, setMobile] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role_id = 1;
  

  // =================================================================

  const addNewUser = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:5000/register", {
        firstName,
        lastName,
        Location: "amman",
        mobile,
        email,
        password,
        role_id,
      })
      .then((result) => {
        console.log(result);
        alert(result.data.massage);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.massage);
      });
  };

  // =================================================================

  return (
    <>
      <Navbar_b_token />
      <div className="Form">
        <p className="p">Create Account</p>
        <p>Please register below account detail</p>
        <form>
          <br />
          {/* <label>first Name</label> */}
          <br></br>
          <input
            className="input_register"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          {/* <label>last Name</label> */}
          <br></br>
          <input
            className="input_register"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          {/* <label>your Location</label> */}
          <br></br>

          <select className="id1" name="city">
            <option value="">Select City</option>
            <option value="Maan">Maan</option>
            <option value="alkarak">alkarak</option>
            <option value="Al salt">Al salt</option>
            <option value="Amman">Amman</option>
            <option value="Madaba">Madaba</option>
            <option value="Jarash">Jarash</option>
            <option value="Ajloun">Ajloun</option>
            <option value="Al mafraq">Al mafraq</option>
            <option value="Alzarqa">Alzarqa</option>
            <option value="Irbid">Irbid</option>
            <option value="Al Aqaba">Al Aqaba</option>
            <option value="Altafila">Altafila</option>
          </select>
          <br />
          {/* <label>mobile</label> */}
          <br></br>
          <input
            className="input_register"
            placeholder="mobile"
            onChange={(e) => setMobile(e.target.value)}
          />
          <br />
          {/* <label>email</label> */}
          <br></br>
          <input
            className="input_register"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {/* <label>password</label> */}
          <br></br>
          <input
            className="input_register"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button className="but_create" onClick={(e)=>{
            addNewUser(e)
          }}>
            Create
          </button>
          <br />
        </form>
      </div>
      <img
        className="image_login2"
        src="https://www.turlock.k12.ca.us/cms/lib/CA50000453/Centricity/Domain/1539/register.png"
      ></img>
      <div className="image_login3">
      <h1>Why use Dokaneh website?</h1>
      <p  className="p1">Dokaneh allows us to shop online with ease, with the availability of all household and personal supplies, and the availability of all payment methods with home delivery service.</p>
      <p  className="p1">There is something about the saree that makes a woman look dignified, glorifying and every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its designer collection at competitive price and merchantable quality to its whole seller and worldwide online customer.</p>
      {/* <img className="image_last" src="https://oyelabs.com/wp-content/uploads/2020/06/Best-Grocery-Delivery-Apps-1.jpg"></img> */}
      </div>
      
    </>
  );
};

export default Register;
