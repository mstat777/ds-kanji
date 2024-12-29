import './Home.scss';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import KanjiCard from '../../components/KanjiCard/Index';


export default function Home() {
   const dispatch = useAppDispatch();
   const {
      showInfoBar
   } = useAppSelector((state) => state.settings);

   return (
      <main className="home">
         <section className="kanji_section">
            <KanjiCard />
            <KanjiCard />
            <KanjiCard />
            <KanjiCard />
         </section>
      </main>
   );
}