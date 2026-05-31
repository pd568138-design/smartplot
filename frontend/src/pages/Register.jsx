
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const register = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/register",
        data
      );

      alert(response.data.message);

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account 🚀</h1>

        <p>Register for AI SmartPlot</p>

        <input
          type="text"
          placeholder="Name"
          onChange={(e)=>
            setData({
              ...data,
              name:e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>
            setData({
              ...data,
              email:e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>
            setData({
              ...data,
              password:e.target.value
            })
          }
        />

        <button onClick={register}>
          Register
        </button>

        <p className="switch-text">

          Already have account?

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

