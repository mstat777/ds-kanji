import './LangSelectorCtn.scss';
import { useState, useContext } from 'react';
import { languages, changeLanguage } from '../../../i18n';
import { DataLayerContext } from '../../../context/DataLayerProvider';

export default function LangSelectorCtn() {
   const DATA_LAYER = useContext(DataLayerContext);
   const [showLangMenu, setShowLangMenu] = useState<boolean>(false);

   // show/hide language menu
   function toggleLangMenu() {
      setShowLangMenu(!showLangMenu);
   }

   // change the language data in i18next & localStorage, then triger hide menu
   function changeLangAndHideMenu(langCode: string) {
      // change only if lang has been changed
      if (langCode !== DATA_LAYER?.locStLang) {
         changeLanguage(langCode); // change the language data in i18next
         DATA_LAYER?.setLocStLang(langCode);
         DATA_LAYER?.setCurrLang(langCode);
         DATA_LAYER?.changeLangImage(langCode);
         localStorage.setItem("lang", langCode);
      }
      toggleLangMenu();
   }

   return (
      DATA_LAYER &&
      <div
         className={`switch_lang_ctn ${showLangMenu ? 'show_lang_menu' : 'hide_lang_menu'}`} onMouseLeave={() => setShowLangMenu(false)}
      >
         <button onClick={toggleLangMenu} className="current_lang_btn">
            <img src={DATA_LAYER.currLangImg} alt="language" />
         </button>

         <div className="lang_menu">
            {languages &&
               languages.map((lang, i) =>
                  <button
                     onClick={() => changeLangAndHideMenu(lang)}
                     key={i}
                     className={`lang_btn ${showLangMenu ? "grey_outline" : null}`}>
                     <img src={DATA_LAYER.images[i].file} alt="language" />
                  </button>
               )
            }
         </div>
      </div>
   );
};