// React
import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";

// Components
import { IconType } from "react-icons";
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiFillEnvironment } from 'react-icons/ai';
import { BiWorld } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa";

// Utils
import { Logout } from "../../utils/sessions";
import React from "react";

type MenuItemsType = {
    title: string,
    linkTo?: string,
    functionOnClick?: MouseEventHandler,
    icon: IconType
}

const MenuItems : Array<MenuItemsType> = [
    { title : "Mapa", icon: BiWorld, linkTo: "map" },
    { title : "Cerrar sesión", icon: FaPowerOff, functionOnClick: Logout}
];

const Menu = () : JSX.Element => {
    const [open, setOpen] = useState<boolean>(true);
    return (
        <div className={`visible max-sm:hidden bg-dark-purple h-screen p-5 pt-8 duration-300 relative ${open ? "w-72" : "w-20"}`}>
            <BsArrowLeftShort 
                className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 z-50 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="inline-flex">
                <AiFillEnvironment
                    className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`}
                />
                <h1
                    className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}
                >
                    Empleate
                </h1>
            </div>
            <ul className="pt-2">
                {MenuItems.map((menu: MenuItemsType, key: number) => (
                    <>
                        <li
                            key={key}
                            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
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
                                </div>
                            )}
                        </li>
                    </>
                ))}
            </ul>
            <li></li>
        </div>
    )
}

export default Menu