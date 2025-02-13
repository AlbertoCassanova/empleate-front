// React
import React from "react";
import { Link } from "react-router-dom";

// Components
import { CgProfile } from "react-icons/cg";
import { BiWorld } from "react-icons/bi";
import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

type NavbarItemsType = {
    icon: IconType,
    linkTo: string
}

const NavbarItems : Array<NavbarItemsType> = [
    { icon: FaHome, linkTo: "/home" },
    { icon: BiWorld, linkTo: "/map" },
    { icon: CgProfile, linkTo: "/profile"},
    { icon: FaCog, linkTo: "/config"},
]

const Navbar = () : JSX.Element => {
    return (
        <div className="bg-dark-purple p-2 shadow-xl visible md:hidden flex justify-between ">
            {NavbarItems.map((e, key : number) => (
                <li key={key}>
                    <Link to={e.linkTo}>
                        {React.createElement(e.icon, { className: "text-white text-[60px]"})}
                    </Link>
                </li>
            ))}
        </div>
    )
}

export default Navbar