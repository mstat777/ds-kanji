import './App.scss';
import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataLayerContext } from './context/DataLayerProvider';
import { getLanguage, changeLanguage } from './i18n';
// ---------- Components & Pages: -------------
import Header from './components/Header/Index';
import Footer from './components/Footer/Index';
import Loading from './components/Loading/Index';
import Home from './pages/Home/Index';
import GameOver from './pages/GameOver/Index';
import Settings from './pages/Settings/Index';
import About from './pages/About/Index';
import NotFound from './pages/NotFound/Index';

export default function App() {
   const DATA_LAYER = useContext(DataLayerContext);

   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      if (DATA_LAYER?.locStLang) {
         if (DATA_LAYER?.currLang) {
            if (DATA_LAYER.currLangImg) {
               // if the language & its image are defined in the context AND in the localStorage, then stop the loading bar
               setIsLoading(false);
            } else {
               // the language image is NOT loaded, then load it
               DATA_LAYER.changeLangImage(DATA_LAYER?.locStLang);
            }
         } else {
            // the language is defined in localStorage, but NOT in the context
            DATA_LAYER?.setCurrLang(DATA_LAYER?.locStLang);
            // change the default language in i18next
            changeLanguage(DATA_LAYER?.locStLang);
         }
      } else {
         // the language is NOT defined at all, then set the i18n default language
         const defaultLang = getLanguage();
         localStorage.setItem("lang", defaultLang);
         DATA_LAYER?.setLocStLang(defaultLang);
         DATA_LAYER?.setCurrLang(defaultLang);
      }
   }, [DATA_LAYER?.locStLang, DATA_LAYER?.currLang, DATA_LAYER?.currLangImg]);

   return (
      isLoading ?
         <Loading /> :
         <>
            <Header />

            <Routes>
               <Route index element={<Home />} />
               <Route path="home" element={<Home />} />
               <Route path="gameover" element={<GameOver />} />
               <Route path="settings" element={<Settings />} />
               <Route path="about" element={<About />} />
               <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
         </>
   );
}