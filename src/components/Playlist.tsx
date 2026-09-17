import { useState } from "react";
export default function Playlist(){
   const [activeTab, setActiveTab] = useState<"canciones"|"guardadas">("canciones");
   const [playlist,setPlaylist] = useState<SavedPlaylist[]>([]);
   const [modalOpen,setModalOpen] = useState(false);
   
   
   
   
    return(
        <div className="playlist-screen">
            <h1>Mi Playlist</h1>
        </div>
    );
     interface  Song  {
        id: string;
      title  : string;
      artist  : string;
      album  : string;
       duration : string;
    }
interface SavedPlaylist {
    id:string;
    name: string;
    count:string;
}

}
