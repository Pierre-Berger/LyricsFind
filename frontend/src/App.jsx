import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import "./App.css";
import Lyrics from "./pages/Lyrics";
import Connexion from "./pages/Connexion";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import YoutubePlayer from "./pages/YoutubePlayer";
import ResultPageTest from "./pages/ResultPageTest";
import GetSpotify from "./pages/GetSpotify";

function App() {
  AOS.init();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result/:search" element={<ResultPageTest />} />
          <Route path="/youtubeplayer" element={<YoutubePlayer />} />
          <Route path="/lyrics/:songID" element={<Lyrics />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/spotify/login" element={<GetSpotify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
