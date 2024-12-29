import './Header.scss';
import logo from '../../assets/img/logo.png';
import { useState } from 'react';
import BurgerBtn from '../buttons/BurgerBtn/Index';
import { useAppDispatch } from '../../store/hooks';
import { setShowSettings } from '../../store/slices/settings';

// memo is in order to avoid rerendering
export default function Header() {
   const dispatch = useAppDispatch();
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
               <ul className={`menu ${showMenu ? 'show_menu' : null}`}>
                  <li>
                     <button
                        onClick={() => {
                           setShowMenu(false);
                           dispatch(setShowSettings(true));
                        }}
                     >settings</button>
                  </li>

                  <li>
                     <button>about</button>
                  </li>
               </ul>
            }
         </nav>
      </header>
   );
}