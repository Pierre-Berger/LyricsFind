/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/media-has-caption */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import animateScrollTo from "animated-scroll-to";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../assets/css/home.css";
import scroll from "../assets/scroll.gif";

export default function Home() {
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

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate(`/result/${data.search}`);
  };

  const onClickScreenScroll = () => {
    animateScrollTo(0);
  };

  return (
    <div className="homecontainer">
      <Navbar connected={connected} />
      <div className="homepagecontainer">
        <div
          data-aos="fade-down-right"
          data-aos-duration="2500"
          className="titlecontainer"
        >
          <h1 className="title">Find </h1>
          <h1 className="title">Your</h1>
          <h1 className="title">Music</h1>
          <h1 className="titlelong">With Lyrics</h1>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="2500"
          className="videocontainer"
        >
          <video className="video" autoPlay muted loop>
            <source src="src/assets/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="scrollcontainer">
        <p className="textscroll">Scroll me </p>
        <img src={scroll} className="scrollgif" alt="scroll" />
      </div>
      <form className="inputcontainer" onSubmit={handleSubmit(onSubmit)}>
        <p className="inputtext">Search Lyrics : </p>
        <input
          className="inputsearch"
          type="text"
          {...register("search", { required: true })}
        />
        <input
          className="btnsubmit"
          onClick={onClickScreenScroll}
          type="submit"
          value="Search"
        />
      </form>
    </div>
  );
}
