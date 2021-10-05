import Navbar from "react-bootstrap/Navbar";
import cart from "../../assets/thumbs/shopping-cart.png";

const NavCarrito = () => {

    return(
        <>
            <Navbar.Brand href="/carrito">
                <img
                    src={cart}
                    className="shopping-cart"
                    alt="Shopping Cart"
                />
            </Navbar.Brand>
        </>
    );
};

export default NavCarrito;