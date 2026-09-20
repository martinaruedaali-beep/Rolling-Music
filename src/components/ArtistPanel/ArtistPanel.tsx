import { useState } from "react";
import "./ArtistPanel.css";

interface Artist {
  name: string;
  photoUrl: string;
  followers: number;
  isFollowing: boolean;
}

export default function ArtistPanel() {
  const [artist, setArtist] = useState<Artist>({
    name: "Patricio Rey y sus Redonditos de Ricota",
    photoUrl: "",
    followers: 1240,
    isFollowing: false,
  });
    function handleToggleFollow() {
    setArtist((prev) => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1,
    }));
  }
    return (
    <aside className="artist-panel">
      <img className="artist-photo" src={artist.photoUrl} alt={artist.name} />
      <h2 className="artist-name">{artist.name}</h2>
      <p className="artist-followers">{artist.followers} seguidores</p>
      <button
        className={`follow-btn ${artist.isFollowing ? "following" : ""}`}
        onClick={handleToggleFollow}
      >
        {artist.isFollowing ? "Dejar de seguir" : "Seguir"}
      </button>
    </aside>
  );
}