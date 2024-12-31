import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterProps {
    setAuth: (isAuthenticated: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = inputs;
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const response = await fetch("http://localhost:5000/authentication/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const parseRes = await response.json();

            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);
                alert("Registered Successfully");
                navigate("/");
            } else {
                setAuth(false);
                alert(parseRes);
            }
        } catch (err: any) {
            console.error(err.message);
            alert("Registration failed.");
        }
    };

    return (
        <Fragment>
            <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={onChange}
                />
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={onChange}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChange}
                />
                <button>Register</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    );
};

export default Register;