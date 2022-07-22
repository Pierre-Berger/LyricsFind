/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/resultpage.css";
import Navbar from "../components/Navbar";

import ring from "../assets/ring.gif";

import CartResult from "../components/CartResult";

function ResultPageTest() {
  const [result, setResult] = useState();
  const params = useParams();

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/search`, params)
      .then((res) => {
        const { data } = res;
        const { result: resultat } = data;

        for (let i = 0; i < resultat.length; i++) {
          if (Object.keys(resultat[i]).length === 0) {
            resultat.splice(i, 1);
          }
        }
        setResult(resultat);
      })
      .catch((err) => console.error(err));
  }, []);

  const buttonStyle = {
    width: "70px",
    height: "50px",
    background: "black",
    border: "2px solid white",
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "15Px",
  };

  const properties = {
    prevArrow: (
      <button type="button" style={{ ...buttonStyle }}>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
            fill="#FFFFFF"
            d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"
          />
        </svg>
      </button>
    ),
    nextArrow: (
      <button type="button" style={{ ...buttonStyle }}>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
            fill="#FFFFFF"
            d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"
          />
        </svg>
      </button>
    ),
  };
  return (
    <div className="resultpagecontainer">
      <Navbar />
      <div className="titlecontainerresultpage">
        <h1
          data-aos="fade-right"
          data-aos-duration="1500"
          className="titleresultpage"
        >
          Result for{" "}
        </h1>
        <h1
          data-aos="fade-right"
          data-aos-duration="3000"
          className="titlesearch"
        >
          "{params.search}"
        </h1>
      </div>
      <div className="containerslideshow">
        {result ? (
          <Slide {...properties} autoplay={false}>
            {result.map((el) => (
              <div className="each-slide-effect">
                <CartResult result={el} />
              </div>
            ))}
          </Slide>
        ) : (
          <div className="loadercontainerresultpage">
            <h1 className="textloader">Chargement en cours ...</h1>
            <img className="loadergif" src={ring} alt="load" />
          </div>
        )}
      </div>
    </div>
  );
}
export default ResultPageTest;
