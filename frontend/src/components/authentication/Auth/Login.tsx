import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';

interface LoginProps {
  setAuth: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:5000/authentication/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        alert("Logged in Successfully");
        navigate("/");
      } else {
        setAuth(false);
        alert("Error: " + parseRes); 
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="Container">
      <h1 className="heading">Login</h1>
      <form onSubmit={onSubmitForm} className="container_form">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
          className="box"
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          className="box"
        />

        <button>Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;