import Playlist  from "./components/Playlist";
function App(){
  return < Playlist/>;
}
export default App;


import Sidebar from './components/Sidebar'
import './App.css'
import Reproductor from './components/Reproductor/Reproductor'

function App() {

  return (
    <>
     <Sidebar />
     <Reproductor/>
     
    </>
    
  )   
}

export default App
