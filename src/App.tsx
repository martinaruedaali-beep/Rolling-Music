import Sidebar from './components/Sidebar/Sidebar';
import Playlist  from "./components/Playlist";
import Reproductor from './components/Reproductor/Reproductor';
import './App.css';

function App(){
  return (
    <>
     <Sidebar />;
     <Playlist/>;
     <Reproductor/>;
     
    </>
    
  )   
}

export default App
