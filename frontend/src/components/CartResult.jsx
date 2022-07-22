import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import youtube from "../assets/youtube.png";
import spotify from "../assets/spotify.png";
import heart from "../assets/heart.png";
import emptyheart from "../assets/emptyheart.png";

function CartResult({ result }) {
  const navigate = useNavigate();
  const youtubeLink = (el) => {
    navigate("/youtubeplayer", { state: { el } });
  };
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
  const spotifyLink = (el) => {
    navigate("/spotify/login", { state: { el } });
  };
  const addfavnotify = () =>
    toast.success("😍 Add in your favourites ", {
      position: "top-right",
      theme: "dark",
      autoClose: 14000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  const deletefavnotify = () =>
    toast.success("😞 Delete from your favourites ", {
      position: "top-right",
      theme: "dark",
      autoClose: 14000,
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
  const favstate = (e) => {
    if (connected) {
      if (e.target.src === `http://localhost:3000${heart}`) {
        e.target.src = emptyheart;
        // nomorefav
        axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}/deletefav`,
            { data: parseInt(e.target.id, 10) },
            { withCredentials: true }
          )
          .then(() => {
            deletefavnotify();
          });
      } else {
        e.target.src = heart;
        // newfav

        axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}/addfav`,
            { data: parseInt(e.target.id, 10) },
            { withCredentials: true }
          )
          .then(() => addfavnotify());
      }
    } else {
      problemeConnexion();
    }
  };

  return (
    <>
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
      <div className="cartresultcontainer">
        <div className="leftside">
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="imagecontainer"
          >
            <img className="photo" src={result.songArt} alt="album" />
          </div>
        </div>
        <div className="rightside">
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="textinfocart"
            id="autoScroll"
          >
            <h1 className="titlesongcart"> {result.title}</h1>
            <p className="textsongcart">{result.primaryArtist.name} </p>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="btnsocial"
          >
            <div className="btncontainercart">
              <div className="buttonsection">
                <button
                  className="btnsociallyrics"
                  type="button"
                  onClick={() => navigate(`/lyrics/${result.songID}`)}
                >
                  Show me Lyrics
                </button>
                <button
                  className="btnsocialspotify"
                  disabled
                  onClick={() => spotifyLink(result)}
                  type="button"
                >
                  Listen on Spotify{" "}
                  <img className="iconsocial" src={spotify} alt="icon" />
                </button>
                <button
                  className="btnsocialyoutube"
                  onClick={() => youtubeLink(result)}
                  type="button"
                >
                  Listen on Youtube
                  <img className="iconsocial" src={youtube} alt="icon" />
                </button>
              </div>
              <div className="favcontainer">
                <p className="textnavbar">
                  {" "}
                  You like this one ? 😍 <br /> Go add in favourite !
                </p>
                {connected ? (
                  <button
                    className="btnfav"
                    onClick={(e) => favstate(e)}
                    type="button"
                  >
                    <img
                      id={result.songID}
                      className="heartfav"
                      src={emptyheart}
                      alt="heart"
                    />
                  </button>
                ) : (
                  <p
                    style={{ margin: "10px 0px 0px 0px " }}
                    className="textnavbar"
                  >
                    You need to be connected 🤔
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartResult;
