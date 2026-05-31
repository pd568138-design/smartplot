
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const login = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/login",
        data
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>AI SmartPlot</h1>

        <p>Login to continue</p>

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

        <button onClick={login}>
          Login
        </button>

        <p className="switch-text">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

