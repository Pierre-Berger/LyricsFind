/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/youtubeplayer.css";
import ring from "../assets/ring.gif";
import arrowback from "../assets/arrowback.png";

function YoutubePlayer() {
  const location = useLocation();
  if (!location.state) {
    window.location.href = "/";
  }
  const { el } = location.state;
  const [linkClean, setLinkClean] = useState();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/youtube/${el.songID}`)
      .then((res) => {
        const linkytb = res.data.media.find(
          (element) => element.provider === "youtube"
        );
        setLinkClean(linkytb.url.replace("watch?v=", "embed/"));
      });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="containeryoutubeplayer">
      <div className="topcontaineryoutube">
        <div className="btnreturncontainerlyrics">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btnreturnlyrics"
          >
            <img className="imgback" src={arrowback} alt="arrow" />
          </button>
          <p className="textnavbar">Return</p>
        </div>
      </div>
      {linkClean ? (
        <div className="playercontainer">
          <iframe
            width="70%"
            height="715"
            src={linkClean}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="loadercontainerresultpage">
          <h1 className="textloader">Loading ...</h1>
          <img className="loadergif" src={ring} alt="load" />
        </div>
      )}
    </div>
  );
}

export default YoutubePlayer;
