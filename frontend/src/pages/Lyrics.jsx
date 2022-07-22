import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ring from "../assets/ring.gif";
import arrowback from "../assets/arrowback.png";
import "../assets/css/lyrics.css";

function Lyrics() {
  const { songID } = useParams();
  const [lyrics, setLyrics] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/lyrics/${songID}`)
      .then((res) => {
        setTimeout(() => {
          setError(!error);
        }, "5000");
        if (Object.keys(res.data.length).length === 0) {
          setError(!error);
        }

        setLyrics(res.data);
        setLoader(!loader);
      })
      .catch((er) => {
        setError(!error);
        console.error(er);
      });
  }, []);

  return (
    <div className="lyricscontainer">
      {lyrics && loader && error ? (
        <>
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
          <pre className="lyrics">{lyrics}</pre>
        </>
      ) : (
        <div className="loadercontainer">
          {error ? (
            <h1 className="textloader">Une erreur est survenue </h1>
          ) : (
            <>
              <h1 className="textloader">Loading...</h1>
              <img className="loadergif" src={ring} alt="load" />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Lyrics;
