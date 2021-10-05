import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/logo.jpg";

const NavHome = () => {

    return(
        <>
            <Navbar.Brand href="/">
                <img
                    src={logo}
                    className="logo"
                    alt="El Buen Sabor Logo"
                />
            </Navbar.Brand>
        </>
    );
};

export default NavHome;