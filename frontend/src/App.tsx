import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/authentication/Auth/Login";
import Register from "./components/authentication/Auth/Register";
import AddContact from "./components/contact/AddContact";
import ContactList from "./components/contact/ContactList";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const res = await fetch("http://localhost:5000/authentication/verify", {
          method: "POST",
          headers: { jwt_token: localStorage.token },
        });
        setIsAuthenticated(await res.json());
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuthenticated();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <AddContact />
                <ContactList />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};


export default App;
