import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Index';
import Footer from './components/Footer/Index';
import Home from './pages/Home/Index';
import GameOver from './pages/GameOver/Index';
import Settings from './pages/Settings/Index';
import About from './pages/About/Index';
import NotFound from './pages/NotFound/Index';

export default function App() {
   return (
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