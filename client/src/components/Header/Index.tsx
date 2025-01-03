import './Header.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BurgerBtn from '../buttons/BurgerBtn/Index';
import LangSelectorCtn from '../buttons/LangSelectorCtn/Index';

// memo is in order to avoid rerendering
export default function Header() {
   const { t } = useTranslation();
   const trPath = "components.header"; // translation path
   const [showMenu, setShowMenu] = useState<boolean>(false);

   return (
      <header className="header">
         <nav className="nav">
            <BurgerBtn
               showMenu={showMenu}
               setShowMenu={setShowMenu}
            />

            <h1 className="title">DS Kanji Game</h1>

            <LangSelectorCtn />

            {showMenu &&
               <ul className={`menu ${showMenu ? 'show_menu' : ''}`}>

                  <li>
                     <NavLink
                        to={"/home"}
                        onClick={() => setShowMenu(false)}
                     >{t(`${trPath}.homeLink`)}</NavLink>
                  </li>

                  <li>
                     <NavLink
                        to={"/settings"}
                        onClick={() => setShowMenu(false)}
                     >{t(`${trPath}.settingsLink`)}</NavLink>
                  </li>

                  <li>
                     <NavLink
                        to={"/about"}
                        onClick={() => setShowMenu(false)}
                     >{t(`${trPath}.aboutLink`)}</NavLink>
                  </li>
               </ul>
            }
         </nav>
      </header>
   );
}