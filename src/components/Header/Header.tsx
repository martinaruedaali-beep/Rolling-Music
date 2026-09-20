
interface HeaderProps {
    iniciarSesion: () => void;
    registrarse: () => void;
}
function Header ({iniciarSesion, registrarse}: HeaderProps) {

    return (
        <>
        <header>
            <form >
                <input type="search" 
                placeholder="Buscar..."/>
            </form>

            <div>
                <a href="#"
                onClick={iniciarSesion}>Iniciar Sesion</a>
                <a href="#"
                onClick={registrarse}>Registrarse</a>
            </div>


        </header>
       
        </>
    )
}

export default Header;