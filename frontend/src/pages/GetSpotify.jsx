/* eslint-disable no-plusplus */
import axios from "axios";
import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";

function GetSpotify() {
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  const accessToken = searchParams.get("access_token");
  // const location = useLocation();
  // const song = location.state.el;

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/search?type=track&q=onemoretime`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.error(res));
  }, []);

  return <div>Marche pas </div>;
}

export default GetSpotify;
