/* eslint-disable no-restricted-globals */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/navbar.css";

function Navbar() {
  const [connected, setConnected] = useState();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/auth`, {
        withCredentials: true,
      })
      .then(() => {
        setConnected(true);
      })
      .catch(() => {
        setConnected(false);
      });
  }, []);

  const logout = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        withCredentials: true,
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => console.error(err));
  };
  return (
    <div
      className="navbarcontainer"
      style={
        window.location.href === "http://localhost:3000/"
          ? { justifyContent: "flex-end" }
          : { justifyContent: "space-between" }
      }
    >
      {window.location.href === "http://localhost:3000/" ? null : (
        <div
          data-aos="fade-down"
          data-aos-duration="1500"
          className="containerbtnretrunnavbar"
        >
          <a className="linkgohome" href="/">
            <div className="circles" />
            <p className="textnavbar">Back to Home</p>
          </a>
        </div>
      )}
      <div>
        {!connected ? (
          <>
            <Link to="/connexion">
              <button
                data-aos="fade-down"
                data-aos-duration="1500"
                className="btnnavbar"
                type="button"
              >
                Connexion
              </button>
            </Link>
            <Link to="/register">
              <button
                data-aos="fade-down"
                data-aos-duration="1500"
                className="btnnavbar"
                type="button"
              >
                Register
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <button
                data-aos="fade-down"
                data-aos-duration="1500"
                className="btnnavbar"
                type="button"
              >
                Profile
              </button>
            </Link>
            <button
              data-aos="fade-down"
              data-aos-duration="1500"
              className="btnnavbar"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
