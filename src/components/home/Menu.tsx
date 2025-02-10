// React
import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useAppSelector } from '../../app/hooks';

// Components
import { IconType } from "react-icons";
import {
    BsArrowLeftShort,
    BsChevronDown,
    BsSearch
} from 'react-icons/bs';
import { CgProfile } from "react-icons/cg";
import { BiWorld } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa";

// Utils
import { Logout } from "../../utils/sessions";
import React from "react";
import { capitalize } from "../../utils/strings";

const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT || "";

type MenuItemsType = {
    title: string,
    linkTo?: string,
    functionOnClick?: MouseEventHandler,
    icon: IconType,
    spacing?: boolean,
    submenu?: boolean,
    submenuItems?: [
        {
            title: string
        }
    ]
}

const MenuItems : Array<MenuItemsType> = [
    { title : "Mapa", icon: BiWorld, linkTo: "/map" },
    { title : "Perfil", icon: CgProfile, linkTo: "/profile"},
    { title : "Cerrar sesión", icon: FaPowerOff, functionOnClick: Logout}
];

const Menu = () : JSX.Element => {
    const user = useAppSelector((state) => state.user)

    const [open, setOpen] = useState<boolean>(true);
    const [submenuOpen, setSubmenuOpen] = useState<boolean>(false);
    return (
        <div className={`visible max-sm:hidden bg-dark-purple h-screen p-5 pt-8 duration-300 relative ${open ? "w-72" : "w-20"}`}>
            <BsArrowLeftShort 
                className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 z-50 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="inline-flex items-center">
                <img
                    src={`${
                        user.fotoPerfil != null && user.fotoPerfil ? API_ENDPOINT + "/media/" + user.id  + "/" + user.fotoPerfil  : "/img/empty_avatar.png"}`}
                    alt="avatar"
                    className={`float-left mr-2 duration-500 rounded-full ${open ? "w-16" : "w-10"}`}
                />
                <h1
                    className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}
                >
                    {capitalize(user.firstName) || ""}<br/>{capitalize(user.lastName) || ""}
                </h1>
            </div>

            {/* Search Input */}
            <div
                className={`flex items-center rounded-md bg-light-white mt-6 py-2 ${!open ? "px-2.5" : "px-4"}`}
            >
                <BsSearch
                    className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`}
                />      
                <input
                    type="search"
                    placeholder="Buscar"
                    className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}
                />          
            </div>

            {/* Menu Items */}
            <ul className="pt-2">
                {MenuItems.map((menu: MenuItemsType, key: number) => (
                    <div key={key}>
                        <li
                            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
                        >
                            {menu.linkTo ? (
                                <Link to={menu.linkTo} className="text-2xl flex items-center">
                                    <span className="text-2xl block float-left">
                                        {React.createElement(menu.icon)}
                                    </span>
                                    <span
                                        onClick={menu.functionOnClick}
                                        className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}
                                    >{" "}{menu.title}</span>
                                </Link>
                            ) : (
                                <div className="text-2xl flex items-center">
                                    <span className="text-2xl block float-left">
                                        {React.createElement(menu.icon)}
                                    </span>
                                    <span
                                        className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}
                                        onClick={menu.functionOnClick}
                                    >{" "}{menu.title}</span>
                                    {menu.submenu && (
                                        <BsChevronDown 
                                            className={`${submenuOpen && "rotate-180"}`} 
                                            onClick={() => setSubmenuOpen(!submenuOpen)}
                                        />
                                    )}
                                </div>
                            )}
                        </li>
                        {menu.submenu && submenuOpen && open && (
                            <ul>
                                {menu.submenuItems?.map((item, key: number) => (
                                    <li
                                        key={key}
                                        className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md"
                                    >
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </ul>
            <li></li>
        </div>
    )
}

export default Menu;