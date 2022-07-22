/* eslint-disable no-shadow */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/profile.css";

function Profile() {
  const [music, setMusic] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/fav`, {
        withCredentials: true,
      })
      .then((res) => {
        res.data.map((el) =>
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/getsong/${el.songid}`, {
              withCredentials: true,
            })
            .then((response) => {
              const { data } = response;
              if (music.length <= 0) {
                setMusic((music) => [...music, data]);
              }
            })
            .catch((err) => console.error(err))
        );
      });
  }, []);

  return (
    <div className="profilecontainer">
      <Navbar />
      <div className="titleprofilecontainer">
        <h1 className="profiletitle">Profile</h1>
        <h2 className="profiletitlefav">Favourite : </h2>
      </div>
      <div
        data-aos="fade-down-right"
        data-aos-duration="1500"
        className="favcontainerprofil"
      >
        {music.length > 0 &&
          music.map((el) => (
            <>
              <div className="fav">
                <p className="textnavbar">Artist : {el.primaryArtist.name} </p>
                <p className="textnavbar">Title : {el.title}</p>
              </div>
              <hr className="hr" />
            </>
          ))}
      </div>
    </div>
  );
}

export default Profile;
