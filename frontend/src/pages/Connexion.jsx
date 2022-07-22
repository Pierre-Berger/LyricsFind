/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../assets/css/connexion.css";
import Navbar from "../components/Navbar";

function Connexion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const succesConnexion = () =>
    toast.success("😍 Welcome ", {
      position: "top-right",
      theme: "dark",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  const problemeConnexion = () =>
    toast.error("Something Wrong ", {
      position: "top-right",
      theme: "dark",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  const onSubmit = (data) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          data,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        succesConnexion();
        window.setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(() => problemeConnexion());
  };
  return (
    <div className="connexioncontainer">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={14000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />

      <div
        data-aos="zoom-in-left"
        data-aos-duration="1000"
        className="containerconnexiontitle"
      >
        {" "}
        <h1 className="titleconnexion">Connexion</h1>
      </div>

      <div
        data-aos="zoom-in-left"
        data-aos-duration="1000"
        className="formcontainer"
      >
        <div className="leftside">
          <h3 className="titleformleftside">
            Welcome back <br /> on LyricsFinder{" "}
          </h3>
          <div className="textformcontainer">
            <span className="textformleftsidetop"> Hey 🖐 </span>
            <span className="textformleftside">
              Glad to see you back with us
            </span>
          </div>
        </div>
        <div className="hrcontainer">
          <hr />
        </div>
        <div className="rightside">
          <h3 className="titlefrom">Log in </h3>
          <form
            className="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="inputcontainerform">
              <p className="textlabel">Email</p>
              <input
                className="inputform"
                {...register("email", { required: true })}
              />
            </div>
            <div className="inputcontainerform">
              <p className="textlabel">Password</p>
              <input
                className="inputform"
                type="password"
                {...register("password", { required: true })}
              />
            </div>
            {errors.exampleRequired && <span>This field is required</span>}

            <input className="btnform" type="submit" value="Connexion" />
            <p className="textlabel">
              No Account ? <a href="/register">Register </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
