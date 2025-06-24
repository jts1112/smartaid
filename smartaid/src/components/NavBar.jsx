import React, {useState} from 'react';

// import { useClickAway } from "react-use";
import { useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { routes } from "../routes";

const { default: DropdownMenu } = require("./DropDownMenu");

const Navbar = () => {
    const[openMenu, setOpenMenu] = useState(false);

    return (<>

        <div className="flex items-center justify-between relative">
                    
            <h1 className="text-3xl font-bold text-(--primary)">SmartAid</h1>

            <div className="">
                <button type="button" onClick={() => setOpenMenu(!openMenu)} className="p-2">
                    <Hamburger color="var(--primary)" toggled={openMenu} size={20} toggle={setOpenMenu} />
                </button>
                 {openMenu && <DropdownMenu />}
            </div>
            

      </div>
    </>);
}

export default Navbar;

