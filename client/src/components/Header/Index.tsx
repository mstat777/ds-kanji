import './Header.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import BurgerBtn from '../buttons/BurgerBtn/Index';

// memo is in order to avoid rerendering
export default function Header() {
   const [showMenu, setShowMenu] = useState<boolean>(false);

   return (
      <header className="header">
         <nav className="nav">
            <div className="logo_ctn">
               <img src={logo} alt="DS Kanji Game image" />
            </div>

            <h1 className="title">DS Kanji Game</h1>

            <BurgerBtn
               showMenu={showMenu}
               setShowMenu={setShowMenu}
            />

            {showMenu &&
               <ul className={`menu ${showMenu ? 'show_menu' : ''}`}>

                  <li>
                     <NavLink
                        to={"/home"}
                        onClick={() => setShowMenu(false)}
                     >home</NavLink>
                  </li>

                  <li>
                     <NavLink
                        to={"/settings"}
                        onClick={() => setShowMenu(false)}
                     >settings</NavLink>
                  </li>

                  <li>
                     <NavLink
                        to={"/about"}
                        onClick={() => setShowMenu(false)}
                     >about</NavLink>
                  </li>
               </ul>
            }
         </nav>
      </header>
   );
}