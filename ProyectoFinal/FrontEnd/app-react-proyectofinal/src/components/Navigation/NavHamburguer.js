import { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";

const NavHamburguer = () => {

    useEffect(() => {
        MenuController();
    }, [])

    const MenuController = (e) => {
        let menu = document.getElementsByClassName("navbar-nav")[0];
        let hamburguer = document.getElementsByClassName("hamburger-container")[0];
        if(menu != undefined){
            if(window.innerWidth < 766){
                menu.style.display = 'none';
                hamburguer.style.display = 'block';
            }
            else if(window.innerWidth >= 766){
                menu.style.display = 'flex';
                menu.className = "mr-auto navbar-nav";
                menu.style.flexDirection = 'row';
                hamburguer.style.display = 'none';
            }
        }
    }

    window.addEventListener('resize', MenuController);

    const HandleHamburguerMenu = (e) => {
        // console.log(e.currentTarget);
        var menu = document.getElementsByClassName("navbar-nav")[0];
        let hamburguer = document.getElementsByClassName("hamburger-container")[0];
        // console.log(menu);
        if(window.innerWidth < 766){

            if(menu.style.display == "none"){
                menu.style.display = 'flex';
                menu.className = "navbar-nav";
                menu.style.flexDirection = 'column';

                // console.log(hamburguer.children);
                hamburguer.children[0].style.transform = 'rotate(45deg)';
                hamburguer.children[1].style.display = 'none';
                hamburguer.children[2].style.transform = 'translate(0px,-6px) rotate(-45deg)';
            }
            else if(menu.style.display != "none"){
                menu.style.display = 'none';
                menu.className = "mr-auto navbar-nav";
                menu.style.flexDirection = 'row';

                hamburguer.children[0].style.transform = 'rotate(0deg)';
                hamburguer.children[1].style.display = 'block';
                hamburguer.children[2].style.transform = 'rotate(0deg)';
            }
        }
    }

    return(
        <>
            <Navbar.Brand onLoadStart={(e) => MenuController(e)}>
                <div className="hamburger-container" onClick={(e) => HandleHamburguerMenu(e)}>
                    <span className="top-span"></span>
                    <span className="middle-span"></span>
                    <span className="bottom-span"></span>
                </div>
            </Navbar.Brand>
        </>
    );
};

export default NavHamburguer;

