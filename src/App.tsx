import Sidebar from "./components/Sidebar";
import Playlist from "./components/Playlist/Playlist";
import Reproductor from "./components/Reproductor/Reproductor";
import ArtistPanel from "./components/ArtistPanel/ArtistPanel";
import "./App.css";

function App() {
  return (
    <>
      <Sidebar />
      <Playlist />
      <ArtistPanel />
      <Reproductor />
    </>
  );
}

export default App;